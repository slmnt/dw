from rest_framework import viewsets
from api import models as m
from api import serializers as s

class StuffViewSet(viewsets.ModelViewSet):
    queryset = m.Stuff.objects.all()
    serializer_class = s.StuffSerializer
