from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.forms.models import ModelForm
from .models import CustomUser, UserProfile

class CustomUserCreationForm(UserCreationForm):

    class Meta:
        model = CustomUser
        fields = ('username', 'email',)


class CustomUserChangeForm(UserChangeForm):

    class Meta:
        model = CustomUser
        fields = ('username', 'email',)


# class ChoicesForm(ModelForm):
#
#     class Meta:
#         model = UserProfile
#         fields = ('highlights', 'establishmenttypes', 'cuisines',)
