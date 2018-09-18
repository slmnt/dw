from api import models as m
from api import serializers as s
from django.shortcuts import render
from .models import *
from .serializers import *

from rest_framework import generics
from rest_framework.views import APIView
from rest_framework import status, viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework import status
from rest_framework.decorators import schema

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.hashers import PBKDF2PasswordHasher
from django.contrib.auth.hashers import check_password
from django.contrib.sessions.models import Session

from django.utils import timezone
from django.http import HttpResponse

from datetime import datetime
import subprocess
import os

# Create your views here.

class StuffViewSet(viewsets.ModelViewSet):
    queryset = m.Stuff.objects.all()
    serializer_class = s.StuffSerializer


class TotestAPIView(generics.ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = TotestSerializer
    queryset = Totest.objects.all()
    
class TestUserAPIView(generics.ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = TestUserSerializer
    queryset = TestUser.objects.all()

@schema(None)
class TestUserFViewset(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    serializer_class = TestUserFSerializer
    queryset = TestUserF.objects.all()

    def get(self, request):
        test = TestUserF.objects.all()
        serializer = TestUserFSerializer(test, many=True)                    
        return Response(serializer.data, status=status.HTTP_200_OK)
        #return Response(serializer.data, status=status.HTTP_404_NOT_FOUND)


@schema(None)
class TestUserViewset(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    serializer_class = TestUserSerializer
    queryset = TestUser.objects.all()

    def post(self, request):
        try:
            user = TestUser.objects.get(uid=request.data['uid'])
        except:
            return Response(status=status.HTTP_503_SERVICE_UNAVAILABLE) 
  
        if user.pwd == request.data['pwd']:
            try:
                live_user = TestUserLive.objects.get(uid=user)
            except:
                live_user = TestUserLive(uid=user,live=False)
                return Response(status=status.HTTP_503_SERVICE_UNAVAILABLE)
            live_user.live = True
            live_user.save()
            result = TestUserLive.objects.filter(live=True).count()
            return Response(data=result,status=status.HTTP_202_ACCEPTED)
        else:
            return Response(status=status.HTTP_503_SERVICE_UNAVAILABLE)


class TestUserLiveViewset(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    queryset = TestUserLive.objects.all()

    def get(self, request):
        try:
            result = TestUserLive.objects.filter(live=True).count()        
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(data=result)


class TestDropUserLiveViewset(viewsets.ModelViewSet):
    permission_classes = (AllowAny,)
    queryset = TestUserLive.objects.all()

    def post(self, request):
        try:
            uid = User.objects.get(username=request.data['uid'])
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
        logout(request)
        try:
            live = TestUserLive.objects.get(uid=uid)
        except:
            live = TestUserLive(uid=uid)
        live.live = False
        live.save()
        result = TestUserLive.objects.filter(live=True).count()
        return Response(data=result,status=status.HTTP_200_OK)

class UserAuthentic(APIView):

    def post(self, request):
        #sended username check
        try:
            auth_user = User.objects.get(username=request.data['uid'])
        except:
            return Response(data="1")
        #is_vaild check
        try:
            if auth_user.is_active:
                pass
        except:
            return Response(data="1")
        #sended pwd check
        try:
            pwd = request.data['pwd']
            if check_password(pwd, auth_user.password):
                pass
        except:
            return Response(data="1")
        v_user = authenticate(request=None,username=auth_user.username,password=pwd)
        if v_user is not None:
            login(request,v_user)
            #check live user moedls
            try:
                live = TestUserLive.objects.get(uid=auth_user)
            except:
                live = TestUserLive(uid=auth_user)
            live.live = True
            live.save()
            result = TestUserLive.objects.filter(live=True).count()
            #cookie login expiry set
            request.session.set_expiry(432000)
            return Response(data=result,status=status.HTTP_200_OK)
        else:
            return Response(data="1")

class CreateUser(APIView):

    def post(self, request):
        #check username
        try:
            uname = request.data['uid']
            pwd = request.data['pwd']
            email = request.data['email']
            new_user = User.objects.create_user(username=uname, password=pwd, email=emal)
        except:
            return Response(data="1")
        #check first name
        try:
            new_user.first_name = request.data['fname']
        except:
            pass
        #check last name
        try:
            new_user.last_name = request.data['lname']
        except:
            pass
        new_user.save()
        return Response(data=uname,status=status.HTTP_200_OK)


class CreateMUser(APIView):

    def post(self, request):
        #check username
        try:
            uname = request.data['uid']
            pwd = request.data['pwd']
            email = request.data['email']
            new_user = User.objects.create_user(username=uname, password=pwd, email=email)
        except:
            return Response(data="1")
        #check first name
        try:
            new_user.first_name = request.data['fname']
        except:
            pass
        #check last name
        try:
            new_user.last_name = request.data['lname']
        except:
            pass
        new_user.is_staff = True
        new_user.save()
        return Response(data=uname,status=status.HTTP_200_OK)



        #print(request.session.get_expiry_date())
        #sesion = Session.objects.get(session_key=request.session.session_key)
        #print(auth_user.last_login)        
        #print(auth_user.user_permissions) 
        #print(request.COOKIES)
        #cookie generate
        #        response = HttpResponse('working')       
        #        response.set_cookie('cookie','deliceous cookie')
        #        return response

class Addboard(viewsets.ModelViewSet):

    def post(self, request):
        #check username
        ctext = request.data['contents']
        new_board = Testboard(text=ctext)
        new_board.save()
        boards = Testboard.objects.all().order_by('-id')
        serializer = TestBoardSerializer(boards, many=True)                    
        return Response(data=serializer.data,status=status.HTTP_200_OK)

class Getboard(viewsets.ModelViewSet):

    def get(self, request):
        boards = Testboard.objects.all().order_by('-id')
        #cut section
        #boards = Testboard.objects.all().order_by('-id')[start:end]
        serializer = TestBoardSerializer(boards, many=True)                    
        return Response(serializer.data, status=status.HTTP_200_OK)


#Need Security policy 
#one client multi users?
class CookieAuthTest(viewsets.ModelViewSet):

    def get(self, request):
        print(request.user)
        #Running users script
        filename = "\\dump\\code\\" + "out.py"
        cmd = "python " + str(os.getcwd()) + filename
        check = subprocess.call(cmd.split(), shell=True)
        print(check)        
        if str(request.user) == 'AnonymousUser':
            return Response(status=status.HTTP_201_CREATED)

        else:            
            if request.session.get_expiry_date().date().day > datetime.now().day:
                print(request.session.get_expiry_date())
                return HttpResponse(str(request.user),status=status.HTTP_200_OK)
            else:
                try:
                    uid = User.objects.get(username=str(request.user))
                except:
                    return Response(status=status.HTTP_201_CREATED)
                logout(request)
                return HttpResponse('logout',status=status.HTTP_201_CREATED)

        #print(dir(request.session))
        #print(request.session._get_session())
        #print(request.session._session_key)
        #print(request.COOKIES)
        #print(request.session.test_cookie_worked())
        #if request.session.test_cookie_worked():
        #    request.session.delete_test_cookie()
        #else:
        #    request.session.set_test_cookie()
#        if request.session.test_cookie_worked() == False:
#            request.session.set_test_cookie()
#            return request
