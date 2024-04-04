from django.contrib import admin
from django.urls import path, include
from server.views import *


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('trainer.urls')),
    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', MyTokenRefreshView.as_view(), name='token_refresh'),
    path('api/logout/', LogoutView.as_view(), name='logout')
]
