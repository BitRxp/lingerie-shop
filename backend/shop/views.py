from drf_yasg.utils import swagger_auto_schema

from rest_framework import viewsets, mixins, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAdminUser

from django_filters.rest_framework import DjangoFilterBackend

from .filters import ProductFilter
from .permissions import IsAdminOrSafeMethods

from .models import (
    Product,
    Collection,
    Category,
    Cart,
    CartItem,
    Order,
    OrderItem,
    ProductImage,
    Color,
    Size,
    Comment
)

from .serializers import (
    ProductSerializer,
    ProductListSerializer,
    CollectionSerializer,
    CategorySerializer,
    CartSerializer,
    AddToCartSerializer,
    OrderSerializer,
    OrderContactSerializer,
    OrderDeliverySerializer,
    OrderPaymentSerializer,
    ProductUploadImageSerializer,
    ColorSerializer,
    SizeSerializer,
    CommentSerializer
)


class ColorViewSet(viewsets.ModelViewSet):
    """Manage product colors."""
    queryset = Color.objects.all()
    serializer_class = ColorSerializer
    permission_classes = (IsAdminOrSafeMethods,)


class SizeViewSet(viewsets.ModelViewSet):
    """Manage product sizes."""
    queryset = Size.objects.all()
    serializer_class = SizeSerializer
    permission_classes = (IsAdminOrSafeMethods,)


class CategoryViewSet(viewsets.ModelViewSet):
    """Manage product categories."""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (IsAdminOrSafeMethods,)


class CommentViewSet(viewsets.ModelViewSet):
    """Manage product comments."""
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context


