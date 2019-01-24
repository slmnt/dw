from .views import *
from django.urls import path

board_list = Addboard.as_view({
    'post': 'post'
})

getboard = Getboard.as_view({
    'get': 'get'
})

cokkie = CookieAuthTest.as_view({
    'get': 'get'
})

python = Python.as_view({
    'post': 'post'
})

getboardnum = Getboardnum.as_view({
    'get': 'get'
})

getboardpage = GetboardPage.as_view({
    'post': 'post'
})

codesec = CodeSerial.as_view({
    'get': 'get',
    'post': 'post'
})

user = userinfo.as_view({
    'get': 'get'
})

addcomment = Commentadd.as_view({
    'post': 'post'
})

get_auth = Getuser.as_view({
    'get': 'get'
})

check_mail_code = CheckMailing.as_view({
    'get': 'get',
    'post': 'post'
})

Get_User = GetUserInfo.as_view({
    'get': 'get',
    'post': 'post'
})

Get_User_Course = GetUserCourse.as_view({
    'get': 'get',
    'post': 'post'
})
Get_User_Course_info = GetUserCourseContentid.as_view({
    'post': 'post'
})

Get_User_Course_content = GetUserCourseContent.as_view({
    'get': 'get',
    'post': 'post'
})
Get_User_Course_index = GetUserCourseContentIndex.as_view({
    'post': 'post'    
})

Upload = TestUpload.as_view({
    'post': 'post'
})


urlpatterns = [
    path('authentic/',UserAuthentic.as_view()),
    path('createuser/',CreateUser.as_view()),
    path('createmuser/',CreateMUser.as_view()),
    path('addboard/',board_list),
    path('getboard/',getboard),
    path('getboardnum/',getboardnum),
    path('getboardpage/',getboardpage),
    path('cookieauth/',cokkie),
    path('logout/',Logout.as_view()),
    path('python/',python),
    path('code/',codesec),
    path('user/',user),
    path('igetboard/<id>',icodeget.as_view()),
    path('getcomment/<id>/',commentget.as_view()),
    path('getlist/',Codelistget.as_view()),
    path('addcomment/',addcomment),
    path('search/<type>/<context>/',Searchget.as_view()),
    path('getauth/',get_auth),
    path('checkmail/',check_mail_code),
    path('getuser/',Get_User),
    path('getusercourse/',Get_User_Course),
    path('getusercoursec/',Get_User_Course_content),
    path('getCourseInfoContentsInfo/<id>',CourseInfoConetntsInfoGet.as_view()),
    path('getusercourseid/',Get_User_Course_info),
    path('getusercourseindex/',Get_User_Course_index),
    path('getusercoursecomment/<id>',GetUserCourseComments.as_view()),
    path('upload/',Upload),


]
