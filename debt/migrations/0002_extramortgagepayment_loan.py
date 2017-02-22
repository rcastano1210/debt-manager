# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-02-11 21:04
from __future__ import unicode_literals

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('debt', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ExtraMortgagePayment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_created', models.DateTimeField(auto_now_add=True, null=True)),
                ('date_modified', models.DateTimeField(auto_now=True, null=True)),
                ('payment_amount', models.FloatField(help_text='$0.00')),
                ('payment_date', models.DateField(default=datetime.date.today)),
            ],
        ),
        migrations.CreateModel(
            name='Loan',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_created', models.DateTimeField(auto_now_add=True, null=True)),
                ('date_modified', models.DateTimeField(auto_now=True, null=True)),
                ('principal_balance', models.FloatField(help_text='current amount owed')),
                ('interest_rate', models.FloatField(help_text='0.0%')),
                ('start_date', models.DateField(default=datetime.date.today)),
                ('end_date', models.DateField()),
            ],
        ),
    ]