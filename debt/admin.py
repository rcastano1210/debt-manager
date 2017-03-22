from django.contrib import admin

from debt.models import Mortgage, ExtraMortgagePayment, Loan

admin.site.register(Mortgage)
admin.site.register(ExtraMortgagePayment)
admin.site.register(Loan)

