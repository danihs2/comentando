from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from .models import Pelicula, Comentario, Replie
from .serializers import PeliculaSerializer, ComentarioSerializer, ReplieSerializer, UserSerializer
from django.contrib.auth.models import User
from django.db.models import Avg
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password


@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            return JsonResponse({'id': user.id})
        else:
            return JsonResponse({'error': 'Credenciales inválidas'}, status=400)
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=405)


class PeliculaViewSet(viewsets.ModelViewSet):
    queryset = Pelicula.objects.all()
    serializer_class = PeliculaSerializer

class ComentarioViewSet(viewsets.ModelViewSet):
    queryset = Comentario.objects.all()
    serializer_class = ComentarioSerializer

    def perform_create(self, serializer):
        # Verificar si la película ya existe en la base de datos
        pelicula_id = self.request.data.get('tmdb_id')
        pelicula = get_object_or_404(Pelicula, tmdb_id=pelicula_id)

        # Actualizar o crear la película
        if pelicula:
            pelicula.score = (pelicula.score + serializer.validated_data['score']) / 2
            pelicula.save()
        else:
            pelicula = Pelicula.objects.create(
                tmdb_id=pelicula_id,
                score=serializer.validated_data['score']
            )

        # Guardar el comentario asociado a la película
        serializer.save(usuario=self.request.user, pelicula=pelicula)

class ReplieViewSet(viewsets.ModelViewSet):
    queryset = Replie.objects.all()
    serializer_class = ReplieSerializer

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # Hasheamos la contraseña antes de guardar el usuario
            password = serializer.validated_data.pop('password')  # Extraer la contraseña
            hashed_password = make_password(password)  # Hashear la contraseña
            serializer.validated_data['password'] = hashed_password  # Asignar la contraseña hasheada
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        try:
            user = self.get_queryset().get(pk=pk)
            user.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response({'error': 'Usuario no encontrado'}, status=status.HTTP_404_NOT_FOUND)
