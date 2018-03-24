from django.conf.urls import url

from . import consumers

websocket_urlpatterns = [
    url(r'^news/chat/(?P<pk>\d+)',consumers.ChatConsumer),
    url(r'^news/chat/)',consumers.ChatConsumer)
]
