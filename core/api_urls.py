from django.urls import path

from .views import ApiNewsList, ApiNewsDetail
urlpatterns = [
    path('news', ApiNewsList.as_view()),
    path('news/<int:pk>', ApiNewsDetail.as_view()),
]