from django.urls import path
from .views import MatchmakingViewSet, MatchCreateView

urlpatterns = [
    path('join_queue/', MatchmakingViewSet.as_view({'post': 'join_queue'}), name='join_queue'),
    path('active_room/', MatchmakingViewSet.as_view({'get': 'get_active_room'}), name='active_room'),
    path('match/', MatchCreateView.as_view(), name='match-create'),
]
