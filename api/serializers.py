from rest_framework import serializers
from accounts.models import UserProfile, CustomUser, Highlight
from django import forms


class HighlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Highlight
        fields = ['text',]

class UserProfileSerializer(serializers.ModelSerializer):
    highlights = serializers.ListField(write_only=True)

    class Meta:
        model = UserProfile
        fields = ('name', 'avatar', 'id', 'highlights',)


    def create(self, validated_data):
        highlights_data = validated_data.pop('highlights')
        highlights_data = highlights_data[0].slice(',')
        profile = UserProfile.objects.create(**validated_data)
        for highlight in highlights_data:
            highlight, created = Highlight.objects.get_or_create(text=highlight)
            profile.highlights.add(highlight)
        return profile


class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()
    class Meta:
        model = CustomUser
        fields = '__all__'
