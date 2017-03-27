from django.shortcuts import render
from django.views.generic import View
from debt.controllers import MortgageUtils

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

        MortgageUtils.add_mortgage(
            principal_balance=request.POST['balance'],
            interest_rate=1.2,
            name='foo',
            description='mortgage',
            mortgage_insurance=200,
            home_insurance=500,
            property_tax=100,
        )

        return render(request, 'mortgage-submission.html', template_vars)
