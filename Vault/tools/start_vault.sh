#!/bin/bash

# Start Vault
vault server -config=/vault/config/config.hcl &
sleep 5

# Initialize Vault
vault operator init -key-shares=1 -key-threshold=1 > /vault/config/init-keys.txt

# Unseal Vault
UNSEAL_KEY=$(grep 'Unseal Key 1:' /vault/config/init-keys.txt | awk '{print $NF}')
vault operator unseal $UNSEAL_KEY

# Set Vault root Token
export VAULT_TOKEN=$(grep 'Initial Root Token:' /vault/config/init-keys.txt | awk '{print $NF}')

# Create secrets
vault secrets enable -path=secret kv

# - Django
vault kv put secret/data/django                          \
	DJANGO_SECRET="$DJANGO_SECRET"                         \
	DJANGO_SUPERUSER_PASSWORD="$DJANGO_SUPERUSER_PASSWORD" \

# - Postgres
vault kv put secret/data/postgres        \
	POSTGRES_PASSWORD="$POSTGRES_PASSWORD" \

# Create Policies
echo 'path "secret/data/django/*" {
  capabilities = ["read"]
}' | vault policy write django-policy -

echo 'path "secret/data/postgres/*" {
  capabilities = ["read"]
}' | vault policy write postgres-policy -

echo 'path "sys/mounts" {
  capabilities = ["read"]
}

path "secret/*" {
  capabilities = ["read"]
}' | vault policy write sys-policy -

# Create token for Django
vault token create -policy=django-policy -policy=postgres-policy -policy=sys-policy -format=json > /shared_data/vault_token.json

wait $!
