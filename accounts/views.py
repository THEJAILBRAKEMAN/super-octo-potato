from django.contrib import messages
from django.contrib.auth import login
from django.shortcuts import redirect, render

from .forms import RegistrationForm


def register(request):
    if request.method == "POST":
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            messages.success(request, "Welcome to The Hive! Your account has been created.")
            return redirect("forum_list")
    else:
        form = RegistrationForm()
    return render(request, "registration/register.html", {"form": form})
