from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Match
import redis

redis_instance = redis.StrictRedis(host='localhost', port=6379, db=0)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def join_matchmaking(request):
    player = request.user

    redis_instance.rpush('matchmaking_queue', player.id)

    if redis_instance.llen('matchmaking_queue') >= 2:
        player1_id = redis_instance.lpop('matchmaking_queue').decode('utf-8')
        player2_id = redis_instance.lpop('matchmaking_queue').decode('utf-8')

        player1 = User.objects.get(id=player1_id)
        player2 = User.objects.get(id=player2_id)

        match = Match.objects.create(player1=player1, player2=player2, status='in_progress')

        return Response({
            'match_id': match.id,
            'player1': player1.username,
            'player2': player2.username,
            'status': match.status
        })

    return Response({'status': 'waiting'})
