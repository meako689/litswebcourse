from django.urls import path

from .views import ApiNewsList, ApiNewsDetail
urlpatterns = [
    path('news', ApiNewsList.as_view()),
    path('news/<int:id>', ApiNewsDetail.as_view()),
]