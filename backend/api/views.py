from django.shortcuts import render
from django.contrib.auth.models import User # Importing the built-in User model from Django
from rest_framework import generics # Importing generic view classes from Django REST Framework
from .serializers import UserSerializer, NoteSerializer # Importing the UserSerializer from your project's serializers.py file
from rest_framework.permissions import IsAuthenticated, AllowAny # Importing permission classes from DRF
from .models import Note

class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user, ) # filters notes written by user

    def perform_create(self, serializer):
        if serializer.is_valid(): # checks if serializer is valid
            serializer.save(author=self.request.user) # if valid the serializer saves the data
        else:
            print(serializer.errors) # else the serializer error is printed

class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated] # Only authenticated users can access this view

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user) # Filters notes written by the current user

class CreateUserView(generics.CreateAPIView):
    # This view inherits from the CreateAPIView class provided by Django REST Framework,
    # which handles the creation of new instances of a model.

    queryset = User.objects.all()
    # This specifies the queryset to be used for retrieving User instances.
    # In this case, it retrieves all users.

    serializer_class = UserSerializer
    # This specifies the serializer class to be used for serializing and deserializing User instances.

    permission_classes = [AllowAny]
    # This specifies the permission classes to be used for this view.
    # The AllowAny permission class allows any user (authenticated or not) to access this view.

