import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import Game

class PongConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
        self.game = Game()
        asyncio.create_task(self.game.run())

    async def disconnect(self, close_code):
        await self.close()

    async def receive(self, text_data):
        message = text_data
        player = self.game.getPlayerFromSocket(self)
        if player is None:
            return
        player.center.y = ord(message[0]) - 128
        player.center.y += (ord(message[1]) - 128) / 10