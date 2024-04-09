from django.urls import path, include
from rest_framework import routers
from .views import PeliculaViewSet, ComentarioViewSet, ReplieViewSet, UserViewSet, login_view

router = routers.DefaultRouter()
router.register(r'peliculas', PeliculaViewSet)
router.register(r'comentarios', ComentarioViewSet)
router.register(r'replies', ReplieViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', login_view, name='login'),
]

