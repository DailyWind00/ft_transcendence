#!/bin/bash

# Database configuration
python3 manage.py makemigrations
python3 manage.py migrate
echo $DJANGO_SUPERUSER_PASSWORD | python3 manage.py createsuperuser --noinput --username="admin" --email="DailyWind1@gmail.com"

# Get Vault token
export VAULT_TOKEN=$(cat /shared_data/vault_token.json | jq -r '.auth.client_token')

# Start server
# gunicorn --workers=17 --bind 0.0.0.0:2000 "backend.wsgi:application" # HTTP
gunicorn --workers=17 --bind 0.0.0.0:2000 --certfile "backend.crt" --keyfile "backend.key" "backend.wsgi:application" # HTTPS
