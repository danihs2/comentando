from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Pelicula, Comentario, Replie

class PeliculaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pelicula
        fields = '__all__'

class ComentarioSerializer(serializers.ModelSerializer):
    nombre_usuario = serializers.CharField(read_only=True)

    class Meta:
        model = Comentario
        fields = ['id', 'contenido', 'score', 'nombre_usuario']

class ReplieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Replie
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']