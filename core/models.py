from django.db import models
import datetime

from django.contrib.auth.models import User

# Create your models here.

class NewsItem(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField(blank=True, null=True)
    date = models.DateField(default= datetime.date.today)
    link = models.URLField(max_length=450, blank=True, null=True)
    picture = models.URLField(max_length=450, blank=True, null=True)

    def __str__(self):
        return self.title


class ChatRoom(models.Model):
    news_item = models.ForeignKey(NewsItem,
            blank=True, null=True, on_delete=models.CASCADE)
    group_name = models.CharField(max_length=256)


class ChatMessage(models.Model):
    room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, blank=True, null=True,
            on_delete=models.CASCADE)
    username = models.CharField(max_length=140)
    


