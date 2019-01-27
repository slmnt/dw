from api import models as m
from api import serializers as s
from django.shortcuts import render,redirect
from .models import *
from .serializers import *
import os
import re

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
from django.core.mail import send_mail

from datetime import datetime
import subprocess
from Crypto.Hash import SHA256
from back.settings import BASE_DIR
# Create your views here.

STATIC = BASE_DIR + '//static//'
STORAGE = BASE_DIR + '//frontend//public//'
"""
send_mail(
    'Subject here',
    'Here is the message.',
    'from@example.com',
    ['to@example.com'],
    fail_silently=False,
)
"""

#required data
# 'uid' 'pwd'
class UserAuthentic(APIView):

    def post(self, request):
        select = request.META['HTTP_ACCEPT'].split(',')[0]
        if select == 'application/json':
            #sended username check
            try:
                auth_user = User.objects.get(username=request.data['uid'])
            except:
                return Response(data="1")
            #is_vaild check
            try:
                if auth_user.is_active:
                    return Response(status=status.HTTP_404_NOT_FOUND)
            except:
                return Response(data="1",status=status.HTTP_404_NOT_FOUND)
            #sended pwd check
            try:
                pwd = request.data['pwd']
                if check_password(pwd, auth_user.password):
                    pass
            except:
                return Response(data="1",status=status.HTTP_404_NOT_FOUND)
            v_user = authenticate(request=None,username=auth_user.username,password=pwd)
            if v_user is not None:
                login(request,v_user)
                #check live user moedls
                #cookie login expiry set
                request.session.set_expiry(432000)
                return Response(status=status.HTTP_200_OK)
            else:
                #now
                return Response(data="1",status=status.HTTP_404_NOT_FOUND)
        else:
            return redirect("http://localhost:3000")

#required data
# 'uid' 'pwd' 'email' 'fname' 'lname
class CreateUser(APIView):

    def post(self, request):
        #print(request.data)
        select = request.META['HTTP_ACCEPT'].split(',')[0]
        if select == 'application/json':
            #check username
            try:
                uname = request.data['uid']
                pwd = request.data['pwd']
                email = request.data['email']
                new_user = User(username=uname, email=email)
                new_user.is_active = False
                new_user.set_password(pwd)
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
            try:
                u = User.objects.get(username=uname)
                h = SHA256.new()
                h.update(uname.encode('utf-8'))
                #print(uname)
                code = h.hexdigest()
                c = CertiList(name=u,code=str(code))
                c.save()
                print(u)
            except:
                return Response(status=status.HTTP_400_BAD_REQUEST)

            body = "http://localhost:3000/checkmail/" + code + "/"
            send_mail(
                'mail check',
                str(body),
                'miniprog2018@gmail.com',
                [str(email)],
                fail_silently=False,
            )
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
                new_user = User(username=uname, password=pwd, email=email)
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

class Searchget(generics.ListAPIView):
    serializer_class = CodeListSerializer
    
    #type 1 title search
    #type 2 body search
    #type 3 username search
    def get_queryset(self):
        ty = self.kwargs['type']
        con = self.kwargs['context']
        queryset = Code.objects.all().order_by('-id')
        if ty == '1':
            queryset = Code.objects.filter(title__contains=con).order_by('-id')
        elif ty == '2':
            queryset = Code.objects.filter(source__contains=con).order_by('-id')
        else:
            auth = User.objects.get(username=con)
            queryset = Code.objects.all().filter(auth=auth).order_by('-id')
        return queryset


#get comment to board
class commentget(generics.ListAPIView):
    serializer_class = CommentSerializer
    
    def get_queryset(self):
        id = self.kwargs['id']
        tar = Code.objects.get(id=id)
        queryset = Comment.objects.all().filter(root=tar).order_by('createat')
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
        q = Comment.objects.all().filter(root=root).order_by('createat')
        s = CommentSerializer(q,many=True)
        return Response(data=s.data,status=status.HTTP_200_OK)

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

class Logout(APIView):

    def get(self, request):
        logout(request)
        return HttpResponse('logout',status=status.HTTP_200_OK)



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
        #create dump file   
        #open stdin stderr file
        output = open(STATIC + 'output.txt', 'w')
        inn = open(STATIC + 'output.txt', 'r')
        pin = open(STATIC + 'tmp.py', 'w', encoding='utf-8')
        pin.write(ctext)
        pin.close()
        #build subprocess 
        cmd = "python " + STATIC + 'tmp.py'
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


class Getuser(viewsets.ModelViewSet):

    def get(self, request):
        user = User.objects.get(username=str(request.user))
        if user.is_staff:
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class CheckMailing(viewsets.ModelViewSet):

    def post(self, request):
        crypt = request.data['code']
        try:
            c = CertiList.objects.get(code=crypt)
            c.name.is_active = True
            c.delete()
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        return Response(status=status.HTTP_200_OK)

class GetUserInfo(viewsets.ModelViewSet):

    def get(self,request):
        uid = UserInfo.objects.all()
        s = UserInfoSerializer(uid,many=True)
        return Response(data=s.data,status=status.HTTP_200_OK)

    def post(self, request):
        return Response(status=status.HTTP_200_OK)

