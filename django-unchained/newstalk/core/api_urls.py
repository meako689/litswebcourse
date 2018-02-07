from django.urls import path

from .views import api_news_list

urlpatterns = [
    path('news', api_news_list),
]