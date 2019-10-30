from django.db import models
from django.contrib.auth.models import AbstractUser



class CustomUser(AbstractUser):
    pass


# class Prefence(models.Model):
#     text = models.CharField(max_length=255)

    # def __init__(self, *args, **kwargs):
    #
    #     super(ChoicesForm, self).__init__(*args, **kwargs)
    #
    #     self.fields['preferences'].widget = CheckboxSelectMultiple()
    #     self.fields['preferences'].queryset = Choices.objects.all()


class UserProfile(models.Model):
    name = models.CharField(max_length=255)
    avatar = models.ImageField(upload_to='images/', blank=True, null=True)
    created_by = models.OneToOneField(CustomUser, related_name='profile', null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
