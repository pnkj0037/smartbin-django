from django.db import models
from django.contrib.auth.models import User
from datetime import datetime


class UserProfile(models.Model):
    USER_TYPES = (
        ('admin', 'Admin'),
        ('citizen', 'Citizen'),
        ('driver', 'Collection Driver'),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_type = models.CharField(max_length=10, choices=USER_TYPES, default='citizen')

    def _str_(self):
        return f"{self.user.username} - {self.user_type}"

class Dustbin(models.Model):
    name = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    fill_level = models.IntegerField(default=0, help_text="Fill percentage (0-100)")
    last_updated = models.DateTimeField(auto_now=True)

    STATUS_CHOICES = [
        ('good', 'Good Condition'),
        ('damaged', 'Damaged'),
        ('overflowing', 'Overflowing'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='good')

    def _str_(self):
        return f"{self.name} - {self.fill_level}%"