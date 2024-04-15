import json
import random
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from trainer.models import TypingLesson
from trainer.serializers import TypingLessonSerializer
from rest_framework import generics


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_random_quote(request):
    with open('./trainer/quotes.json') as infile:
        quotes = json.load(infile)
        return Response(random.choice(quotes))

class TypingLessonList(generics.ListCreateAPIView):
    queryset = TypingLesson.objects.all()
    serializer_class = TypingLessonSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        request.data['user'] = request.user.pk
        return super().post(request, *args, **kwargs)