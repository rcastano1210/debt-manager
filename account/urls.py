from django.conf.urls import url
from .views import AccountView, SignInView

ACCOUNT = 'account'
ACCOUNT_URL = r'^{}/$'.format(ACCOUNT)

SIGN_IN = 'sign-in'
SIGN_IN_URL = r'^{}/$'.format(SIGN_IN)

urlpatterns = [
    url(ACCOUNT_URL, AccountView.as_view(), name=ACCOUNT),
    url(SIGN_IN_URL, SignInView.as_view(), name=SIGN_IN),
]
