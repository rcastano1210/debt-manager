from django.conf.urls import url
from .views import AccountView

ACCOUNT = 'account'
ACCOUNT_URL = r'^{}/'.format(ACCOUNT)

urlpatterns = [
    url(ACCOUNT_URL, AccountView.as_view(), name=ACCOUNT),
]
