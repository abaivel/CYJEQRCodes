from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class QRCode(models.Model):
   nom = models.CharField(max_length=50)
   lien = models.CharField(max_length=150)
   sharelink = models.CharField(max_length=150)
   dateCreation = models.DateTimeField()
   user = models.ForeignKey(User, on_delete=models.CASCADE )

   def __str__(self):
    return f'{self.nom}'

class QRCodeVisit(models.Model):
   dateVisite = models.DateTimeField()
   qrcode = models.ForeignKey(QRCode, on_delete=models.CASCADE)
