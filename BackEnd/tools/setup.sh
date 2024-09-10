#!/bin/bash

# Database configuration
python3 manage.py makemigrations
python3 manage.py migrate
echo $DJANGO_SUPERUSER_PASSWORD | python3 manage.py createsuperuser --noinput --username="admin" --email="DailyWind1@gmail.com"

# Set up redis
celery -A backend worker --loglevel=info --uid=celeryuser -E &
celery -A backend beat --loglevel=info --uid=celeryuser &

# Get Vault token
while [ ! -f /shared_data/vault_token.json ]; do
	sleep 1
done
export VAULT_TOKEN=$(cat /shared_data/vault_token.json | jq -r '.auth.client_token')

# Start server
gunicorn --workers=17 --bind 0.0.0.0:2000 --certfile "backend.crt" --keyfile "backend.key" "backend.wsgi:application" # HTTPS
