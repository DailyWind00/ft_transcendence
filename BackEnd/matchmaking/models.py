from django.db import models
from django.contrib.auth.models import User

class Match(models.Model):
    player1 = models.ForeignKey(User, related_name='matches_as_player1', on_delete=models.CASCADE)
    player2 = models.ForeignKey(User, related_name='matches_as_player2', on_delete=models.CASCADE)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Match between {self.player1.username} and {self.player2.username}"

    def is_match_ongoing(self):
        """Retourne True si le match est en cours, sinon False."""
        return self.end_time is None or self.end_time > timezone.now()
