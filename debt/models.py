from __future__ import unicode_literals

from django.db import models
from datetime import date

# Create your models here.

class Mortgage(models.Model):
    date_created = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    date_modified = models.DateTimeField(auto_now=True, blank=True, null=True)

    # Fields
    principal_balance = models.FloatField(help_text="current amount owed")
    interest_rate = models.FloatField(help_text="0.0%")
    mortgage_insurance = models.FloatField(help_text="$0.00")
    home_insurance = models.FloatField(help_text="$0.00")
    property_tax = models.FloatField(help_text="$0.00")
    start_date = models.DateField(default=date.today)
    end_date = models.DateField()