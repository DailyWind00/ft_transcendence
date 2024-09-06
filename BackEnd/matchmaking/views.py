from rest_framework.response import Response
from rest_framework import status, viewsets
from django.contrib.auth.models import User
from .models import Room, Match
from .serializers import RoomSerializer, MatchSerializer
import redis

r = redis.Redis()

class MatchmakingViewSet(viewsets.ViewSet):
    def join_queue(self, request):
        """Ajouter un joueur à la file d'attente"""
        player = request.user
        r.lpush('matchmaking_queue', player.id)
        return Response({"message": "You are in the queue."}, status=status.HTTP_200_OK)

    def create_room(self):
        """Créer une room si deux joueurs sont en attente"""
        if r.llen('matchmaking_queue') >= 2:
            player1_id = r.rpop('matchmaking_queue')
            player2_id = r.rpop('matchmaking_queue')
            player1 = User.objects.get(id=player1_id)
            player2 = User.objects.get(id=player2_id)
            
            match = Match.objects.create(player1=player1, player2=player2, start_time=timezone.now())
            room = Room.objects.create(player1=player1, player2=player2, match=match)

            return room
        return None

    def get_active_room(self, request):
        """Récupérer la room active pour un joueur"""
        player = request.user
        room = Room.objects.filter(is_active=True).filter(player1=player).first() or \
               Room.objects.filter(is_active=True).filter(player2=player).first()
        
        if room:
            serializer = RoomSerializer(room)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "No active room found"}, status=status.HTTP_404_NOT_FOUND)