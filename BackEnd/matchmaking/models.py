from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class PlayerQueue(models.Model):
    player = models.ForeignKey(User, on_delete=models.CASCADE)
    joined_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.player.username

class Match(models.Model):
    player1 = models.ForeignKey(User, related_name='player1', on_delete=models.CASCADE)
    player2 = models.ForeignKey(User, related_name='player2', on_delete=models.CASCADE)
    status = models.CharField(max_length=20, default='waiting')
    started_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.player1} vs {self.player2}"
