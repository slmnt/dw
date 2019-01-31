import os
import re
import json
import shutil
import subprocess

from datetime import datetime

from api import models as m
from api import serializers as s
from back.settings import BASE_DIR
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

from django.shortcuts import render,redirect
from django.utils import timezone
from django.http import HttpResponse
from django.core.mail import send_mail
from django.db.models import Q

from Crypto.Hash import SHA256
# Create your views here.

DOCKDIR = BASE_DIR + '//docker//python//'
DOCKFILES = BASE_DIR + '//docker//'
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
        #sended username check
        try:
            auth_user = User.objects.get(username=request.data['uid'])
        except:
            return Response(data="1")
        #is_vaild check
        try:
            if auth_user.is_active == False:
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
        v_user = authenticate(username=auth_user.username,password=pwd)
        if v_user is not None:
            login(request,v_user)
            #check live user moedls
            #cookie login expiry set
            request.session.set_expiry(432000)
            return Response(status=status.HTTP_200_OK)
        else:
            #now
            return Response(data="1",status=status.HTTP_404_NOT_FOUND)

#required data
# 'uid' 'pwd' 'email' 'fname' 'lname
class CreateUser(APIView):

    def post(self, request):
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
            #print(u)
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

    def post(self, request):
        logout(request)
        return HttpResponse('logout',status=status.HTTP_200_OK)

#Need Security policy 
class CookieAuthTest(viewsets.ModelViewSet):

    def get(self, request):
        try:
            if request.user:
                user = User.objects.get(username=request.user)
                if user.is_active:
                    if datetime.date(request.session.get_expiry_date()) > datetime.date(datetime.now()):
                        return HttpResponse(str(request.user),status=status.HTTP_200_OK)
                    else:
                        try:
                            uid = User.objects.get(username=str(request.user))
                        except:
                            return Response(status=status.HTTP_201_CREATED)
                        logout(request)
                        return HttpResponse('logout',status=status.HTTP_201_CREATED)
        except:
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

class PythonByDocker(viewsets.ModelViewSet):

    #1 Copy userfolder body
    #2 Build Docker Image -- clear
    #   docker build --tag pybox DOCKERDIR
    #3 Run Docker Image -- clear
    #   docker run pybox
    #4 Send Client printed result
    def post(self, request):
        print(request.data['cmd'])
        name = str(request.user)
        USER_STORAGE = STORAGE + name + '//' + request.data['url']
        #USER_STORAGE = STORAGE + str(request.user)
        #Clear DOcker Folder
        try:
            if not os.path.exists(DOCKDIR):
                os.makedirs(DOCKDIR)
        except:
            pass

        shutil.rmtree(DOCKDIR)
        #Copy User DIR
        shutil.copytree(USER_STORAGE,DOCKDIR)
        #Copy Dockerfile
        #Required -> Fix Dodcerfile
        #               Adjust Copy Directory/Run File
        #shutil.copy(DOCKFILES+'Dockerfile',DOCKDIR)
        with open(DOCKDIR + 'Dockerfile','w') as f:
            meg = 'FROM python:3\n\nCOPY . .\n\nWORKDIR .\n\nCMD [ "python","' + str(request.data['cmd'])  +'"]\n'
            f.write(meg)

        #create dump file   
        #open stdin stderr file
        with open(STATIC + 'output.txt', 'w') as output, open(STATIC + 'output.txt', 'r') as read_result, open(os.devnull,'a') as pipe:
            #build subprocess 
            cmd1 = "docker build --tag pybox " + DOCKDIR
            cmd2 = "docker run pybox"
            p1 = subprocess.Popen(cmd1.split(),stdout=pipe,stderr=pipe)
            p2 = subprocess.Popen(cmd2.split(), stdout=output, stderr=output)
            dump = ''
            flag = True
            #excete 
            try:
                #timeout value setting is service level
                out, err = p1.communicate(timeout=1)
            except subprocess.TimeoutExpired:
                p1.kill()
                out, err = p1.communicate()
            try:
                #timeout value setting is service level
                out, err = p2.communicate()
            except subprocess.TimeoutExpired:
                p2.kill()
                out, err = p2.communicate()
                dump += 'timeout error'
                flag = False
            finally:
                while flag:
                    temp = read_result.readline()
                    if not temp:
                        break
                    dump += temp
        print(dump)
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
            user = User.objects.get(username=str(c.name)) 
            user.is_active = True
            user.save()
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
        serial = UserCourseContentIndexSerializer(obj,many=True)
        return Response(data=serial.data,status=status.HTTP_200_OK)

class Upload(viewsets.ModelViewSet):

    def post(self, request):
        if request.user:
            name = str(request.user)
            p = request.FILES['files']
            dir = request.data['path'].split('/')
            dir = [name] + dir
            path = STORAGE

            for name in dir:
                if name:
                    pattern = '.*\..*'
                    r = re.match(pattern,name)
                    if r:
                        path += name
                    else:
                        path += name + '//'
                        if not os.path.exists(path):
                            os.makedirs(path)

            with open(path,mode='wb+') as f:
                for line in p:
                    f.write(line)
            
        data = {'ok':200}
        return Response(data=data,status=status.HTTP_200_OK)

