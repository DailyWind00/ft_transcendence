#!/bin/bash

# Start Vault
vault server -config=/vault/config/config.hcl &
sleep 5
vault operator init -key-shares=1 -key-threshold=1 > /vault/config/init-keys.txt # Save keys to file

# Unseal Vault
UNSEAL_KEY=$(grep 'Unseal Key 1:' /vault/config/init-keys.txt | awk '{print $NF}')
vault operator unseal $UNSEAL_KEY

# Create secrets
vault secrets enable -path=secret kv

# - Django
vault kv put secret/django                                             \
	DJANGO_SECRET="cenkuaop=l+w7c!n4)s&cp_juh!mf4cil9z=pxft==ea64wki*" \
	DJANGO_SUPERUSER_PASSWORD="trans123"

# - Postgres
vault kv put secret/Postgres                                           \
	POSTGRES_PASSWORD=ft_transcendence


# Policies
echo 'path "secret/django/*" {
  capabilities = ["read"]
}' vault policy write django-policy -

echo 'path "secret/Postgres/*" {
  capabilities = ["read"]
}' | vault policy write postgres-policy -

wait $!
