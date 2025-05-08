from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.

class QRCode(models.Model):
   nom = models.CharField(max_length=50)
   lien = models.CharField(max_length=1000)
   sharelink = models.CharField(max_length=150)
   dateCreation = models.DateTimeField(default=timezone.now)
   user = models.ForeignKey(User, on_delete=models.CASCADE )

   def __str__(self):
    return f'{self.nom}'

class QRCodeVisit(models.Model):
   dateVisite = models.DateTimeField(default=timezone.now)
   qrcode = models.ForeignKey(QRCode, on_delete=models.CASCADE)
