import uuid
from datetime import datetime

from django.db import models
from django.contrib.auth.models import AbstractUser, Group


# Create your models here.

class CustomUser(AbstractUser):
    dob = models.DateField(null=True)
    bloodGroup = models.CharField(max_length=3)
    gender = models.BooleanField(default=True)
    address = models.CharField(max_length=80)
    phone = models.IntegerField(default=0, unique=True)
    username = models.CharField(max_length=20, unique=False, default="")
    profilePic = models.ImageField(upload_to="media/", blank=True, null=True)
    friends = models.ManyToManyField("self", blank=True)
    friendRequests = models.ManyToManyField("self", blank=True, symmetrical=False)
    education = models.CharField(max_length=30, unique=False, default="", editable=True)
    adhaarNo = models.CharField(max_length=16, unique=False, default="", editable=True)
    profession = models.CharField(max_length=30, unique=False, default="", editable=True)
    emergencyContact = models.IntegerField(default=0, editable=True)
    officeAddress = models.CharField(max_length=100, default="", editable=True)
    pushToken = models.CharField(max_length=100, default="")

    USERNAME_FIELD = 'phone'
    REQUIRED_FIELDS = ['username', 'email']

    def __str__(self):
        return self.first_name + " " + self.last_name + " - " + str(self.phone)


class Group(models.Model):
    title = models.CharField(max_length=20)
    description = models.CharField(max_length=150)
    user = models.ManyToManyField(CustomUser, blank=True)
    image = models.ImageField(upload_to="media/", blank=True, null=True)
    pendingGroupRequest = models.ManyToManyField(CustomUser, related_name="user_content_type", blank=True)

    def __str__(self):
        return self.title


class GroupPost(models.Model):
    postDetails = models.CharField(max_length=300)
    time = models.DateTimeField(auto_now_add=True)
    group = models.ManyToManyField(Group)
    image = models.ImageField(upload_to="media/", blank=True, null=True)

    def __str__(self):
        self.string = ""
        for i in self.group.all():
            self.string = self.string + i.title + ","
        return self.string + " - " + self.postDetails


class ProfilePost(models.Model):
    postDetails = models.CharField(max_length=300)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to="media/", blank=True, null=True)
    likes = models.IntegerField(default=0)

    def __str__(self):
        return str(self.user) + " - " + self.postDetails


class FormPost(models.Model):
    postDetails = models.CharField(max_length=200, null=True)
    group = models.ManyToManyField(Group, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.postDetails)


class FormData(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    time = models.CharField(max_length=300)
    post = models.ForeignKey(FormPost, blank=True, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return str(self.user)


class Comments(models.Model):
    comment = models.CharField(max_length=100)
    user = models.ForeignKey(CustomUser, on_delete=models.ForeignKey)
    post = models.ForeignKey(ProfilePost, on_delete=models.CASCADE)

"""
class Likes(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.ForeignKey)
    post = models.ForeignKey(ProfilePost, on_delete=models.CASCADE)
"""

class Notifications(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE),
    notification = models.CharField(max_length=50)

