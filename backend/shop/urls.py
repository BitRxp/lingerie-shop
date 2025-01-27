from django.urls import path, include
from rest_framework import routers

from .views import (
    ProductViewSet,
    CollectionViewSet,
    CategoryViewSet,
    CartViewSet,
    OrderViewSet, ProductImageViewSet
)

router = routers.DefaultRouter()
router.register("products", ProductViewSet)
router.register("collections", CollectionViewSet)
router.register("categories", CategoryViewSet)
router.register("cart", CartViewSet)
router.register("order", OrderViewSet)
router.register("product-images", ProductImageViewSet)

urlpatterns = [path("", include(router.urls))]

app_name = "shop"
