from django.db import models
from django.contrib.auth.models import User

class TypingLesson(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    duration = models.IntegerField(null=False, blank=False)
    length = models.IntegerField(null=False, blank=False)
    typos = models.IntegerField(null=False, blank=False)