from django.shortcuts import render
from django.views.generic import View
from debt.models import Mortgage

class MortgageCalculatorView(View):
    def get(self, request):
        template_vars = {
            'balance': 150000,
            'interest_rate': 4.5,
            'loan_terms': [10, 15, 30],
        }
        return render(request, 'mortgage-calculator.html', template_vars)

    def post(self, request):
        template_vars = {
            'balance': 150000,
            'interest_rate': 4.5,
            'loan_terms': [10, 15, 30],
        }
        mortgage = Mortgage.objects.create(
            principal_balance=request.POST['balance'],
        )
        mortgage.save()
        return render(request, 'mortgage-calculator.html', template_vars)