class ProductViewSet(
    viewsets.GenericViewSet,
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin
):
    """Manage products with filtering and extra actions."""
    queryset = Product.objects.prefetch_related("brand", "color", "size", "collection", "category")
    serializer_class = ProductSerializer
    permission_classes = (IsAdminOrSafeMethods,)
    filter_backends = (DjangoFilterBackend,)
    filterset_class = ProductFilter

    def get_serializer_class(self):
        if self.action == "retrieve":
            return ProductSerializer
        if self.action == "list":
            return ProductListSerializer
        return self.serializer_class

    @swagger_auto_schema(
        method="post",
        request_body=CommentSerializer,
        operation_description="Add a comment to a product."
    )
    @action(detail=True, methods=["post"], url_name="add_comment", permission_classes=[permissions.IsAuthenticated])
    def add_comment(self, request, pk=None):
        product = self.get_object()
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, product=product)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

    @swagger_auto_schema(
        method="get",
        operation_description="Search for products based on filters."
    )
    @action(detail=False, methods=["get"], url_path="search")
    def search(self, request):
        queryset = self.filter_queryset(self.queryset)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = ProductListSerializer(queryset, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(
        method="get",
        operation_description="Retrieve products that are on sale."
    )
    @action(url_path="on-sales", detail=False, methods=[
        "get",
        "post",
        "put",
        "delete"
    ]
            )
    def sales(self, request):
        products_on_sale = self.queryset.filter(is_sales=True)
        serializer = self.get_serializer(products_on_sale, many=True)
        return Response(serializer.data)


class CollectionViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Collection.objects.all()
    serializer_class = CollectionSerializer
    permission_classes = (IsAdminOrSafeMethods,)


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    permission_classes = ()
    serializer_class = CartSerializer

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Cart.objects.filter(user=self.request.user)
        else:
            session_key = self.request.session.session_key
            if not session_key:
                self.request.session.create()
                session_key = self.request.session.session_key
            return Cart.objects.filter(session_key=session_key)

    def list(self, request):
        if request.user.is_authenticated:
            cart, created = Cart.objects.get_or_create(user=request.user)
        else:
            session_key = request.session.session_key
            if not session_key:
                request.session.create()
                session_key = request.session.session_key
            cart, created = Cart.objects.get_or_create(session_key=session_key)

        serializer = self.get_serializer(cart)
        return Response(serializer.data)

    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            serializer.save(user=self.request.user)
        else:
            session_key = self.request.session.session_key
            if not session_key:
                self.request.session.create()
                session_key = self.request.session.session_key
            cart, created = Cart.objects.get_or_create(session_key=session_key)
            if not created:
                raise ValidationError("Cart already exists for this session.")
            serializer.save(session_key=session_key)

    @swagger_auto_schema(
        method="post",
        request_body=AddToCartSerializer,
        operation_description="Add a product to the cart."
    )
    @action(detail=False, methods=["post"], url_path="add")
    def add_to_cart(self, request):
        serializer = AddToCartSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        product = Product.objects.get(id=serializer.validated_data["product_id"])
        quantity = serializer.validated_data["quantity"]

        if request.user.is_authenticated:
            cart, _ = Cart.objects.get_or_create(user=request.user)
        else:
            session_key = request.session.session_key
            if not session_key:
                request.session.create()
                session_key = request.session.session_key
            cart, _ = Cart.objects.get_or_create(session_key=session_key)

        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        if not created:
            cart_item.quantity += quantity
        cart_item.save()

        return Response({"detail": "Product added to cart"}, status=201)


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return Order.objects.filter(user=self.request.user).select_related("delivery_address")
        else:
            session_key = self.request.session.session_key
            if not session_key:
                self.request.session.create()
                session_key = self.request.session.session_key
            return Order.objects.filter(session_key=session_key).select_related("delivery_address")

    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            cart = Cart.objects.filter(user=self.request.user).first()
            if not cart or not cart.items.exists():
                raise ValidationError("Cart is empty. Cannot create an order.")

            total_price = sum(item.product.price * item.quantity for item in cart.items.all())
            total_price += serializer.validated_data.get("delivery_cost", 0)

            serializer.save(
                user=self.request.user,
                first_name=self.request.user.first_name,
                last_name=self.request.user.last_name,
                email=self.request.user.email,
                phone=getattr(self.request.user.profile, "phone", None),
                total_price=total_price,
            )

            order = serializer.instance
            for item in cart.items.all():
                OrderItem.objects.create(
                    order=order,
                    product=item.product,
                    quantity=item.quantity,
                    price=item.product.price,
                )
            cart.items.all().delete()
        else:
            session_key = self.request.session.session_key
            if not session_key:
                self.request.session.create()
                session_key = self.request.session.session_key

            cart = Cart.objects.filter(session_key=session_key).first()
            if not cart or not cart.items.exists():
                raise ValidationError("Cart is empty. Cannot create an order.")

            total_price = sum(item.product.price * item.quantity for item in cart.items.all())
            total_price += serializer.validated_data.get("delivery_cost", 0)

            serializer.save(
                user=None,
                session_key=session_key,
                total_price=total_price,
                first_name=serializer.validated_data.get("first_name"),
                last_name=serializer.validated_data.get("last_name"),
                email=serializer.validated_data.get("email"),
                phone=serializer.validated_data.get("phone"),
            )

            order = serializer.instance
            for item in cart.items.all():
                OrderItem.objects.create(
                    order=order,
                    product=item.product,
                    quantity=item.quantity,
                    price=item.product.price,
                )
            cart.items.all().delete()

    @swagger_auto_schema(
        method="post",
        request_body=OrderPaymentSerializer,
        operation_description="Set payment details for an order."
    )
    @action(detail=True, methods=["post"], url_path="set-payment")
    def set_payment(self, request, pk=None):
        order = self.get_object()
        serializer = OrderPaymentSerializer(order, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"detail": "Payment method updated successfully"})

    @swagger_auto_schema(
        method="post",
        request_body=OrderDeliverySerializer,
        operation_description="Set delivery details for an order."
    )
    @action(detail=True, methods=["post"], url_path="set-delivery")
    def set_delivery(self, request, pk=None):
        order = self.get_object()
        serializer = OrderDeliverySerializer(order, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"detail": "Delivery information updated successfully"})

    @swagger_auto_schema(
        method="post",
        request_body=OrderContactSerializer,
        operation_description="Add contact information to an order."
    )
    @action(detail=False, methods=["post"], url_path="add-contact-info")
    def add_contact_info(self, request):
        serializer = OrderContactSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        return Response({"detail": "Contact information added successfully", "order_id": order.id})

    @swagger_auto_schema(
        method="post",
        request_body=OrderSerializer,
        operation_description="Create a new order."
    )
    @action(detail=False, methods=["post"], url_path="create")
    def create_order(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data)


class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductUploadImageSerializer
    permission_classes = (IsAdminUser,)
