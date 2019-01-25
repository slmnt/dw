from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(Codetype)
admin.site.register(Code)
admin.site.register(CertiList)
admin.site.register(UserInfo)
admin.site.register(UserCourse)
admin.site.register(UserCourseContent)
admin.site.register(Ads)
admin.site.register(Adque)
admin.site.register(UserCourseComment)
admin.site.register(UserCourseContentIndex)

