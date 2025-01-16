from rest_framework import viewsets, mixins
from rest_framework.response import Response
from rest_framework.decorators import action

from django_filters.rest_framework import DjangoFilterBackend

from .filters import ProductFilter
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
        "collection",
        "category"
    )
    serializer_class = ProductSerializer
    permission_classes = (IsAdminOrIfAuthenticatedReadOnly,)
    filter_backends = (DjangoFilterBackend,)
    filterset_class = ProductFilter

    def get_serializer_class(self):
        if self.action == "retrieve":
            return ProductSerializer
        if self.action == "list":
            return ProductListSerializer

        return self.serializer_class

    @action(detail=False, methods=["get"], url_path="search")
    def search(self, request):
        queryset = self.filter_queryset(self.queryset)
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = ProductListSerializer(queryset, many=True)
        return Response(serializer.data)

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
