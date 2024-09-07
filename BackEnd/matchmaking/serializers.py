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

    def create(self, validated_data):
        player1_data = validated_data.pop('player1')
        player2_data = validated_data.pop('player2')
        
        player1 = User.objects.get(id=player1_data['id'])
        player2 = User.objects.get(id=player2_data['id'])
        
        match = Match.objects.create(player1=player1, player2=player2, **validated_data)
        return match