from django.conf.urls import url

from . import consumers

websocket_urlpatterns = [
    url(r'^news/chat/(?P<id>\d+)',consumers.ChatConsumer)
]
