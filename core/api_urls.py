from django.urls import path

from .views import ApiNewsList, ApiNewsDetail, MessageHistory
urlpatterns = [
    path('news', ApiNewsList.as_view()),
    path('news/<int:pk>', ApiNewsDetail.as_view()),
    path('chat/<str:room>', MessageHistory.as_view())
]
