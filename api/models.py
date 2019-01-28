from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.
class Codetype(models.Model):
    description = models.CharField(max_length=15)

#Dont USE
class Code(models.Model):
    title = models.CharField(max_length=15,default='null')
    auth = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    codetype = models.ForeignKey('Codetype', on_delete=models.CASCADE)
    source = models.TextField()
    createat = models.DateTimeField(default=timezone.now)
    updateat = models.DateTimeField(default=timezone.now)
    count = models.IntegerField(default=0)
    comments = models.IntegerField(default=0)

    def __unicode__(self):
        return '%d' % (self.id)

#Dont USE
class Comment(models.Model):
    auth = models.ForeignKey(User,on_delete=models.CASCADE)
    coments = models.CharField(max_length=1000)
    createat = models.DateTimeField(default=timezone.now)
    root = models.ForeignKey('Code',on_delete=models.CASCADE)

#Dont USE
class Open(models.Model):
    root = models.ForeignKey(Code,on_delete=models.CASCADE)

class Techinfo(models.Model):
    title = models.CharField(max_length=15)
    auth = models.ForeignKey(User,on_delete=models.CASCADE)
    context = models.TextField()
    createat = models.DateTimeField(default=timezone.now)
    count = models.IntegerField(default=0)

class Usertechinfo(models.Model):
    title = models.CharField(max_length=15,default='null')
    auth = models.ForeignKey(User,on_delete=models.CASCADE)
    context = models.TextField()
    createat = models.DateTimeField(default=timezone.now)
    updateat = models.DateTimeField(default=timezone.now)
    count = models.IntegerField(default=0)
    comments = models.IntegerField(default=0)

    def __unicode__(self):
        return '%d' % (self.id)

class Usertechinfocomment(models.Model):
    auth = models.ForeignKey(User,on_delete=models.CASCADE)
    coments = models.CharField(max_length=1000)
    createat = models.DateTimeField(default=timezone.now)
    root = models.ForeignKey('Usertechinfo',on_delete=models.CASCADE)

class Ads(models.Model):
    auth = models.ForeignKey(User,on_delete=models.CASCADE)
    context = models.TextField()

class Adque(models.Model):
    ads = models.ForeignKey('Ads',on_delete=models.CASCADE)

class CertiList(models.Model):
    name = models.ForeignKey(User,on_delete=models.CASCADE)
    code = models.CharField(max_length=128)

class UserInfo(models.Model):
    root = models.ForeignKey(User,on_delete=models.CASCADE)
    year = models.IntegerField(default=-1)
    gen = models.CharField(max_length=1)
    subscribed = models.IntegerField(default=0)
    profile = models.CharField(max_length=500)
    level = models.IntegerField(default=0)
    models.ImageField(upload_to='images/')

class UserCourse(models.Model):
    root = models.ForeignKey(User,on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    descriptoin = models.CharField(max_length=500)
    likes = models.IntegerField(default=0)
    users = models.IntegerField(default=0)
    createat = models.DateTimeField(default=timezone.now)
    
######
# Course Chapter
class UserCourseContent(models.Model):
    cid = models.IntegerField(default=-1)
    root = models.ForeignKey('UserCourse',on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    descriptoin = models.CharField(max_length=500)
    createat = models.DateTimeField(default=timezone.now)

######
# Coutse Chapter Slides
class UserCourseContentIndex(models.Model):
    root = models.ForeignKey('UserCourseContent',on_delete=models.CASCADE)
    createat = models.DateTimeField(default=timezone.now)
    context = models.TextField()
    sid = models.IntegerField(default=-1,validators=[MinValueValidator(-1), MaxValueValidator(30)])

class UserCourseContentCode(models.Model):
    root = models.ForeignKey('UserCourseContent',on_delete=models.CASCADE)
    createat = models.DateTimeField(default=timezone.now)
    context = models.TextField()

class UserCourseComment(models.Model):
    root = models.ForeignKey('UserCourse',on_delete=models.CASCADE)
    auth = models.ForeignKey(User,on_delete=models.CASCADE)
    comment = models.CharField(max_length=500)
    createat = models.DateTimeField(default=timezone.now)
