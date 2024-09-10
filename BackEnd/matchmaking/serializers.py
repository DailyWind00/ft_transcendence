from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Match

class MatchSerializer(serializers.ModelSerializer):
    player1 = serializers.CharField(source='player1.username')
    player2 = serializers.CharField(source='player2.username')

    class Meta:
        model = Match
        fields = ['id', 'player1', 'player2', 'status', 'started_at']
