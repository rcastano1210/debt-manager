from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.shortcuts import render
from django.views.generic import View


class AccountView(View):

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
        email = request.POST['email']
        password = request.POST['password']

        user = User.objects.create_user(username=email,
                                        email=email,
                                        password=password)

        return render(request, 'overview.html')

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
