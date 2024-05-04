from django.urls import path
from fortune.views import home, spin

urlpatterns = [
    path('', home),
    path('spin/', spin),
]
