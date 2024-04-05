from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import PeliculaViewSet, ComentarioViewSet, ReplieViewSet, UserViewSet

router = DefaultRouter()
router.register(r'peliculas', PeliculaViewSet)
router.register(r'comentarios', ComentarioViewSet)
router.register(r'replies', ReplieViewSet)
router.register(r'users', UserViewSet)

urlpatterns = router.urls