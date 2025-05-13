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
        read_only_fields = ('qrcode', 'dateVisite')

class UserSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()
    is_connected = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'role', 'is_staff', 'is_superuser', 'is_connected')

    def get_role(self, obj):
        if obj.is_superuser:
            return "SuperAdministrateur"
        elif obj.is_staff:
            return "Administrateur"
        return "Utilisateur"
    
    def get_is_connected(self, obj):
        request = self.context.get('request', None)
        if request and request.user.is_authenticated:
            return obj == request.user
        return False