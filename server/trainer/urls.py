from django.urls import path
from trainer import views

urlpatterns = [
    path('get-random-quote/', views.get_random_quote),
    path('typing-lessons/', views.TypingLessonList.as_view())
]