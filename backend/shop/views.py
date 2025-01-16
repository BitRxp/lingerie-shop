from rest_framework import viewsets, mixins
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action

from .permissions import IsAdminOrIfAuthenticatedReadOnly

from .models import Product, Collection, Category
from .serializers import ProductSerializer, ProductListSerializer, CollectionSerializer, CategorySerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (IsAdminOrIfAuthenticatedReadOnly,)
    

class ProductViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Product.objects.prefetch_related(
        "brand",
        "color",
        "size",
        "collection"
    )
    serializer_class = ProductSerializer
    permission_classes = (IsAdminOrIfAuthenticatedReadOnly,)

    def get_serializer_class(self):
        if self.action == "retrieve":
            return ProductSerializer
        if self.action == "list":
            return ProductListSerializer

        return self.serializer_class

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
    permission_classes = (IsAdminOrIfAuthenticatedReadOnly,)
