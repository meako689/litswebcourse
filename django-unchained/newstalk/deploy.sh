python manage.py migrate;
python manage.py fetchnews;

cd newsfront;
npm install;
npm run build;
cd -;
