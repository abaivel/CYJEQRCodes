from django.shortcuts import render
from rest_framework import viewsets
from .serializers import QRCodeSerializer, QRCodeVisitSerializer, UserSerializer
from .models import QRCode, QRCodeVisit
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie
from .permissions import IsAdminOrSuperAdmin
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import update_session_auth_hash
from rest_framework.views import APIView
from rest_framework import status
from random import sample

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
         queryset = QRCode.objects.filter(user_id = self.request.user.id).order_by('-dateCreation')
      else:
         queryset = QRCode.objects.none()
      return queryset
   def perform_create(self, serializer):
    alphabet = "abcdefghijklmnopqrstuvwxyz"
    sharelink = ''.join(sample(alphabet, 8))
    qrcode_existant = QRCode.objects.filter(sharelink=sharelink)
    while (len(qrcode_existant)>0):
      sharelink = ''.join(sample(alphabet, 8))
      qrcode_existant = QRCode.objects.filter(sharelink=sharelink)
    serializer.save(user=self.request.user, sharelink=sharelink)

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
   def create(self, request, *args, **kwargs):
      sharelink = request.data.get('sharelink')
      qrcode = QRCode.objects.get(sharelink = sharelink)
      serializer = self.get_serializer(data=request.data)
      serializer.is_valid(raise_exception=True)
      serializer.save(qrcode=qrcode)
      qrcode_serializer = QRCodeSerializer(qrcode)
      return Response(qrcode_serializer.data, status=status.HTTP_201_CREATED)

class UserView(viewsets.ModelViewSet):
   serializer_class = UserSerializer
   permission_classes = [IsAdminOrSuperAdmin]
   #queryset = QRCode.objects.all()
   def get_queryset(self):
      queryset = User.objects.all()
      return queryset
   def perform_create(self, serializer):
    alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    password = ''.join(sample(alphabet, 10))
    print(password)
    serializer.save( password=password)
   
class AuthorizedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "is_staff": user.is_staff or user.is_superuser, 
        })
    
class CurrentUserView(APIView):
   permission_classes = [IsAuthenticated]

   def get(self, request):
      user = request.user
      serializer = UserSerializer(user)
      return Response(serializer.data)
    
   def patch(self, request):
      serializer = UserSerializer(request.user, data=request.data, partial=True)
      if serializer.is_valid():
         serializer.save()
      return Response()
   
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
   user = request.user
   old_password = request.data.get("old_password")
   new_password = request.data.get("new_password")

   if not user.check_password(old_password):
      return Response({"detail": "Mot de passe actuel incorrect"}, status=400)

   user.set_password(new_password)
   user.save()
   update_session_auth_hash(request, user)  # garde l'utilisateur connecté
   return Response({"detail": "Mot de passe changé avec succès"})