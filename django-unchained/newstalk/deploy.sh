python manage.py migrate;
cd newsfront;
npm install;
npm run build;
cd -;
python manage.py collectstaic;

