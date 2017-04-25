from django.conf.urls import url
from debt.views import MortgageCalculatorView

MORTGAGE_CALCULATOR = 'mortgage-calculator'
MORTGAGE_CALCULATOR_URL = r'^{}/$'.format(MORTGAGE_CALCULATOR)

urlpatterns = [
    url(MORTGAGE_CALCULATOR_URL, MortgageCalculatorView.as_view(), name=MORTGAGE_CALCULATOR),
]