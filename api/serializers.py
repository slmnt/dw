from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class CodeSerializer(serializers.ModelSerializer):
    codetype = serializers.SlugRelatedField(read_only=True,slug_field='description')
    auth = serializers.StringRelatedField()
    
    class Meta:
        model = Code
        fields = ('__all__')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('last_login', 'email', 'username')


class CommentSerializer(serializers.ModelSerializer):
    auth = serializers.StringRelatedField()
    
    class Meta:
        model = Comment
        fields = ('id','auth', 'coments', 'createat')

class CodeListSerializer(serializers.ModelSerializer):
    codetype = serializers.SlugRelatedField(read_only=True,slug_field='description')
    auth = serializers.StringRelatedField()

    class Meta:
        model = Code
        fields = ('id','title', 'auth', 'codetype', 'createat', 'count', 'comments')

class CertiListSerializer(serializers.ModelSerializer):
    name = serializers.StringRelatedField()
    
    class Meta:
        model = CertiList
        fields = ('__all__')

class UserInfoSerializer(serializers.ModelSerializer):
    root = serializers.StringRelatedField()
    
    class Meta:
        model = UserInfo
        fields = ('__all__')

#Use /courseSearch
class UserCourseSerializer(serializers.ModelSerializer):
    root = serializers.StringRelatedField()
    
    class Meta:
        model = UserCourse
        fields = ('id','root','title','createat','likes','descriptoin')

#CourseInfo Use CourseInfo
class UserCourseInfoSerializer(serializers.ModelSerializer):
    root = serializers.StringRelatedField()
    
    class Meta:
        model = UserCourse
        fields = ('__all__')

class UserCourseContentSerializer(serializers.ModelSerializer):
    root = serializers.SlugRelatedField(read_only=True,slug_field='title')
    
    class Meta:
        model = UserCourseContent
        fields = ('__all__')

class UserCourseContentinfoSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserCourseContent
        fields = ('title','createat','descriptoin','cid')


class AdsSerializer(serializers.ModelSerializer):
    auth = serializers.StringRelatedField()
    
    class Meta:
        model = Ads
        fields = ('__all__')

class UserCourseCommentSerializer(serializers.ModelSerializer):
    auth = serializers.StringRelatedField()
    
    class Meta:
        model = UserCourseComment
        fields = ('auth','comment','createat')

class UserCourseContentIndexSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = UserCourseContentIndex
        fields = ('context','aid')

class UserBoardSerializer(serializers.ModelSerializer):
    auth = serializers.StringRelatedField()
    
    class Meta:
        model = UserBoard
        fields = ('__all__')

class UserBoardAnswerAnswerSerializer(serializers.ModelSerializer):
    auth = serializers.StringRelatedField()
    
    class Meta:
        model = UserBoardAnswer
        fields = ('auth','comment','createat')

class UserThreadSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(read_only=True,slug_field='name')
    auth = serializers.StringRelatedField()
    
    class Meta:
        model = UserThread
        fields = ('__all__')

class UserThreadCommentSerializer(serializers.ModelSerializer):
    auth = serializers.StringRelatedField()
    
    class Meta:
        model = UserBoardAnswer
        fields = ('auth','comment','createat')
