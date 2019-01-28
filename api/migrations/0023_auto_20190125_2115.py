# Generated by Django 2.1.1 on 2019-01-25 12:15

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0022_usercoursecontentindex_sid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usercoursecontentindex',
            name='sid',
            field=models.IntegerField(default=-1, validators=[django.core.validators.MinValueValidator(-1), django.core.validators.MaxValueValidator(30)]),
        ),
    ]