class CreateCourse(viewsets.ModelViewSet):

    #create Course
    #required
    #title, desc
    def post(self, request):
        root = User.objects.get(username=request.user)
        title = request.data['title']
        desc = request.data['desc']
        new_course = UserCourse(title=title,descriptoin=desc,root=root)
        new_course.save()
        queryset = new_course
        serializer = UserCourseInfoSerializer(queryset)
        return Response(data=serializer.data,status=status.HTTP_200_OK)

class UpdateCourse(viewsets.ModelViewSet):

    #create Course
    #required
    #title, desc
    def post(self, request):
        root = User.objects.get(username=request.user)
        id = request.data['id']
        title = request.data['title']
        desc = request.data['desc']
        mycourse = UserCourse.objects.get(id=id)
        if mycourse.root == root:
            mycourse.title = title
            mycourse.desc = desc
            mycourse.save()

        queryset = mycourse
        serializer = UserCourseInfoSerializer(queryset)
        return Response(data=serializer.data,status=status.HTTP_200_OK)


class CreateChapter(viewsets.ModelViewSet):

    #create chapter
    #required
    #user, courseid,title,desc
    def post(self, request):
        root = User.objects.get(username=request.user)
        id = request.data['id']
        cid = request.data['cid']
        title = request.data['title']
        desc = request.data['desc']
        course = UserCourse.objects.get(id=id)
        #Auth Check
        if root == course.root:
            #Already create chapter check
            q = UserCourseContent.objects.all().filter(root=course,cid=cid)

            #Update Chapter
            if q:
                chapter = q.get()
                chapter.title = title
                chapter.descriptoin = desc
                chapter.save()                
                serializers = UserCourseContentSerializer(chapter)
                return Response(data=serializers.data,status=status.HTTP_200_OK)

            #Create New Chapter
            else:
                Chapter = UserCourseContent(root=course,title=title,descriptoin=desc,cid=cid)
                Chapter.save()
                serializers = UserCourseContentSerializer(Chapter)
                return Response(data=serializers.data,status=status.HTTP_200_OK)

class CreateSlide(viewsets.ModelViewSet):

    #required
    #user, courseid, chapterid, context
    def post(self, request):
        root = User.objects.get(username=request.user)
        id = request.data['id']
        cid = request.data['cid']
        sid = request.data['sid']
        text = request.data['context']
        course = UserCourse.objects.get(id=id)
        if root == course.root:
            q = UserCourseContent.objects.all().filter(root=course,cid=cid)
            if q:
                chapter = q.get()
                mod = UserCourseContentIndex.objects.all().filter(root=chapter,sid=sid)
                if mod:
                    slide = mod.get()
                    slide.context = text
                    slide.save()
                else:                    
                    slides = UserCourseContentIndex(root=chapter,context=text,sid=sid)
                    slides.save()
                    
        data = {'ok':200}
        return Response(data=data,status=status.HTTP_200_OK)

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
        data = {'ok':200}
        return Response(data=data,status=status.HTTP_200_OK)

class GetUser(viewsets.ModelViewSet):

    def get(self,request):
        data = {'ok':200}
        queryset = UserInfo.objects.all()
        serializers = UserInfoSerializer(queryset,many=True)
        return Response(data=serializers.data,status=status.HTTP_200_OK)

class GEtUserCourses(viewsets.ModelViewSet):

    def post(self, request):
        username = request.data['name']
        target = UserInfo.objects.get(id=username)
        target2 = target.root
        queryset = UserCourse.objects.all().filter(root=target2)
        print(queryset)
        serializers = UserCourseSerializer(queryset,many=True)
        return Response(data=serializers.data,status=status.HTTP_200_OK)

class DisableUser(viewsets.ModelViewSet):

    def post(self, request):
        target = User.objects.get(username=request.user)
        target.is_active = False
        target.save()
        data = {'ok':200}
        return Response(data=data,status=status.HTTP_200_OK)


class CourseUpload(viewsets.ModelViewSet):

    #required
    #base_url,[files]
    def post(self, request):
        name = str(request.user)
        path = STORAGE + name + '//' + request.data['base_url']
        #1 Check URL,
        #2 Make Files to base url

        for url in request.data:
            p = path
            urls = url.split('/')
            
            if url == 'base_url':
                pass
            else:
                for u in urls:
                    pattern = '.*\..*'
                    r = re.match(pattern,u)
                    if r:#if file                        
                        p += '//' + u
                    else:#if dir
                        p += '//' + u
                        if not os.path.exists(p):
                            os.makedirs(p)
                with open(p,'wb') as f:
                    f.write(request.data[url].encode('utf-8'))

        data = {}
        data['key'] = 'value'
        json_data = json.dumps(data)
        return Response(data=data,status=status.HTTP_200_OK)

