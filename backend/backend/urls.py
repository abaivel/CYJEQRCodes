"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework import routers
from cyjeqrcodes import views
#from views import get_csrf, login_view, logout_view, protected_data

router = routers.DefaultRouter()
router.register(r'qrcodes', views.QRCodeView, 'qrcodes')
router.register(r'qrcodevisits', views.QRCodeVisitView, 'qrcodevisits')
router.register(r'users', views.UserView, 'users')
router.register(r'lieuqrcode', views.LieuQRCodeView, 'lieuqrcode')
router.register(r'designqrcode', views.DesignQRCodeView, 'designqrcode')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path("api/csrf/", views.get_csrf),
    path("api/login/", views.login_view),
    path("api/logout/", views.logout_view),
    path("api/check-auth/", views.check_auth),
    path('api/authorized/', views.AuthorizedView.as_view()),
    path('api/profile/', views.CurrentUserView.as_view()),
    path("api/change-password/", views.change_password),
    re_path(r'^.*$', views.FrontendAppView.as_view()),
]
