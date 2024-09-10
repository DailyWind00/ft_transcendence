from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import PlayerQueue, Match
from .serializers import MatchSerializer

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def join_matchmaking(request):
    player = request.data.get('player')
    token = request.data.get('token')

    if PlayerQueue.objects.filter(player=player).exists():
        return Response({'status': 'already_in_queue'}, status=400)

    PlayerQueue.objects.create(player=player)

    queue = PlayerQueue.objects.order_by('joined_at')

    if queue.count() >= 2:
        player1 = queue[0].player
        player2 = queue[1].player

        match = Match.objects.create(player1=player1, player2=player2, status='in_progress')

        PlayerQueue.objects.filter(player=player1).delete()
        PlayerQueue.objects.filter(player=player2).delete()

        match_serializer = MatchSerializer(match)
        return Response(match_serializer.data)

    return Response({'status': 'waiting'})
