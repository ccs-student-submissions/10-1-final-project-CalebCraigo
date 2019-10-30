from rest_framework import serializers
from accounts.models import UserProfile

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('name', 'avatar', 'id')
