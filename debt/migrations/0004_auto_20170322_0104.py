# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-03-22 01:04
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('debt', '0003_auto_20170219_0603'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mortgage',
            name='end_date',
            field=models.DateField(default=datetime.date.today),
        ),
    ]
