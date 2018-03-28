import os
from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.generic import ListView
from django.views.decorators.csrf import csrf_exempt

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework import generics

from .models import NewsItem, ChatMessage
from .serializers import NewsItemSerializer, ChatMessageSerializer

from django.conf import settings 


def index(request):
    path = os.path.join(settings.FRONTEND_DIR, 'index.html')
    with open(path, 'r') as indexfile:
        content = indexfile.read()
        return HttpResponse(content)

class NewsList(ListView):
    model = NewsItem


class ApiNewsList(generics.ListCreateAPIView):
    queryset = NewsItem.objects.all().order_by('-date')
    serializer_class = NewsItemSerializer


class ApiNewsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = NewsItem.objects.all()
    serializer_class = NewsItemSerializer


class MessageHistory(generics.ListAPIView):
    serializer_class = ChatMessageSerializer

    def get_queryset(self):
        return ChatMessage.objects.filter(room__group_name=self.kwargs['room'])
