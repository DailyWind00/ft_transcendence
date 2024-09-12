from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import PlayerQueue, Match
from .serializers import MatchSerializer
from django.db import IntegrityError

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def join_matchmaking(request):
    player_id = request.data.get('player')
    token = request.data.get('token')


    if not player_id or not token:
        return Response({'error': 'Missing player or token', 'player_id': player_id, 'token': token}, status=400)

    try:
        player = User.objects.get(id=player_id)
    except User.DoesNotExist:
        return Response({'error': 'Invalid player ID'}, status=400)

    
    if PlayerQueue.objects.filter(player=player).exists():
        return Response({'status': 'already_in_queue'}, status=200)

    try:
        PlayerQueue.objects.create(player=player)
    except IntegrityError:
        return Response({'error': 'Failed to add player to queue'}, status=500)

    queue = PlayerQueue.objects.order_by('joined_at')

    if queue.count() >= 2:
        player1 = queue[0].player
        player2 = queue[1].player

        if ()
        try:
            match = Match.objects.create(player1=player1, player2=player2, status='in_progress')
        except IntegrityError:
            return Response({'error': 'Failed to create match'}, status=500)

        PlayerQueue.objects.filter(player=player1).delete()
        PlayerQueue.objects.filter(player=player2).delete()

        match_serializer = MatchSerializer(match)
        return Response(match_serializer.data)

    return Response({'status': 'waiting'})
