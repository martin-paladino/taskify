from django.db import models
from django.contrib.auth.models import User


class Task(models.Model):
    title = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)
    end_date = models.DateTimeField(blank=True, null=True)
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    related_user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.title
