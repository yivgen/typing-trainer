import json
import random
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_random_quote(request):
    with open('./trainer/quotes.json') as infile:
        quotes = json.load(infile)
        return Response(random.choice(quotes))