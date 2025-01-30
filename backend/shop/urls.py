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
    SizeViewSet,
    CommentViewSet
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
router.register("comments", CommentViewSet)


urlpatterns = [path("", include(router.urls))]

app_name = "shop"
