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

        MortgageUtils.add_mortgage(
            principal_balance=request.POST['balance'],
            interest_rate=request.POST['interest_rate'],
            name=request.POST['name'],
            description='description',
            mortgage_insurance=200,
            home_insurance=500,
            property_tax=100,
            user_id=1,
        )
        # if the user is authenticated save to account and take to overview
        if request.user.is_authenticated():
            render(request, 'overview.html')

        template_vars = {
            'get_started': 'Save!',
        }
        return render(request, 'sign-in.html', template_vars)
