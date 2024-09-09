from rest_framework import serializers
from .models import Match

class MatchSerializer(serializers.ModelSerializer):
    player1 = serializers.StringRelatedField()
    player2 = serializers.StringRelatedField()

    class Meta:
        model = Match
        fields = ['id', 'player1', 'player2', 'status', 'created_at']

    def create(self, validated_data):
        player1_data = validated_data.pop('player1')
        player2_data = validated_data.pop('player2')
        
        player1 = User.objects.get(id=player1_data['id'])
        player2 = User.objects.get(id=player2_data['id'])
        
        match = Match.objects.create(player1=player1, player2=player2, **validated_data)
        return match
