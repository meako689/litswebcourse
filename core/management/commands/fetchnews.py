from datetime import datetime

import requests
from bs4 import BeautifulSoup
from django.core.management.base import BaseCommand, CommandError

from core.models import NewsItem

URL = 'https://nachasi.com/top'

class Command(BaseCommand):
    def handle(self, *args, **options):
        response = requests.get(URL)
        soup = BeautifulSoup(response.content, 'html.parser')
        elements = soup.find_all('div', 'img-block')

        for element in elements:
            link = element.find('a').attrs['href']
            image = element.find('img').attrs['src']
            title = element.find('h4', 'img-block__title').text
            _datestr = element.find('div', 'img-block__date').text
            date = datetime.strptime(_datestr,'%d.%m.%Y')

            exists = NewsItem.objects.filter(link=link)
            if not exists:
                item = NewsItem(title=title,
                                link=link,
                                picture=image,
                                date=date)
                item.save()
                print('created:{}'.format(title))
            else:
                print('exists:{}'.format(title))



