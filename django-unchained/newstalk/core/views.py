from django.shortcuts import render
from django.http import JsonResponse
from django.views.generic import ListView

from .models import NewsItem
from .serializers import NewsItemSerializer


class NewsList(ListView):
    model = NewsItem


def api_news_list(request):
    if request.method == 'GET':
        items = NewsItem.objects.all()
        serializer = NewsItemSerializer(items, many=True)
        return JsonResponse(serializer.data)

    elif request.method == 'POST':
        #TODO create new item
        pass