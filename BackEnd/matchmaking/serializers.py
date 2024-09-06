from rest_framework import serializers
from .models import Match, Room

class MatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Match
        fields = ['player1', 'player2', 'player1_score', 'player2_score', 'start_time', 'end_time', 'winner']

class RoomSerializer(serializers.ModelSerializer):
    match = MatchSerializer()

    class Meta:
        model = Room
        fields = ['player1', 'player2', 'match', 'is_active']
