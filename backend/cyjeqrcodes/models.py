from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.

class QRCode(models.Model):
   
  class TypeQRCode(models.TextChoices):
    AFFICHE = 'Affiche'
    AUTRE = 'Autre'

  nom = models.CharField(max_length=50)
  lien = models.CharField(max_length=1000)
  sharelink = models.CharField(max_length=150)
  dateCreation = models.DateTimeField(default=timezone.now)
  user = models.ForeignKey(User, on_delete=models.CASCADE )
  type = models.fields.CharField(choices=TypeQRCode.choices, max_length=20, default="Autre")

  def __str__(self):
    return f'{self.nom}'
   
class LieuQRCode(models.Model):
  nom = models.CharField(max_length=1000)
  qrcode = models.ForeignKey(QRCode, on_delete=models.CASCADE)

class DesignQRCode(models.Model):
  nom = models.CharField(max_length=1000)
  qrcode = models.ForeignKey(QRCode, on_delete=models.CASCADE)

class QRCodeVisit(models.Model):
   dateVisite = models.DateTimeField(default=timezone.now)
   qrcode = models.ForeignKey(QRCode, on_delete=models.CASCADE)
   lieu = models.ForeignKey(LieuQRCode, on_delete=models.SET_NULL, null=True)
   design = models.ForeignKey(DesignQRCode, on_delete=models.SET_NULL, null=True)