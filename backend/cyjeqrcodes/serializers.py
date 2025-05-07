from rest_framework import serializers
from .models import QRCode, QRCodeVisit
from django.contrib.auth.models import User

class QRCodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = QRCode
        fields = ('id', 'nom', 'lien', 'sharelink', 'dateCreation', 'user')
        read_only_fields = ('user', 'sharelink', 'dateCreation')

class QRCodeVisitSerializer(serializers.ModelSerializer):
    class Meta:
        model = QRCodeVisit
        fields = ('id', 'qrcode', 'dateVisite')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email')