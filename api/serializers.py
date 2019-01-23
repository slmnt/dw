from rest_framework import serializers
from django.contrib.auth.models import User
from .models import *

class StuffSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Stuff
        fields = '__all__'

class TotestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Totest
        fields = ('__all__')

class TestUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestUser
        fields = ('__all__')

class TestUserFSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestUserF
        fields = ('__all__')

class TestUserLiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestUserLive
        fields = ('__all__')

class TestBoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testboard
        fields = ('__all__')

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
        fields = ('id','root','title','createat','likes')

class UserCourseContentSerializer(serializers.ModelSerializer):
    root = serializers.SlugRelatedField(read_only=True,slug_field='title')
    
    class Meta:
        model = UserCourseContent
        fields = ('__all__')

class UserCourseContentinfoSerializer(serializers.ModelSerializer):
    root = serializers.SlugRelatedField(read_only=True,slug_field='title')
    
    class Meta:
        model = UserCourseContent
        fields = ('title','createat','descriptoin')

class AdsSerializer(serializers.ModelSerializer):
    auth = serializers.StringRelatedField()
    
    class Meta:
        model = Ads
        fields = ('__all__')


class UserCourseCommentSerializer(serializers.ModelSerializer):
    auth = serializers.StringRelatedField()
    root = serializers.SlugRelatedField(read_only=True,slug_field='title')
    
    class Meta:
        model = UserCourseComment
        fields = ('__all__')

