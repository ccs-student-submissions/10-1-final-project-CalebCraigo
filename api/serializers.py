from rest_framework import serializers
from accounts.models import UserProfile, CustomUser


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ('name', 'avatar', 'id',)


class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()
    class Meta:
        model = CustomUser
        fields = '__all__'
