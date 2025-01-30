from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import (
    CreateUserView,
    ManageUserView,
    GoogleView
)

urlpatterns = [
    path("register/", CreateUserView.as_view(), name="create-user"),
    path("profile/", ManageUserView.as_view(), name="manage-user"),
    path("login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("google/", GoogleView.as_view(), name="google_auth"),
]

app_name = "user"
