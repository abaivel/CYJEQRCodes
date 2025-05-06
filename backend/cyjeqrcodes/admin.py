from django.contrib import admin
from .models import QRCode, QRCodeVisit

class QRCodeAdmin(admin.ModelAdmin):
   list_display = ('nom', 'lien', 'dateCreation')

class QRCodeVisitAdmin(admin.ModelAdmin):
   list_display = ('qrcode', 'dateVisite')

# Register your models here.

admin.site.register(QRCode, QRCodeAdmin)
admin.site.register(QRCodeVisit, QRCodeVisitAdmin)