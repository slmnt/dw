from api import models as m
from api import serializers as s
from django.shortcuts import render,redirect
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
from back.settings import BASE_DIR
# Create your views here.

STATIC = BASE_DIR + '//static//'    

#required data
# 'uid' 'pwd'
class UserAuthentic(APIView):

    def post(self, request):
        select = request.META['HTTP_ACCEPT'].split(',')[0]
        print(select)
        if select == 'application/json':
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
                #cookie login expiry set
                request.session.set_expiry(432000)
                return Response(status=status.HTTP_200_OK)
            else:
                #now
                return Response(data="1")
        else:
            return redirect("http://localhost:3000")

#required data
# 'uid' 'pwd' 'email' 'fname' 'lname
class CreateUser(APIView):

    def post(self, request):
        select = request.META['HTTP_ACCEPT'].split(',')[0]
        if select == 'application/json':
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
        else:
            return redirect("http://localhost:3000")

class CreateMUser(APIView):

    def post(self, request):
        select = request.META['HTTP_ACCEPT'].split(',')[0]
        if select == 'application/json':
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
        else:
            return redirect("http://localhost:3000")
        #print(request.session.get_expiry_date())
        #sesion = Session.objects.get(session_key=request.session.session_key)
        #print(auth_user.last_login)        
        #print(auth_user.user_permissions) 
        #print(request.COOKIES)
        #cookie generate
        #        response = HttpResponse('working')       
        #        response.set_cookie('cookie','deliceous cookie')
        #        return response

#required data
# 'contents'
class Addboard(viewsets.ModelViewSet):

    def post(self, request):
        select = request.META['HTTP_ACCEPT'].split(',')[0]
        if select == 'application/json':
            #check username
            ctext = request.data['contents']
            new_board = Testboard(text=ctext)
            new_board.save()
            boards = Testboard.objects.all().order_by('-id')
            serializer = TestBoardSerializer(boards, many=True)                    
            return Response(data=serializer.data,status=status.HTTP_200_OK)
        else:
            return redirect("http://localhost:3000")

class Getboard(viewsets.ModelViewSet):

    def get(self, request):
        boards = Testboard.objects.all().order_by('-id')
        select = request.META['HTTP_ACCEPT'].split(',')[0]
        #print(select)
        if select == 'application/json':
            serializer = TestBoardSerializer(boards, many=True)                    
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return redirect("http://localhost:3000")
        #print(STATIC)
        #cut section
        #boards = Testboard.objects.all().order_by('-id')[start:end]

#get board id 
#ex) /api/igetboard/1
class icodeget(generics.ListAPIView):
    serializer_class = CodeSerializer
    
    def get_queryset(self):
        #print(self.kwargs['id'])
        #print('run')
        ob = Code.objects.get(id=self.kwargs['id'])
        ob.count += 1
        ob.save()
        queryset = Code.objects.all().filter(id=self.kwargs['id'])
        return queryset

#get board list
class Codelistget(generics.ListAPIView):
    serializer_class = CodeListSerializer
    
    def get_queryset(self):
        queryset = Code.objects.all().order_by('-id')
        return queryset

#get comment to board
class commentget(generics.ListAPIView):
    serializer_class = CommentSerializer
    
    def get_queryset(self):
        id = self.kwargs['id']
        tar = Code.objects.get(id=id)
        queryset = Comment.objects.all().filter(root=tar)
        return queryset

#create comment from board
class Commentadd(viewsets.ModelViewSet):

    def post(self, request):
        id = request.data['id']
        text = request.data['text']
        root = Code.objects.get(id=id)
        user = User.objects.get(username=str(request.user))
        new = Comment(auth=user,root=root,coments=text)
        root.comments += 1
        root.save()
        new.save()
        q = Comment.objects.all().filter(root=root)
        s = CommentSerializer(q,many=True)
        return Response(data=s.data,status=status.HTTP_200_OK)

class Getboardnum(viewsets.ModelViewSet):

    def get(self, request):
        select = request.META['HTTP_ACCEPT'].split(',')[0]
        #print(select)
        if select == 'application/json':
            boards = Testboard.objects.all().count()                   
            boards = int(boards / 7)
            return Response(data=boards, status=status.HTTP_200_OK)
        else:
            return redirect("http://localhost:3000")

class GetboardPage(viewsets.ModelViewSet):

    def post(self, request):
        select = request.META['HTTP_ACCEPT'].split(',')[0]
        #print(select)
        if select == 'application/json':
            num = request.data['num']
            #error
            start = num * 7
            end = (num + 1) * 7
            print(start,end)
            boards = Testboard.objects.all().order_by('-id')[start:end]
            if boards.count() > 0:
                serializer = TestBoardSerializer(boards, many=True)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(status=status.HTTP_204_NO_CONTENT)

        else:
            return redirect("http://localhost:3000")

class CodeSerial(viewsets.ModelViewSet):

    def post(self, request):
        authe = User.objects.get(username=str(request.user))
        code = request.data['code']
        ty = Codetype.objects.get(description=request.data['type'])        
        #Code models create
        cd = Code(auth=authe,codetype=ty,source=code)
        cd.save()
        serializer = CodeSerializer(Code.objects.all(), many=True) 
        return Response(serializer.data,status=status.HTTP_200_OK)

    def get(self, request):
        uid = User.objects.get(username=str(request.user))
        # get user auth
        selected = Code.objects.all().filter(auth=uid)
        selected = selected.order_by('-id')
        serializer = CodeSerializer(selected, many=True) 
        return Response(serializer.data,status=status.HTTP_200_OK)

