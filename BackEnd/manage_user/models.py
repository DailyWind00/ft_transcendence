from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class ManageUser(models.Model):
	account = models.OneToOneField(User, on_delete=models.CASCADE)
	nickname = models.CharField(max_length=50)
	is_anonymous = models.BooleanField(default=False)