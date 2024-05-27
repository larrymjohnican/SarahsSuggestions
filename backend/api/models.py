from django.db import models # Importing the models module from Django's database API
from django.contrib.auth.models import User # Importing the built-in User model from Django's authentication system

# This is a model class representing a Note
class Note(models.Model):

    # A CharField representing the title of the note, limited to 100 characters
    title = models.CharField(max_length = 100)

    # A TextField representing the content or body of the note
    content = models.TextField()

    # A DateTimeField that automatically records the creation time of the note
    created_at = models.DateTimeField(auto_now_add=True)

    # A ForeignKey field that establishes a one-to-many relationship between the User and Note models
    # This field represents the author of the note
    # When a User instance is deleted, all related Note instances will also be deleted (CASCADE)
    # The 'related_name' attribute allows accessing the related Note instances from a User instance using 'user.notes'
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    # This method defines the string representation of a Note instance
    def __str__(self):
        return self.title # When a Note instance is printed or converted to a string, it will display the note's title

