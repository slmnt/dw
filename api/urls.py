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


urlpatterns = [
    path('authentic/',UserAuthentic.as_view()),
    path('createuser/',CreateUser.as_view()),
    path('createmuser/',CreateMUser.as_view()),
    path('addboard/',board_list),
    path('getboard/',getboard),
    path('getboardnum/',getboardnum),
    path('getboardpage/',getboardpage),
    path('cookieauth/',cokkie),
    path('python/',python),
    path('code/',codesec),
    path('user/',user),
    path('igetboard/<id>',icodeget.as_view()),
    path('getlist/',Codelistget.as_view())

]
