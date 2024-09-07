from django.contrib import admin
from .models import Match, Room

@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = ('player1', 'player2', 'start_time', 'end_time', 'player1_score', 'player2_score', 'winner')
    list_filter = ('start_time', 'end_time', 'winner')
    search_fields = ('player1__username', 'player2__username')
    readonly_fields = ('winner',)

@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ('player1', 'player2', 'match', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('player1__username', 'player2__username', 'match__player1__username', 'match__player2__username')
    readonly_fields = ('match',)