class userinfo(viewsets.ModelViewSet):

    def get(self, request):
        uid = User.objects.get(username=str(request.user))
        # get user auth
        serializer = UserSerializer(uid) 
        return Response(serializer.data,status=status.HTTP_200_OK)



#Need Security policy 
#one client multi users?
class CookieAuthTest(viewsets.ModelViewSet):

    def get(self, request):
        #print(request.user)
        if str(request.user) == 'AnonymousUser':
            return Response(status=status.HTTP_201_CREATED)

        else:            
            if datetime.date(request.session.get_expiry_date()) > datetime.date(datetime.now()):
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

#   Stdin Memo
#   python3 input.py 0< stdin (input file)
#   required stdin file
class Python(viewsets.ModelViewSet):

    def post(self, request):
        #check username
        ctext = request.data['contents']
        new_board = Testboard(text=ctext)
        new_board.save()
        filename = Code.objects.all().count()
        filename += 1
        #create dump file   
        #open stdin stderr file
        output = open(STATIC + 'output.txt', 'w')
        inn = open(STATIC + 'output.txt', 'r')
        pin = open(STATIC + str(filename) + '.py', 'w', encoding='utf-8')
        pin.write(ctext)
        pin.close()
        #build subprocess 
        cmd = "python " + STATIC + str(filename) + '.py'
        p = subprocess.Popen(cmd.split(), stdout=output, stderr=output)
        dump = ''
        flag = True
        #excete 
        try:
            #timeout value setting is service level
            out, err = p.communicate(timeout=0.2)
        except subprocess.TimeoutExpired:
            p.kill()
            out, err = p.communicate()
            dump += 'timeout error'
            flag = False
        finally:
            while flag:
                temp = inn.readline()
                if not temp:
                    break
                temp = str(temp).replace(STATIC,"filepath/")
                dump += temp
        inn.close()
        output.close()
        #return response
        return Response(data=dump,status=status.HTTP_200_OK)

class Java(viewsets.ModelViewSet):

    def post(self, request):
        #check username
        ctext = request.data['contents']
        new_board = Testboard(text=ctext)
        new_board.save()
        #create dump file
        #open stdin stderr file
        output = open(STATIC + 'output.txt', 'w')
        inn = open(STATIC + 'output.txt', 'r')
        pin = open(STATIC + 'main.java', 'w')
        pin.write(ctext)
        pin.close()
        #build subprocess 
        cmd1 = "javac " + STATIC + 'main.java'
        cmd2 = "java " + STATIC + 'main'
        p = subprocess.Popen(cmd, stdout=output, stderr=output)
        dump = ''
        flag = True
        #excete 
        try:
            #timeout value setting is service level
            out, err = p.communicate(timeout=0.2)
        except subprocess.TimeoutExpired:
            p.kill()
            out, err = p.communicate()
            dump += 'timeout error'
            flag = False
        finally:
            while flag:
                temp = inn.readline()
                if not temp:
                    break
                dump += str(temp)
        inn.close()
        output.close()
        #return response
        return Response(data=dump,status=status.HTTP_200_OK)

class Clang(viewsets.ModelViewSet):

    def post(self, request):
        #check username
        ctext = request.data['contents']
        new_board = Testboard(text=ctext)
        new_board.save()
        #create dump file
        #open stdin stderr file
        output = open(STATIC + 'output.txt', 'w')
        inn = open(STATIC + 'output.txt', 'r')
        pin = open(STATIC + 'test.c', 'w')
        pin.write(ctext)
        pin.close()
        #build subprocess 
        cmd1 = "gcc " + STATIC + 'test.c'
        cmd2 = "./a.out"
        p = subprocess.Popen(cmd, stdout=output, stderr=output)
        dump = ''
        flag = True
        #excete 
        try:
            #timeout value setting is service level
            out, err = p.communicate(timeout=0.2)
        except subprocess.TimeoutExpired:
            p.kill()
            out, err = p.communicate()
            dump += 'timeout error'
            flag = False
        finally:
            while flag:
                temp = inn.readline()
                if not temp:
                    break
                dump += str(temp)
        inn.close()
        output.close()
        #return response
        return Response(data=dump,status=status.HTTP_200_OK)

class Cpplang(viewsets.ModelViewSet):

    def post(self, request):
        #check username
        ctext = request.data['contents']
        new_board = Testboard(text=ctext)
        new_board.save()
        #create dump file
        #open stdin stderr file
        output = open(STATIC + 'output.txt', 'w')
        inn = open(STATIC + 'output.txt', 'r')
        pin = open(STATIC + 'test.cpp', 'w')
        pin.write(ctext)
        pin.close()
        #build subprocess 
        cmd1 = "gcc " + STATIC + 'test.cpp'
        cmd2 = "./a.out"
        p = subprocess.Popen(cmd, stdout=output, stderr=output)
        dump = ''
        flag = True
        #excete 
        try:
            #timeout value setting is service level
            out, err = p.communicate(timeout=0.2)
        except subprocess.TimeoutExpired:
            p.kill()
            out, err = p.communicate()
            dump += 'timeout error'
            flag = False
        finally:
            while flag:
                temp = inn.readline()
                if not temp:
                    break
                dump += str(temp)
        inn.close()
        output.close()
        #return response
        return Response(data=dump,status=status.HTTP_200_OK)
