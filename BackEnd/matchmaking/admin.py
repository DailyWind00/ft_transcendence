from django.contrib import admin
from .models import Match

@admin.register(Match)
class MatchAdmin(admin.ModelAdmin):
    list_display = ('id', 'player1', 'player2', 'status', 'created_at')
    list_filter = ('status',)
    search_fields = ('player1__username', 'player2__username')
