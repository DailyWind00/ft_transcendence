from rest_framework import generics, status
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.generics import ListCreateAPIView
from .serializers import UserSerializer
from django.contrib.auth import get_user_model
from .serializers import UserProfileSerializer, MatchSerializer
from .models import Match
import uuid
from rest_framework.authentication import TokenAuthentication

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key})
        else:
            return Response({"error": "Invalid Credentials"}, status=400)

class DeleteAccountView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, *args, **kwargs):
        user = request.user
        user.delete()
        return Response({"message": "Your account has been deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

class UserProfileView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get_object(self):
        return self.request.user


class AnonymizeAccountView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user

        if user.username.startswith('anonymous_'):
            return Response({'message': 'Le compte est déjà anonymisé'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            anonymized_username = f"anonymous_{uuid.uuid4()}"
            user.username = anonymized_username
            user.email = f"anonyme{uuid.uuid4()}@exemple.com"
            user.first_name = 'Anonyme'
            user.last_name = ''
            user.save()

            return Response({'message': 'Compte anonymisé avec succès'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': 'Erreur lors de l\'anonymisation du compte'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class MatchListCreateView(ListCreateAPIView):
    serializer_class = MatchSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Match.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)