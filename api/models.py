from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.

class Totest(models.Model):
    memo = models.TextField()

class TestUser(models.Model):
    uid = models.CharField(max_length=10)
    pwd = models.CharField(max_length=20)

class TestUserF(models.Model):
    uid = models.ForeignKey('TestUser',on_delete=models.CASCADE)
    profie = models.TextField()
    email = models.EmailField(max_length=30)

class TestUserAuth(models.Model):
    uid = models.ForeignKey('TestUser',on_delete=models.CASCADE)
    auth = models.BooleanField(default=False)

class TestUserLive(models.Model):
    uid = models.OneToOneField(User,on_delete=models.CASCADE)
    live = models.BooleanField(default=False)

class Testboard(models.Model):
    text = models.TextField()

class Stuff(models.Model):
    name = models.CharField(max_length=255, blank=True, null=True)
    quantity = models.IntegerField(default=0, blank=True)

class Codetype(models.Model):
    description = models.CharField(max_length=15)


class Code(models.Model):
    auth = models.ForeignKey(User,on_delete=False, null=False,default=False)
    codetype = models.ForeignKey('Codetype', on_delete=models.CASCADE)
    source = models.TextField()
    createat = models.DateTimeField(default=timezone.now)
