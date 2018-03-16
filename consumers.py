from channels.generic.websocket import WebsocketConsumer
import json

class ChatConsumer(WebsocketConsumer):
    def connect(self):

        self.accept()

    def disconnect(self, close_code):
        pass

    def receive(self,text_data):
        username = self.scope["user"]
        username_str = username.username
        print(username_str)

        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        print (message)
        self.send(text_data=json.dumps({
            'message': ' " '+message+' " ' + " posted by the king:" + username_str
        }))
