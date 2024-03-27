from django.urls import path
from trainer import views

urlpatterns = [
    path('get-quote/', views.get_quote),
]