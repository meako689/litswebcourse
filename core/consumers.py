from channels.generic.websocket import WebsocketConsumer, AsyncWebsocketConsumer
from channels.db import database_sync_to_async

import json

from .models import ChatRoom, ChatMessage

class ChatConsumer(AsyncWebsocketConsumer):

    @database_sync_to_async
    def get_room(self):
        return ChatRoom.objects.get_or_create(
                group_name = self.room_group_name)[0]

    @database_sync_to_async
    def save_message(self, message, username, user):
        return ChatMessage.objects.create(room=self.room,
                text=message,
                author=user if user.is_authenticated else None,
                username=username)


    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs'].get('pk', 'all')
        self.room_group_name = 'chat_%s' % self.room_name

        self.room = await self.get_room()
        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        user = self.scope.get('user')
        username = user.username or 'anonymous'

        await self.save_message(message, username, user)

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'text': message,
                'username': username
            }
        )

    async def chat_message(self, event):
        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'text': event['text'],
            'username': event['username']
        }))
