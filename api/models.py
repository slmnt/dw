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
    birth = models.DateTimeField(default=timezone.now)

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
    answer = models.TextField(default="")
    
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

#Question
class UserBoard(models.Model):
    auth = models.ForeignKey(User,on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    context = models.TextField()
    createat = models.DateTimeField(default=timezone.now)
    updateat = models.DateTimeField(default=timezone.now)
    likes = models.IntegerField(default=0)

class UserBoardAnswer(models.Model):
    root = models.ForeignKey('UserBoard',on_delete=models.CASCADE)
    auth = models.ForeignKey(User,on_delete=models.CASCADE)
    comment = models.TextField()
    createat = models.DateTimeField(default=timezone.now)

#Proposal
class UserProposal(models.Model):
    auth = models.ForeignKey(User,on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    context = models.TextField()
    createat = models.DateTimeField(default=timezone.now)
    updateat = models.DateTimeField(default=timezone.now)
    likes = models.IntegerField(default=0)

class UserProposalComment(models.Model):
    root = models.ForeignKey('UserProposal',on_delete=models.CASCADE)
    auth = models.ForeignKey(User,on_delete=models.CASCADE)
    comment = models.TextField()
    createat = models.DateTimeField(default=timezone.now)

#Help
class UserHelp(models.Model):
    auth = models.ForeignKey(User,on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    context = models.TextField()
    createat = models.DateTimeField(default=timezone.now)
    updateat = models.DateTimeField(default=timezone.now)
    likes = models.IntegerField(default=0)

class UserHelpAnswer(models.Model):
    root = models.ForeignKey('UserHelp',on_delete=models.CASCADE)
    auth = models.ForeignKey(User,on_delete=models.CASCADE)
    comment = models.TextField()
    createat = models.DateTimeField(default=timezone.now)


#Commit
class UserCommit(models.Model):
    auth = models.ForeignKey(User,on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    context = models.TextField()
    createat = models.DateTimeField(default=timezone.now)
    updateat = models.DateTimeField(default=timezone.now)
    likes = models.IntegerField(default=0)

class UserCommitComment(models.Model):
    root = models.ForeignKey('UserCommit',on_delete=models.CASCADE)
    auth = models.ForeignKey(User,on_delete=models.CASCADE)
    comment = models.TextField()
    createat = models.DateTimeField(default=timezone.now)

#Issue
class UserIssue(models.Model):
    auth = models.ForeignKey(User,on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    context = models.TextField()
    createat = models.DateTimeField(default=timezone.now)
    updateat = models.DateTimeField(default=timezone.now)
    likes = models.IntegerField(default=0)

class UserIssueComment(models.Model):
    root = models.ForeignKey('UserIssue',on_delete=models.CASCADE)
    auth = models.ForeignKey(User,on_delete=models.CASCADE)
    comment = models.TextField()
    createat = models.DateTimeField(default=timezone.now)

class Category(models.Model):
    name = models.CharField(max_length=50,unique=True)

class UserThread(models.Model):
    auth = models.ForeignKey(User,on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    context = models.TextField()
    createat = models.DateTimeField(default=timezone.now)
    updateat = models.DateTimeField(default=timezone.now)
    category = models.ForeignKey('Category',on_delete=models.CASCADE)
    likes = models.IntegerField(default=0)

class UserThreadComment(models.Model):
    root = models.ForeignKey('UserThread',on_delete=models.CASCADE)
    auth = models.ForeignKey(User,on_delete=models.CASCADE)
    comment = models.TextField()
    createat = models.DateTimeField(default=timezone.now)
