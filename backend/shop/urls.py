from django.urls import path, include
from rest_framework import routers

from .views import ProductViewSet, CollectionViewSet, CategoryViewSet

router = routers.DefaultRouter()
router.register("products", ProductViewSet)
router.register("collections", CollectionViewSet)
router.register("categories", CategoryViewSet)

urlpatterns = [path("", include(router.urls))]

app_name = "shop"
