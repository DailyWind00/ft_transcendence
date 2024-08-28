#!/bin/bash

# Database configuration
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py createsuperuser --noinput --username=root --email="DailyWind1@gmail.com" 

# Run server
gunicorn --workers=8 --bind 0.0.0.0:2000 backend.wsgi:application