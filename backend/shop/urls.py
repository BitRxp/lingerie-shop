from django.urls import path, include
from rest_framework import routers

from .views import ProductViewSet, CollectionViewSet

router = routers.DefaultRouter()
router.register("products", ProductViewSet)
router.register("collections", CollectionViewSet)

urlpatterns = [path("", include(router.urls))]

app_name = "shop"
