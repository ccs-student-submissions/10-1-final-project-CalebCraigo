from rest_framework import serializers
from accounts.models import UserProfile, CustomUser, Highlight
from django import forms
import json


class HighlightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Highlight
        fields = ['text',]


class UserProfileSerializer(serializers.ModelSerializer):
    highlights = HighlightSerializer(many=True, required=False)

    class Meta:
        model = UserProfile
        fields = ('name', 'avatar', 'id', 'highlights',)

    def create(self, validated_data):
        # Converts the stringified array from the from end into a python list
        highlights_data = json.loads(self.context['request'].data['highlights'])
        profile = UserProfile.objects.create(**validated_data)

        for highlight in highlights_data:
            highlight = Highlight.objects.get(text=highlight)
            profile.highlights.add(highlight)
        return profile

    def update(self, instance, validated_data):
        highlights_data = json.loads(self.context['request'].data['highlights'])
        # instance.highlights= validated_data.get('highlights', instance.highlights)
        profile = UserProfile.objects.update(**validated_data)


        for highlight in highlights_data:
            instance.highlight = Highlight.objects.get('text', instance.highlight)
            profile.highlights.add(highlight)
        return profile

# class MasterSerializer(serializers.ModelSerializer):
#     skill_ids = serializers.ListField(write_only=True)
#
#     def update(self, instance, validated_data):
#
#     # ...
#     validated_data['skill_ids'] = filter(None, validated_data['skill_ids'])
#     for skill_id in validated_data['skill_ids']:
#         skill = Skill.objects.get(pk=skill_id)
#         instance.skills.add(skill)
#
#     return instance



class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()
    class Meta:
        model = CustomUser
        fields = '__all__'
