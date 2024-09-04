from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("This username is already taken.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user

    #api login ???
    def to_representation(self, instance):
        # Si l'utilisateur est anonymisé, ajustez la réponse
        ret = super().to_representation(instance)
        if instance.is_anonymous:
            ret['username'] = "anonymous"
        return ret
