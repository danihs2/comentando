from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Pelicula(models.Model):
    tmdb_id = models.IntegerField(unique=True)
    score = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)

class Comentario(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    pelicula = models.ForeignKey(Pelicula, on_delete=models.CASCADE)
    contenido = models.TextField()
    score = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)

class Replie(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    comentario = models.ForeignKey(Comentario, on_delete=models.CASCADE)
    contenido = models.TextField()