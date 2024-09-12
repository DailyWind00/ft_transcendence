from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class ManageUser(models.Model):
	account = models.OneToOneField(User, on_delete=models.CASCADE)
	nickname = models.CharField(max_length=50)
	is_anonymous = models.BooleanField(default=False)



class Match(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='matches')
    score = models.CharField(max_length=50)
    is_user_winner = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username} - {self.date_played} - Score: {self.score} - User won: {self.is_user_winner}"
