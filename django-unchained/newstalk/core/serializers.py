import requests

from rest_framework import serializers
from .models import NewsItem

class NewsItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsItem
        fields = ('id','title', 'picture', 'description', 'link', 'date')

    def validate_link(self, value):
        if link_exists(value):
            return value
        raise serializers.ValidationError("Link doesn't exist")

def link_exists(url):
    if url.startswith('http'):
        response = requests.get(url)
        if response.status_code == 200:
            return True
        
    return False