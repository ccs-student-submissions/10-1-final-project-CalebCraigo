from django.db import models
from django.contrib.auth.models import AbstractUser



class CustomUser(AbstractUser):
    pass


class UserProfile(models.Model):
    name = models.CharField(max_length=255)
    avatar = models.ImageField(upload_to='images/', blank=True, null=True)
    created_by = models.OneToOneField(CustomUser, related_name='profile', null=True, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)
    highlights = models.ManyToManyField('Highlight', related_name='highlights', blank=True)
    establishmenttypes = models.ManyToManyField('EstablishmentType', related_name='establishmenttypes', blank=True)
    cuisines = models.ManyToManyField('Cuisine', related_name='cuisines', blank=True)


    def __str__(self):
        return self.name


class Highlight(models.Model):
    text = models.CharField(max_length=255)

    def __str__(self):
        return self.text


class EstablishmentType(models.Model):
    text = models.CharField(max_length=255)

    def __str__(self):
        return self.text


class Cuisine(models.Model):
    text = models.CharField(max_length=255)

    def __str__(self):
        return self.text


# class PriceRange(models.Model):
#     price1 = models.BooleanField(default=False)
#     price2 = models.BooleanField(default=False)
#     price3 = models.BooleanField(default=False)
#     price4 = models.BooleanField(default=False)
#     price5 = models.BooleanField(default=False)

    # def __str__(self):
    #     return self.text
    # def __init__(self, *args, **kwargs):
    #
    #     super(ChoicesForm, self).__init__(*args, **kwargs)
    #
    #     self.fields['preferences'].widget = CheckboxSelectMultiple()
    #     self.fields['preferences'].queryset = Choices.objects.all()
