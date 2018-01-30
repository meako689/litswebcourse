from rest_framework import serializers
from .models import NewsItem

class NewsItemSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField(max_length=150)
    description = serializers.CharField(allow_blank=True, required=False)
    link = serializers.CharField(max_length=450, allow_blank=True, required=False)
    picture = serializers.CharField(max_length=450, allow_blank=True, required=False)

    def create(self, validated_data):
        return NewsItem.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.title = validated_data['title']
        instance.description = validated_data['description']
        instance.link = validated_data['link']
        instance.picture = validated_data['picture']
        instance.save()

