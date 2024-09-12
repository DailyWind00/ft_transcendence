#!/bin/bash

python3 manage.py collectstatic --noinput

# Database configuration
python3 manage.py makemigrations manage_user matchmaking
python3 manage.py migrate
echo $DJANGO_SUPERUSER_PASSWORD | python3 manage.py createsuperuser --noinput --username="admin" --email="DailyWind1@gmail.com"

# Set up RabbitMQ
service rabbitmq-server start
celery -A backend worker --loglevel=info -E &
celery -A backend beat --loglevel=info &

# Get Vault token
while [ ! -f /shared_data/vault_token.json ]; do
	sleep 1
done
export VAULT_TOKEN=$(cat /shared_data/vault_token.json | jq -r '.auth.client_token')

# Start server
python3 pong-serv.py &
gunicorn --workers=17 --bind 0.0.0.0:2000 --certfile "cert.crt" --keyfile "cert.key" "backend.wsgi:application" # HTTPS
