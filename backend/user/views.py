from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST

from django.db import transaction

from google.oauth2 import id_token
from google.auth.transport import requests

from user.models import User

from .serializers import UserSerializer


class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer


class ManageUserView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    authentication_classes = (JWTAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user


class GoogleView(APIView):
    """
    Endpoint for Google ID token verification
    """
    permission_classes = (AllowAny,)

    @swagger_auto_schema(
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                "credential": openapi.Schema(type=openapi.TYPE_STRING, description='Google ID token'),
                "clientId": openapi.Schema(type=openapi.TYPE_STRING, description='Google client ID')
            },
            required=["credential", "clientId"]
        ),
        responses={
            200: openapi.Response(
                description="Successful authentication",
                examples={
                    "application/json": {
                        "username": "user123",
                        "first_name": "John",
                        "last_name": "Doe",
                        "access_token": "jwt_access_token",
                        "refresh_token": "jwt_refresh_token"
                    }
                }
            ),
            400: "Invalid request"
        }
    )
    def post(self, request):
        token = request.data.get("credential")
        client_id = request.data.get("clientId")
        if not token or not client_id:
            return Response({"message": "Token and clientId are required."}, status=HTTP_400_BAD_REQUEST)

        try:
            # Google ID token verification
            idinfo = id_token.verify_oauth2_token(
                token,
                requests.Request(),
                client_id
            )

            # Checking if the token was issued by Google
            if idinfo["iss"] not in ["accounts.google.com", "https://accounts.google.com"]:
                return Response({"message": "Invalid token issuer."}, status=HTTP_400_BAD_REQUEST)

        except ValueError as e:
            return Response({"message": f"Invalid or expired token: {str(e)}"}, status=HTTP_400_BAD_REQUEST)

        # Getting data from the token
        email = idinfo.get("email")
        first_name = idinfo["given_name"]
        last_name = idinfo.get("family_name")

        if not email:
            return Response({"message": "Email is required."}, status=HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            # Create or get a user
            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    "first_name": first_name or "",
                    "last_name": last_name or "",
                },
            )

            if not created:
                # Updating an existing user, but only if new data is provided
                if first_name:
                    user.first_name = first_name
                if last_name:
                    user.last_name = last_name

            user.save()

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        response = {
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "access_token": str(refresh.access_token),
            "refresh_token": str(refresh),
        }
        return Response(response)
