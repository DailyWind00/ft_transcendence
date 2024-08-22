from django.db import models

class User(models.Model):
    login = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)
    nickname = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)

    def str(self):
        return self.nickname