from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from server.views import MyTokenObtainPairView, MyTokenRefreshView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('trainer.urls')),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', MyTokenRefreshView.as_view(), name='token_refresh'),
]
