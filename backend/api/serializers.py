from django.contrib.auth.models import User # imports bult-in User model from Django's auth system
from rest_framework import serializers # imports serializers from Django REST Framework
from .models import Note # imports Note model from the current app's model

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    # This Meta class specifies the model and fields to be included in the serialized data
    class Meta:
        model = User # Specifies the User model from Django's built-in auth system
        fields = ["id", "username", "password"] # List of fields to include in the serialized data

        # This dictionary sets extra keyword arguments for the 'password' field
        # The 'write_only' option prevents the 'password' field from being included
        # in the serialized data when reading
        extra_kwargs = {"password": {"write_only": True}}

   # This method is called when creating a new user instance
    def create(self, validated_data):
        # The create_user() method is a built-in method in Django's User model
        # It creates a new user instance with the provided validated data
        user = User.objects.create_user(**validated_data)
        return user #returns the user

# Note Serializer
class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note # Specifies the Note model to be used
        fields = ["id", "title", "content", "created_at", "author"] # List of fields to include in the serialized data

        # This dictionary sets extra keyword arguments for the 'author' field
        # The 'read_only' option prevents the 'author' field from being included
        # in the serialized data when writing
        extra_kwargs = {"author": {"read_only": True}}