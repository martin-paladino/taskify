from rest_framework import viewsets
from rest_framework.views import APIView

from .models import Task
from django.contrib.auth.models import User
from .serializers import TaskSerializer, UserSerializer

from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from django.core.exceptions import ValidationError
from django.core.validators import validate_email


class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    
    def get_queryset(self):
        # Get the logged-in user
        user = self.request.query_params.get("user", None)
        queryset = Task.objects.filter(related_user=user).order_by("-id")

        return queryset


class UserRegistrationView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        email = request.data.get("email")

        # Perform validation on the input data
        try:
            validate_email(email)
        except ValidationError:
            return Response(
                {"message": "Invalid email address"}, status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(email=email).exists():
            return Response(
                {"message": "Email already exists"}, status=status.HTTP_400_BAD_REQUEST
            )
        if User.objects.filter(username=username).exists():
            return Response(
                {"message": "Username already exists"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Create a new user if the input data is valid
        user = User.objects.create_user(
            username=username, password=password, email=email
        )

        serializer = UserSerializer(user)
        return Response({
            "message": "User registered successfully",
            "user": serializer.data,    
        })


class UserLoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            serializer = UserSerializer(user)
            return Response({
                "message": "User logged in successfully",
                "user": serializer.data,
                })
        else:
            return Response(
                {"message": "Invalid username or password"},
                status=status.HTTP_401_UNAUTHORIZED,
            )


class UserLogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response({"message": "User logged out successfully"})
