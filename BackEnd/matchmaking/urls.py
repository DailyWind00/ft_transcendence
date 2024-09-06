from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import MatchmakingViewSet

router = DefaultRouter()
router.register(r'matchmaking', MatchmakingViewSet, basename='matchmaking')

urlpatterns = router.urls
