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
    'get': 'get'
})

addcomment = Commentadd.as_view({
    'post': 'post'
})

get_auth = Getuser.as_view({
    'get': 'get'
})

check_mail_code = CheckMailing.as_view({
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

Upload = Upload.as_view({
    'post': 'post'
})

apitest = APItest.as_view({
    'post': 'post',
    'get': 'get'
})

createcourse = CreateCourse.as_view({
    'post': 'post'
})
createchapter = CreateChapter.as_view({
    'post': 'post'
})
craeteslide = CreateSlide.as_view({
    'post': 'post'
})
updatecourse = UpdateCourse.as_view({
    'post': 'post'
})
disableuser = DisableUser.as_view({
    'post': 'post'
})
courseupload = CourseUpload.as_view({
    'post': 'post'
})
pythonbydocker = PythonByDocker.as_view({
    'post': 'post'
})
getusertree = getUserTree.as_view({
    'post': 'post'
})
getusercourse = GEtUserCourses.as_view({
    'post': 'post'
})
mypageuserget = MypageUserget.as_view({
    'get': 'get'
})
mypageusercourseget = MypageUSerCourseget.as_view({
    'get': 'get'
})
searchuserinfoget = SearchUserinfoget.as_view({
    'post': 'post'
})
getchapterinfo = getChapterinfo.as_view({
    'post': 'post'
})
createuserinfo = UserinfoCreate.as_view({
    'post': 'post'
})
createcomment = CreateComment.as_view({
    'post': 'post'
})
updateuserprofile = UpdateUserProfile.as_view({
    'post': 'post'
})

urlpatterns = [

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

    #User Course Get
    #FIX
    path('getusercourseinfo/',getusercourse),
    path('getchapterinfo/',getchapterinfo),

    #FIX
    path('getusercourse/',Get_User_Course),
    path('getusercoursec/',Get_User_Course_content),
    path('getCourseInfoContentsInfo/<id>',CourseInfoConetntsInfoGet.as_view()),
    path('getusercourseid/',Get_User_Course_info),
    path('getusercourseindex/',Get_User_Course_index),
    path('getusercoursecomment/<id>',GetUserCourseComments.as_view()),

    #File Upload
    path('upload/',Upload),

    #User Course Create
    #FIX
    path('createcourse/',createcourse),
    path('craetechapter/',createchapter),
    path('createslide/',craeteslide),
    path('courseupload/',courseupload),
    path('usercoursetree/',getusertree),

    #User Course Update
    #FIX
    path('updatecourse/',updatecourse),

    #Course Search
    path('searchcourse/<text>',SearchCourse.as_view()),
    path('createcomment/',createcomment),

    #UserSearch
    #FIX
    path('searchuser/<text>',SearchUser.as_view()),
    path('searchuserinfo/',searchuserinfoget),

    #mypage
    path('mypageuserget/',mypageuserget),
    path('mypagecourseget/',mypageusercourseget),

    #path('test',apitest),
    path('test/',apitest),

]
