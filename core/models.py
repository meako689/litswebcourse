from django.db import models
import datetime

# Create your models here.

class NewsItem(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField(blank=True, null=True)
    date = models.DateField(default= datetime.date.today)
    link = models.URLField(max_length=450, blank=True, null=True)
    picture = models.URLField(max_length=450, blank=True, null=True)

    def __str__(self):
        return self.title