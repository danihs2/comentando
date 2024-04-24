# Generated by Django 5.0.4 on 2024-04-24 08:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movies', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='pelicula',
            name='num_calificaciones',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='pelicula',
            name='score',
            field=models.DecimalField(decimal_places=1, default=0.0, max_digits=2),
        ),
    ]
