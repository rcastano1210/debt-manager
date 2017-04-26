from django.shortcuts import render
from django.views.generic import View

class HomeView(View):
    def get(self, request):
        template_vars = {}
        return render(request, 'home.html', template_vars)