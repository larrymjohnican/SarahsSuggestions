from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView # Imports the CreateUserView from the api.views module

# Importing the TokenObtainPairView and TokenRefreshView from the Django REST Framework JWT Authentication package
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # This URL pattern maps to the built-in Django admin site
    path('admin/', admin.site.urls),

    # This URL pattern maps to the CreateUserView for user registration
    path("api/user/register/", CreateUserView.as_view(), name="register"),

    # This URL pattern maps to the TokenObtainPairView for obtaining a
    # JSON Web Token (JWT) access and refresh token pair
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),

    # This URL pattern maps to the TokenRefreshView for refreshing an expired JWT access token
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),

    # This URL pattern includes the built-in Django REST Framework URLs for
    # browsable API and login/logout views
    path("api-auth/", include("rest_framework.urls")),

    path("api/", include("api.urls")),
]
