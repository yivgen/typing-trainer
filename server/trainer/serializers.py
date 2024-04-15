from rest_framework import serializers
from trainer.models import TypingLesson

class TypingLessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypingLesson
        fields = '__all__'