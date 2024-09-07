#!/bin/bash

# Database configuration
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py migrate django_celery_beat
sudo service redis-server start
celery -A backend worker --loglevel=info
celery -A backend beat --loglevel=info
echo $DJANGO_SUPERUSER_PASSWORD | python3 manage.py createsuperuser --noinput --username="admin" --email="DailyWind1@gmail.com"

# Start server
# gunicorn --workers=17 --bind 0.0.0.0:2000 "backend.wsgi:application" # HTTP
gunicorn --workers=17 --bind 0.0.0.0:2000 --certfile "backend.crt" --keyfile "backend.key" "backend.wsgi:application" # HTTPS
