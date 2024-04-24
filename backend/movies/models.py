from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Pelicula(models.Model):
    tmdb_id = models.IntegerField(unique=True)
    num_calificaciones = models.IntegerField(default=0)  # Control de cuantas calificaciones tiene la pelicula
    score = models.DecimalField(max_digits=2, decimal_places=1, default=0.0)  # Modificamos para que sea de 0 a 5

    def __str__(self):
        return str(self.tmdb_id)

class Comentario(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    pelicula = models.ForeignKey(Pelicula, on_delete=models.CASCADE)
    contenido = models.TextField()
    score = models.DecimalField(max_digits=3, decimal_places=2, null=True, blank=True)

class Replie(models.Model):
    usuario = models.ForeignKey(User, on_delete=models.CASCADE)
    comentario = models.ForeignKey(Comentario, on_delete=models.CASCADE)
    contenido = models.TextField()