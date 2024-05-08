from django.urls import path, include, re_path
from . import views
from rest_framework import routers

router = routers.DefaultRouter()

urlpatterns = [
    path('', include(router.urls)),
    re_path(r'comentario/(?P<comentario_id>\d+)/eliminar/', views.eliminar_comentario, name='eliminar_comentario'),
    re_path(r'comentario/(?P<comentario_id>\d+)/editar/', views.editar_comentario, name='editar_comentario'),
    re_path('login', views.login),
    re_path('register', views.register),
    re_path('profile', views.profile),
    re_path('comentariosByUsuario', views.comentariosByUser),
    re_path('comentario', views.comentario),
    re_path(r'pelicula/(?P<tmdb_id>\d+)/', views.detalles_pelicula),
]

