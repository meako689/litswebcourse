from django.conf.urls import url

from . import consumers

websocket_urlpatterns = [
    url('^news/chat/$',consumers.ChatConsumer)
]