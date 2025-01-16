from rest_framework import viewsets, mixins
from .permissions import IsAdminOrIfAuthenticatedReadOnly

from .models import Product
from .serializers import ProductSerializer, ProductListSerializer


class ProductViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    queryset = Product.objects.prefetch_related("brand", "color", "size")
    serializer_class = ProductSerializer
    permission_classes = (IsAdminOrIfAuthenticatedReadOnly,)

    def get_serializer_class(self):
        if self.action == "retrieve":
            return ProductSerializer
        if self.action == "list":
            return ProductListSerializer

        return self.serializer_class
