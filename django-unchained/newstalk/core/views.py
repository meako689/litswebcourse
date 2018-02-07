from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.generic import ListView
from django.views.decorators.csrf import csrf_exempt

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser

from .models import NewsItem
from .serializers import NewsItemSerializer


class NewsList(ListView):
    model = NewsItem

@api_view(['GET', 'POST'])
def api_news_list(request):
    if request.method == 'GET':
        items = NewsItem.objects.all().order_by('-date')
        serializer = NewsItemSerializer(items, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = NewsItemSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


@api_view(['GET', 'PUT', 'DELETE'])
def api_news_detail(request, id):
    try:
        item = NewsItem.objects.get(id=id)
    except NewsItem.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = NewsItemSerializer(item)
        return Response(serializer.data)

    if request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = NewsItemSerializer(item, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return Response(serializer.errors, status=400)

    if request.method == 'DELETE':
        item.delete()
        return HttpResponse(status=204)