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
