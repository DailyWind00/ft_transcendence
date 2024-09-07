from django.urls import path
from .views import RegisterView, LoginView, DeleteAccountView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('delete-account/', DeleteAccountView.as_view(), name='delete-account'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
]
