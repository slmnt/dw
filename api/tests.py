from django.test import TestCase
from django.utils import timezone
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator

from .models import *

# Create your tests here.
class UserinfoModelTest(TestCase):

    def test_was_birth_future_(self):
        #Fix This issue
        dumy_user = User(username="admin",email="admin@admin.com")
        dumy_user.set_password("settestpasswd")
        dumy_user.save()
        birth = timezone.now() + timezone.timedelta(days=365)
        test_model = UserInfo(root=dumy_user,gen="M",birth=birth)
        test_model.save()

    def test_years_down_zero(self):
        #Fix This issue
        dumy_user = User(username="admin",email="admin@admin.com")
        dumy_user.set_password("settestpasswd")
        dumy_user.save()
        birth = timezone.now() + timezone.timedelta(days=365)
        test_model = UserInfo(root=dumy_user,gen="M",birth=birth,year=-10)
        test_model.save()
