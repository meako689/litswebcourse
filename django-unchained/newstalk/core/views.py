from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.generic import ListView
from django.views.decorators.csrf import csrf_exempt

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework import generics

from .models import NewsItem
from .serializers import NewsItemSerializer


class NewsList(ListView):
    model = NewsItem


class ApiNewsList(generics.ListCreateAPIView):
    queryset = NewsItem.objects.all().order_by('-date')
    serializer_class = NewsItemSerializer


class ApiNewsDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = NewsItem.objects.all()
    serializer_class = NewsItemSerializer

