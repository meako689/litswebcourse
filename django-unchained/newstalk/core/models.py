from django.db import models

# Create your models here.

class NewsItem(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()
    date = models.DateField(auto_now_add=True)
    link = models.URLField(max_length=450)
    picture = models.URLField(max_length=450)
