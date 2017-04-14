from __future__ import unicode_literals

from django.db import models
from datetime import date, datetime
from django.contrib.auth.models import User


class Mortgage(models.Model):

    def __unicode__(self):
        return self.name

    date_created = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    date_modified = models.DateTimeField(auto_now=True, blank=True, null=True)

    # foreign key to the user
    user = models.ForeignKey(User)

    # Fields
    name = models.CharField(max_length=30, default="Name")
    description = models.CharField(max_length=500, default="")
    principal_balance = models.FloatField(help_text="current amount owed")
    interest_rate = models.FloatField(help_text="0.0%")
    mortgage_insurance = models.FloatField(help_text="$0.00")
    home_insurance = models.FloatField(help_text="$0.00")
    property_tax = models.FloatField(help_text="$0.00")
    start_date = models.DateField(default=date.today)
    end_date = models.DateField(default=date.today)


class Loan(models.Model):

    def __unicode__(self):
        return self.name

    date_created = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    date_modified = models.DateTimeField(auto_now=True, blank=True, null=True)

    # Fields
    name = models.CharField(max_length=30, default="Name")
    description = models.CharField(max_length=500, default="")
    principal_balance = models.FloatField(help_text="current amount owed")
    interest_rate = models.FloatField(help_text="0.0%")
    start_date = models.DateField(default=date.today)
    end_date = models.DateField()


class ExtraMortgagePayment(models.Model):

    def __unicode__(self):
        return "${} on {}".format(self.payment_amount, self.payment_date.strftime("%m/%d/%y"))
    
    date_created = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    date_modified = models.DateTimeField(auto_now=True, blank=True, null=True)

    # Fields
    mortgage = models.ForeignKey('Mortgage', on_delete=models.CASCADE,)
    payment_amount = models.FloatField(help_text="$0.00")
    payment_date = models.DateField(default=date.today)