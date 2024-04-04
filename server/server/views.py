import json
from rest_framework_simplejwt.views import (
    TokenRefreshView,
    TokenObtainPairView
)
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken


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

class LogoutView(APIView):
    def post(self, request):
        token = RefreshToken(request.COOKIES.get('refresh_token'))
        token.blacklist()

        res = Response(status=status.HTTP_205_RESET_CONTENT)
        res.set_cookie('refresh_token', None)
        return res