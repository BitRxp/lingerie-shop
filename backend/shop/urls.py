from django.urls import path, include
from rest_framework import routers

from .views import (
    ProductViewSet,
    CollectionViewSet,
    CategoryViewSet,
    CartViewSet,
    OrderViewSet,
    ProductImageViewSet,
    ColorViewSet,
    SizeViewSet
)

router = routers.DefaultRouter()
router.register("products", ProductViewSet)
router.register("collections", CollectionViewSet)
router.register("categories", CategoryViewSet)
router.register("cart", CartViewSet)
router.register("order", OrderViewSet)
router.register("product-images", ProductImageViewSet)
router.register("color", ColorViewSet)
router.register("size", SizeViewSet)


urlpatterns = [path("", include(router.urls))]

app_name = "shop"
