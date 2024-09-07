from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import MatchmakingViewSet

router = DefaultRouter()
router.register(r'matchmaking', MatchmakingViewSet, basename='matchmaking')

urlpatterns = router.urls

# OU

# from django.urls import path
# from .views import MatchmakingViewSet

# urlpatterns = [
#     path('matchmaking/join_queue/', MatchmakingViewSet.as_view({'post': 'join_queue'}), name='join_queue'),
#     path('matchmaking/get_active_room/', MatchmakingViewSet.as_view({'get': 'get_active_room'}), name='get_active_room'),
# ]
