from django.shortcuts import render
from rest_framework import viewsets
from .serializers import QRCodeSerializer, QRCodeVisitSerializer, UserSerializer
from .models import QRCode, QRCodeVisit
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie

@ensure_csrf_cookie
@api_view(['GET'])
@permission_classes([AllowAny])
def get_csrf(request):
    return Response({'detail': 'CSRF cookie set'})

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    email = request.data.get("email")
    password = request.data.get("password")
    user = authenticate(request, username=email, password=password)
    if user is not None:
        login(request, user)
        return Response({'detail': 'Login successful'})
    return Response({'detail': 'Invalid credentials'}, status=401)

@api_view(['POST'])
def logout_view(request):
    logout(request)
    return Response({'detail': 'Logged out'})

@api_view(["GET"])
def check_auth(request):
    if request.user.is_authenticated:
        return Response({
            "isAuthenticated": True,
            "username": request.user.username,
            "email": request.user.email,
        })
    else:
        return Response({"isAuthenticated": False})

class QRCodeView(viewsets.ModelViewSet):
   serializer_class = QRCodeSerializer
   #queryset = QRCode.objects.all()
   def get_queryset(self):
      if (self.request.user.is_authenticated):
         queryset = QRCode.objects.filter(user_id = self.request.user.id)
      else:
         queryset = QRCode.objects.none()
      return queryset

class QRCodeVisitView(viewsets.ModelViewSet):
   serializer_class = QRCodeVisitSerializer
   #queryset = QRCodeVisit.objects.all()
   def get_queryset(self):
      qrcode_id = self.request.GET.get('qrcode_id')
      if (qrcode_id is not None):
         queryset = QRCodeVisit.objects.filter(qrcode_id = qrcode_id)
      else :
         user_id = self.request.GET.get('user_id')
         if (user_id is not None):
            queryset = QRCodeVisit.objects.filter(qrcode__user__id = user_id)
         else:
            queryset = QRCodeVisit.objects.none()
      return queryset

class UserView(viewsets.ModelViewSet):
   serializer_class = UserSerializer
   #queryset = QRCode.objects.all()
   def get_queryset(self):
      queryset = User.objects.all()
      return queryset