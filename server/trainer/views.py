import json
import random
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['GET'])
def get_quote(request):
    with open('./trainer/quotes.json') as infile:
        quotes = json.load(infile)
        return Response(random.choice(quotes))