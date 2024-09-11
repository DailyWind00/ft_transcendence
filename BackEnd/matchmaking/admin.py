from django.contrib import admin
from .models import PlayerQueue, Match

@admin.register(PlayerQueue)
class PlayerQueueAdmin(admin.ModelAdmin):
    list_display = ('player', 'joined_at')

@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = ('player1', 'player2', 'status', 'started_at')
