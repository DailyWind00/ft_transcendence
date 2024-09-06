from channels.generic.websocket import WebsocketConsumer
import json
from .models import Room

class PongConsumer(WebsocketConsumer):
    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'room_{self.room_name}'

        # Joindre la room
        self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        # Quitter la room
        self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    # Recevoir des messages du WebSocket (par exemple, mouvements de la balle)
    def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message']

        # Envoyer le message à tous les membres de la room
        self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'pong_message',
                'message': message
            }
        )

    # Gérer les messages de la room
    def pong_message(self, event):
        message = event['message']
        # Envoyer le message à l'autre joueur
        self.send(text_data=json.dumps({
            'message': message
        }))