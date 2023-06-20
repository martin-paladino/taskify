from rest_framework import routers
from django.urls import path
from .views import (
    TaskViewSet,
    UserRegistrationView,
    UserLoginView,
    UserLogoutView
)

router = routers.DefaultRouter()

urlpatterns = [
    path("register/", UserRegistrationView.as_view(), name="register"),
    path("login/", UserLoginView.as_view(), name="login"),
    path('logout/', UserLogoutView.as_view(), name='logout'),
]

router.register(r"tasks", TaskViewSet)

urlpatterns += router.urls
