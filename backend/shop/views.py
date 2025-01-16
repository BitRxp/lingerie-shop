from rest_framework import viewsets, mixins
from .permissions import IsAdminOrIfAuthenticatedReadOnly

from .models import Product, Collection
from .serializers import ProductSerializer, ProductListSerializer, CollectionSerializer


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
