from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import UserSerializer, ComentarioSerializer, PeliculaSerializer, ReplieSerializer
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.http import Http404

from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication

from .models import Comentario, Pelicula, Replie

from django.contrib.auth.models import User

from decimal import Decimal

from django.http import HttpResponse

from django.http import JsonResponse

from rest_framework.views import APIView

@api_view(['POST'])
def login(request):
    print(request.data)
    user = get_object_or_404(User, username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)
    username = serializer.data['username']
    user_id = serializer.data['id']

    # Crear la respuesta con la cookie
    response = Response({'token': token.key, 'user': serializer.data, 'username': username, 'user_id': user_id}, status=status.HTTP_200_OK)
    response.set_cookie('token', token.key, max_age=3600, path='/')  # Establecer la cookie
    response.set_cookie('username', username, max_age=3600, path='/')  # Establecer la cookie
    response.set_cookie('user_id', user_id, max_age=3600, path='/')  # Establecer la cookie
    return response

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

        user = User.objects.get(username=serializer.data['username'])
        user.set_password(serializer.data['password'])
        user.save()

        token = Token.objects.create(user=user)
        username = serializer.data['username']

        return Response({'token': token.key, "username" : username}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@authentication_classes([TokenAuthentication]) # Es para que el usuario este autenticado
@permission_classes([IsAuthenticated])          # Esta vista solo puede ser accedida por usuarios autenticados
def profile(request):
    print(request.user)
    return Response("Estas logeado con {}".format(request.user.username), status=status.HTTP_200_OK)
    
@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])  # Requiere autenticación mediante token
@permission_classes([IsAuthenticated])          # Solo usuarios autenticados pueden acceder a esta vista
def eliminar_comentario(request, comentario_id):
    try:
        # Intenta obtener el comentario por su ID
        comentario = get_object_or_404(Comentario, pk=comentario_id)
        # Comprobar si el usuario autenticado es el autor del comentario
        if request.user != comentario.usuario:
            return Response({'detalle': 'No tienes permiso para eliminar este comentario'}, status=status.HTTP_403_FORBIDDEN)
        score = comentario.score
        comentario.delete()
        # Tambien actualizamos el score de la pelicula
        pelicula = comentario.pelicula
        calificaciones = Comentario.objects.filter(pelicula=pelicula)
        pelicula.score = 0
        for calificacion in calificaciones:
            pelicula.score += calificacion.score
        pelicula.num_calificaciones -= 1
        if pelicula.num_calificaciones > 0:
            pelicula.score = pelicula.score / pelicula.num_calificaciones
        pelicula.save()
        return Response({'mensaje': 'Comentario eliminado exitosamente'}, status=status.HTTP_200_OK)
    except Comentario.DoesNotExist:
        # Si el comentario no existe, devuelve un mensaje de error
        return Response({'detalle': 'El comentario no existe'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
@authentication_classes([TokenAuthentication])  # Requiere autenticación mediante token
@permission_classes([IsAuthenticated])          # Solo usuarios autenticados pueden acceder a esta vista
def editar_comentario(request, comentario_id):
    try:
        # Intenta obtener el comentario por su ID
        comentario = get_object_or_404(Comentario, pk=comentario_id)
        # Comprobar si el usuario autenticado es el autor del comentario
        if request.user != comentario.usuario:
            return Response({'detalle': 'No tienes permiso para editar este comentario'}, status=status.HTTP_403_FORBIDDEN)
        # Actualizar el contenido del comentario
        comentario.contenido = request.data.get('contenido')
        comentario.score = request.data.get('score')
        comentario.save()
        # Tambien actualizamos el score de la pelicula
        pelicula = comentario.pelicula
        calificaciones = Comentario.objects.filter(pelicula=pelicula)
        pelicula.score = 0
        for calificacion in calificaciones:
            pelicula.score += calificacion.score
        pelicula.score = pelicula.score / pelicula.num_calificaciones
        pelicula.save()
        return Response({'mensaje': 'Comentario editado exitosamente'}, status=status.HTTP_200_OK)
    except Comentario.DoesNotExist:
        # Si el comentario no existe, devuelve un mensaje de error
        return Response({'detalle': 'El comentario no existe'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])  # Requiere autenticación mediante token
@permission_classes([IsAuthenticated])          # Solo usuarios autenticados pueden acceder a esta vista
def comentario(request):
    # Obtener el usuario autenticado
    usuario = request.user
    
    # Obtener los datos de la solicitud
    pelicula_tmdb_id = request.data.get('pelicula_tmdb_id')
    contenido = request.data.get('contenido')
    score = request.data.get('score')

    # Buscar la película en la base de datos
    pelicula, creada = Pelicula.objects.get_or_create(tmdb_id=pelicula_tmdb_id)

    # Verificar si el usuario ya ha comentado sobre la película
    if Comentario.objects.filter(usuario=usuario, pelicula=pelicula).exists():
        return JsonResponse({'mensaje': 'Ya has comentado anteriormente'}, status=status.HTTP_400_BAD_REQUEST)

    # Actualizar la puntuación y el número de calificaciones de la película
    if not creada:
        pelicula.num_calificaciones += 1
        score_float = Decimal(score)
        # recuperar todas las scores anterior y sumarlas y promediarlas
        comentarios = Comentario.objects.filter(pelicula=pelicula)
        pelicula.score = 0
        for comentario in comentarios:
            pelicula.score += comentario.score
        pelicula.score /= pelicula.num_calificaciones
        pelicula.save()
    else:
        # Si la película es nueva, el puntaje será el puntaje enviado en la solicitud
        pelicula.score = Decimal(score)
        pelicula.save()

    # Crear el comentario
    comentario = Comentario.objects.create(usuario=usuario, pelicula=pelicula, contenido=contenido, score=score)

    return Response({'mensaje': 'Comentario creado exitosamente'}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])  # Requiere autenticación mediante token
@permission_classes([IsAuthenticated])          # Solo usuarios autenticados pueden acceder a esta vista
def comentariosByUser(request):
    usuario = request.user
    comentarios = Comentario.objects.filter(usuario=usuario)
    # En cada comentario tambien ponerle el imdb_id de la pelicula, relacion de comentario[index].pelicula_id -> pelicula.id
    # para que el front pueda hacer la peticion de la pelicula
    # y tambien ponerle el titulo de la pelicula
    comentarios_serializer = ComentarioSerializer(comentarios, many=True)
    for index, comentario in enumerate(comentarios):
        comentarios_serializer.data[index]['tmdb_id'] = comentario.pelicula.tmdb_id
    return Response(comentarios_serializer.data) 

@api_view(['GET'])
def detalles_pelicula(request, tmdb_id):
    try:
        # Buscar la película por su tmdb_id
        pelicula = Pelicula.objects.get(tmdb_id=tmdb_id)
        
        # Serializar los datos de la película
        pelicula_serializer = PeliculaSerializer(pelicula)

        # Obtener todos los comentarios asociados a la película
        comentarios = Comentario.objects.filter(pelicula=pelicula)
        
        # Serializar los comentarios
        comentarios_serializer = ComentarioSerializer(comentarios, many=True)
        
        # Crear un diccionario con los datos de la película y los comentarios
        datos = {
            'pelicula': pelicula_serializer.data,
            'comentarios': comentarios_serializer.data
        }
        
        # Devolver la respuesta en formato JSON
        return Response(datos)
    except Pelicula.DoesNotExist:
        # Si no se encuentra la película, devolver un mensaje personalizado
        return Response({'detail': 'No Peli Data :('}, status=status.HTTP_404_NOT_FOUND)

