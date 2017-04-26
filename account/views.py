from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.shortcuts import render
from django.db import IntegrityError
from django.views.generic import View


class AccountView(View):

    def _authenticate(self):
        user = authenticate(request=self.request, username=self.email, password=self.password)
        return user

    def get(self, request):
        # if the user is authenticated, then deliver the overview page
        if request.user.is_authenticated():
            render(request, 'overview.html')

        # if the user is NOT authenticated, invite the user to create an account
        template_vars = {
            'get_started': 'Start mapping!',
        }
        return render(request, 'account.html', template_vars)

    def post(self, request):
        self.request = request
        self.email = request.POST['email']
        self.password = request.POST['password']

        if User.objects.filter(username=self.email).exists():
            self.user = self._authenticate()
        else:
            self.user = User.objects.create_user(username=self.email,
                                                 email=self.email,
                                                 password=self.password)

        if self.user is not None:
            login(self.request, self.user)

        return render(request, 'overview.html')

    def __init__(self):
        self.request = None
        self.email = None
        self.password = None
        self.user = None

class SignInView(View):

    def get(self, request):
        if request.user.is_authenticated():
            render(request, 'overview.html')

        return render(request, 'sign-in.html')

    def post(self, request):
        email = request.POST['email']
        password = request.POST['password']
        user = authenticate(username=email, password=password)

        if user is not None:
            return render(request, 'overview.html')
        else:
            template_vars = {
                'wrong_password': 'Wrong Password! Please try again',
            }
            return render(request, 'sign-in.html', template_vars)
