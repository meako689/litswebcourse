from django.urls import path

from .views import api_news_list, api_news_detail

urlpatterns = [
    path('news', api_news_list),
    path('news/<int:id>', api_news_detail),
]