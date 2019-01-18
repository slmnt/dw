# Generated by Django 2.0.7 on 2018-12-27 01:35

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('api', '0004_auto_20181203_1022'),
    ]

    operations = [
        migrations.CreateModel(
            name='Techinfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=15)),
                ('context', models.TextField()),
                ('createat', models.DateTimeField(default=django.utils.timezone.now)),
                ('count', models.IntegerField(default=0)),
                ('auth', models.ForeignKey(default=False, on_delete=False, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Usertechinfo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default='null', max_length=15)),
                ('context', models.TextField()),
                ('createat', models.DateTimeField(default=django.utils.timezone.now)),
                ('updateat', models.DateTimeField(default=django.utils.timezone.now)),
                ('count', models.IntegerField(default=0)),
                ('comments', models.IntegerField(default=0)),
                ('auth', models.ForeignKey(default=False, on_delete=False, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Usertechinfocomment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('coments', models.CharField(max_length=1000)),
                ('createat', models.DateTimeField(default=django.utils.timezone.now)),
                ('auth', models.ForeignKey(default=False, on_delete=False, to=settings.AUTH_USER_MODEL)),
                ('root', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Usertechinfo')),
            ],
        ),
    ]