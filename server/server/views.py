import json
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenObtainPairView
)


class MyTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        print(response.data)
        token = response.data.pop("refresh")
        response.set_cookie("refresh_token", token, httponly=True)
        return response

class MyTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        print(request.body)
        request.body = json.dumps({
            "refresh": request.COOKIES.get('refresh_token')
        }).encode()
        print(request.body)
        response = super().post(request, *args, **kwargs)
        return response

