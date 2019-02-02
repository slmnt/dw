from .views import *
from django.urls import path

cokkie = CookieAuthTest.as_view({
    'get': 'get'
})

python = Python.as_view({
    'post': 'post'
})

codesec = CodeSerial.as_view({
    'get': 'get',
    'post': 'post'
})

user = userinfo.as_view({
    'get': 'get',
    'post': 'post'
})

addcomment = Commentadd.as_view({
    'get': 'get',
    'post': 'post'
})

get_auth = Getuser.as_view({
    'get': 'get',
    'post': 'post'
})

check_mail_code = CheckMailing.as_view({
    'get': 'get',
    'post': 'post'
})

Get_User = GetUserInfo.as_view({
    'get': 'get',
    'post': 'post'
})

Get_User_Course_info = GetUserCourseContentid.as_view({
    'get': 'get',
    'post': 'post'
})

Get_User_Course_content = GetUserCourseContent.as_view({
    'get': 'get',
    'post': 'post'
})
Get_User_Course_index = GetUserCourseContentIndex.as_view({
    'get': 'get',
    'post': 'post'
})

Upload = Upload.as_view({
    'get': 'get',
    'post': 'post'
})

apitest = APItest.as_view({
    'get': 'get',
    'post': 'post'
})
createcourse = CreateCourse.as_view({
    'get': 'get',
    'post': 'post'
})
createchapter = CreateChapter.as_view({
    'get': 'get',
    'post': 'post'
})
craeteslide = CreateSlide.as_view({
    'get': 'get',
    'post': 'post'
})
updatecourse = UpdateCourse.as_view({
    'get': 'get',
    'post': 'post'
})
disableuser = DisableUser.as_view({
    'get': 'get',
    'post': 'post'
})
courseupload = CourseUpload.as_view({
    'get': 'get',
    'post': 'post'
})
pythonbydocker = PythonByDocker.as_view({
    'get': 'get',
    'post': 'post'
})
getusertree = getUserTree.as_view({
    'get': 'get',
    'post': 'post'
})
getusercourse = GEtUserCourses.as_view({
    'get': 'get',
    'post': 'post'
})
mypageuserget = MypageUserget.as_view({
    'get': 'get',
    'post': 'post'
})
mypageusercourseget = MypageUSerCourseget.as_view({
    'get': 'get',
    'post': 'post'
})
searchuserinfoget = SearchUserinfoget.as_view({
    'get': 'get',
    'post': 'post'
})
createuserinfo = UserinfoCreate.as_view({
    'get': 'get',
    'post': 'post'
})
createcomment = CreateComment.as_view({
    'get': 'get',
    'post': 'post'
})
updateuserprofile = UpdateUserProfile.as_view({
    'get': 'get',
    'post': 'post'
})
userinfomation = Userinfomation.as_view({
    'get': 'get',
    'post': 'post'
})

urlpatterns = [
#userinfo get,create

    #User Authentic
    path('authentic/',UserAuthentic.as_view()),
    path('cookieauth/',cokkie),
    path('logout/',Logout.as_view()),
    path('deleteuser/',disableuser),

    #CreateUser
    path('createuser/',CreateUser.as_view()),
    path('createmuser/',CreateMUser.as_view()),
    path('checkmail/',check_mail_code),
    path('createuserinfo/',createuserinfo),

    path('updateuserprofile/',updateuserprofile),

    #Excute python project/code
    path('python/',python),
    path('dockpy',pythonbydocker),

    path('code/',codesec),
    path('user/',user),
    path('igetboard/<id>',icodeget.as_view()),
    path('getcomment/<id>/',commentget.as_view()),
    path('getlist/',Codelistget.as_view()),
    path('addcomment/',addcomment),
    path('search/<type>/<context>/',Searchget.as_view()),
    path('getauth/',get_auth),

    path('getuser/',Get_User),

    #File Upload
    path('upload/',Upload),

    #User Course Create
    path('course/',createcourse),
    path('chapter/',createchapter),
    path('slide/',craeteslide),
    path('courseupload/',courseupload),
    path('usercoursetree/',getusertree),

    #User Course Update
    path('updatecourse/',updatecourse),

    #Course Search
    path('searchcourse/<text>',SearchCourse.as_view()),
    path('comment/',createcomment),

    #FIX
    path('getusercoursecomment/<id>',GetUserCourseComments.as_view()),

    #UserSearch
    #FIX
    path('searchuser/<text>',SearchUser.as_view()),
    path('searchuserinfo/',searchuserinfoget),

    #mypage
    path('userinfo/',userinfomation),


    #path('test',apitest),
    path('test/',apitest),

]