def getTree(path,json,currentpath):

    try:
        for data in os.listdir(path):
            if os.path.isdir(os.path.join(path, data)):
                new = os.path.join(path, data)
                getTree(new,json,currentpath+'/'+data)
            elif data is None :
                pass
            else:
                context = ''
                with open(os.path.join(path, data),'rb') as f:
                    while True:
                        line = f.readline()
                        if not line:
                            break
                        context += line.decode('utf-8')
                #print(os.path.join(path, data))
                #print(currentpath+'/'+str(data))
                p = currentpath+'/'+str(data)
                json[p] = context
                #print(context)
    except:
        return ""
    return json


class getUserTree(viewsets.ModelViewSet):

    #required
    #url: base_url
    def post(self, request):
        data = {}
        target = request.data['url'] 
        path = STORAGE + str(request.user)
        try:
            for p in target.split('/'):
                path = os.path.join(path,p)
            data = getTree(path,data,'')
            json_data = json.dumps(data)
        except:
            return ""
        return Response(data=data,status=status.HTTP_200_OK)

class SearchCourse(generics.ListAPIView):
    serializer_class = UserCourseSerializer
    
    #type 0 root name
    #type 1 title
    #type 2 description
    def get_queryset(self):
        text = self.kwargs['text']
        try:
            user = User.objects.get(username=text)
            queryset = UserCourse.objects.filter( 
                Q(root=user) | Q(title__contains=text) | Q(descriptoin__contains=text)).order_by('-id')
        except:
            queryset = UserCourse.objects.filter( 
                Q(title__contains=text) | Q(descriptoin__contains=text)).order_by('-id')
        return queryset

class SearchUser(generics.ListAPIView):
    serializer_class = UserInfoSerializer
    
    def get_queryset(self):
        text = self.kwargs['text']
        try:
            user = User.objects.get(username=text)
        except:
            return []
        queryset = UserInfo.objects.filter(root=user)
        return queryset


class MypageUserget(viewsets.ModelViewSet):
    
    def get(self, request):
        queryset = UserInfo.objects.get(root=request.user)
        serializers = UserInfoSerializer(queryset)
        return Response(data=serializers.data,status=status.HTTP_200_OK)

class MypageUSerCourseget(viewsets.ModelViewSet):
    
    def get(self, request):
        root = User.objects.get(username=request.user)        
        queryset = UserCourse.objects.all().filter(root=root)
        serializers = UserCourseInfoSerializer(queryset,many=True)
        return Response(data=serializers.data,status=status.HTTP_200_OK)

class SearchUserinfoget(viewsets.ModelViewSet):
    
    def post(self, request):
        user = UserInfo.objects.get(id=request.data['name'])
        queryset = UserInfo.objects.get(root=user.root)
        serializers = UserInfoSerializer(queryset)
        return Response(data=serializers.data,status=status.HTTP_200_OK)

class getChapterinfo(viewsets.ModelViewSet):

    def post(self, request):
        target1 = UserCourse.objects.get(id=request.data['id'])
        queryset = UserCourseContent.objects.get(root=target1,cid=request.data['cid'])
        serializers = UserCourseContentSerializer(queryset)
        return Response(data=serializers.data,status=status.HTTP_200_OK)


class UserinfoCreate(viewsets.ModelViewSet):

    def post(self, request):
        user = User.objects.get(username=request.data['username'])
        queryset = UserInfo(root=user,gen='M',birth=request.data['birth'])
        queryset.save()
        data = {}
        data['key'] = 'ok'
        json_data = json.dumps(data)
        return Response(data=data,status=status.HTTP_200_OK)


class CreateComment(viewsets.ModelViewSet):

    def post(self, request):
        id = request.data['id']
        comment = request.data['comment']
        target = UserCourse.objects.get(id=id)
        new = UserCourseComment(root=target,auth=request.user,comment=comment)
        new.save()
        #UserCourseComment
        queryset = UserCourseComment.objects.all().filter(root=target).order_by('-createat')
        serializers = UserCourseCommentSerializer(queryset,many=True)
        return Response(data=serializers.data,status=status.HTTP_200_OK)

class UpdateUserProfile(viewsets.ModelViewSet):

    def post(self, request):
        queryset = UserInfo.objects.get(root=request.user)
        queryset.profile = request.data['profile'] 
        queryset.save()
        serializers = UserInfoSerializer(queryset)        
        return Response(data=serializers.data,status=status.HTTP_200_OK)

#Remain apis
# User Create api
# User Review create
class APItest(viewsets.ModelViewSet):

    def get(self, request):
        data = {}
        data['key'] = 'value'
        json_data = json.dumps(data)
        return Response(data=data,status=status.HTTP_200_OK)

    def post(self, request):
        data = {}
        data['key'] = 'ok'
        json_data = json.dumps(data)
        return Response(data=data,status=status.HTTP_200_OK)

