from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class ManageUser(models.Model):
	account = models.OneToOneField(User, on_delete=models.CASCADE)
	nickname = models.CharField(max_length=50)
	is_anonymous = models.BooleanField(default=False)
	games_played = models.IntegerField(default=0)
	games_won = models.IntegerField(default=0)
	win_rate = models.FloatField(default=0.0)