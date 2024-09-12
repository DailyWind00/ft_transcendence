from django.urls import path
from .views import join_matchmaking

urlpatterns = [
    path('join_matchmaking/', join_matchmaking, name='join_matchmaking'),
]
