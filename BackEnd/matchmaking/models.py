from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Match(models.Model):
    player1 = models.ForeignKey(User, related_name='matches_as_player1', on_delete=models.CASCADE)
    player2 = models.ForeignKey(User, related_name='matches_as_player2', on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(null=True, blank=True)
    player1_score = models.IntegerField(default=0)
    player2_score = models.IntegerField(default=0)
    winner = models.ForeignKey(User, related_name='matches_won', null=True, blank=True, on_delete=models.SET_NULL)

    def set_winner(self):
        if self.player1_score > self.player2_score:
            self.winner = self.player1
        elif self.player2_score > self.player1_score:
            self.winner = self.player2

    def __str__(self):
        return f"Match between {self.player1.username} and {self.player2.username}"

class Room(models.Model):
    player1 = models.ForeignKey(User, related_name='rooms_as_player1', on_delete=models.CASCADE)
    player2 = models.ForeignKey(User, related_name='rooms_as_player2', on_delete=models.CASCADE)
    match = models.OneToOneField(Match, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"Room between {self.player1.username} and {self.player2.username}"

