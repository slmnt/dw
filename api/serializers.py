from rest_framework import serializers
from api import models as m
from .models import *

class StuffSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = m.Stuff
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