class GetUserCourse(viewsets.ModelViewSet):

    def get(self,request):
        uid = UserCourse.objects.all().order_by('-createat')
        s = UserCourseSerializer(uid,many=True)
        return Response(data=s.data,status=status.HTTP_200_OK)

    def post(self, request):
        return Response(status=status.HTTP_200_OK)

class GetUserCourseContent(viewsets.ModelViewSet):

    def get(self,request):
        uid = UserCourseContent.objects.all()
        s = UserCourseContentSerializer(uid,many=True)
        return Response(data=s.data,status=status.HTTP_200_OK)

    def post(self, request):
        return Response(status=status.HTTP_200_OK)

class GetUserCourseContentid(viewsets.ModelViewSet):

    def post(self, request):
        id = request.data['id']
        obj = UserCourse.objects.get(id=id)
        serial = UserCourseInfoSerializer(obj)
        return Response(data=serial.data,status=status.HTTP_200_OK)


#CourseSearch, CourseInfoGet, CourseInfoContentsInfoGet
class CourseInfoConetntsInfoGet(generics.ListAPIView):
    serializer_class = UserCourseContentinfoSerializer
    
    def get_queryset(self):
        id = self.kwargs['id']
        tar = UserCourse.objects.get(id=id)
        queryset = UserCourseContent.objects.all().filter(root=tar).order_by('cid')
        return queryset


class GetUserCourseComments(generics.ListAPIView):
    serializer_class = UserCourseCommentSerializer

    def get_queryset(self):
        tar = UserCourse.objects.get(id=self.kwargs['id'])
        queryset = UserCourseComment.objects.all().filter(root=tar).order_by('-createat')
        return queryset


class GetUserCourseContentIndex(viewsets.ModelViewSet):

    def post(self, request):
        id = request.data['id']
        cid = request.data['cid']
        tar = UserCourse.objects.get(id=id)
        tar2 = UserCourseContent.objects.filter(root=tar,cid=cid)
        tar3 = tar2.get()
        obj = UserCourseContentIndex.objects.all().filter(root=tar3)
        print(obj)
        serial = UserCourseContentIndexSerializer(obj,many=True)
        return Response(data=serial.data,status=status.HTTP_200_OK)

class Upload(viewsets.ModelViewSet):

    def post(self, request):
        p = request.FILES['photos']
        dir = request.data['path'].split('/')
        path = STORAGE
        for name in dir:
            pattern = '.*\..*'
            r = re.match(pattern,name)
            if r:
                path += name
            else:
                path += name + '//'
                if not os.path.exists(path):
                    os.makedirs(path)

        with open(path,mode='wb+') as f:
            print(p.size)
            d = 0            
            for line in p:
                d += len(line)
                f.write(line)
            
        data = {'ok':200}
        return Response(data=data,status=status.HTTP_200_OK)

class CreateCourse(viewsets.ModelViewSet):

    def post(self, request):
        root = User.objects.get(username=request.user)
        title = request.data['title']
        desc = request.data['description']
        new_course = UserCourse(title=title,descriptoin=desc,root=root)
        new_course.save()
        return Response(status=status.HTTP_200_OK)

class CreateChapter(viewsets.ModelViewSet):

    #create chapter
    #required
    #user, courseid,title,desc
    def post(self, request):
        root = User.objects.get(username=request.user)
        id = request.data['id']
        title = request.data['title']
        desc = request.data['desc']
        course = UserCourse.objects.get(id=id)
        #Auth Check
        if root == course.root:
            q = UserCourseContent.objects.all().filter(root=course)
            cid = len(q) + 1
            Chapter = UserCourseContent(root=course,title=title,descriptoin=desc,cid=cid)
            Chapter.save()
        return Response(status=status.HTTP_200_OK)

class SlideCreate(viewsets.ModelViewSet):

    #required
    #user, courseid, chapterid, context
    def post(self, request):
        root = User.objects.get(username=request.user)
        id = request.data['id']
        cid = request.data['cid']
        text = request.data['context']
        course = UserCourse.objects.get(id=id)
        if root == course.root:
            q = UserCourseContent.objects.all().filter(root=course,cid=cid)
            if q:
                chapter = q.get()
                slides = UserCourseContentIndex(root=chapter,context=text)
                slides.save()
        return Response(status=status.HTTP_200_OK)

class ChapterSourceCodeCreate(viewsets.ModelViewSet):

    #required
    #user, courseid, chapterid,context
    def post(self, request):
        root = User.objects.get(username=request.user)
        id = request.data['id']
        cid = request.data['cid']
        text = request.data['context']
        course = UserCourse.objects.get(id=id)
        if root == course.root:
            q = UserCourseContent.objects.all().filter(root=course,cid=cid)
            if q:
                chapter = q.get()
                slides = UserCourseContentCode(root=chapter,context=text)
                slides.save()
        return Response(status=status.HTTP_200_OK)

class APItest(viewsets.ModelViewSet):

    def get(self,request):
        return Response(status=status.HTTP_200_OK)

    #required
    def post(self, request):
        root = User.objects.get(username=request.user)
        root.is_active = False
        return Response(status=status.HTTP_200_OK)
