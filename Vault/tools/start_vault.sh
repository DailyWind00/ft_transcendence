#!/bin/bash

# Start Vault
vault server -config=/vault/config/config.hcl &
until vault status 2>/dev/null | grep -q 'Initialized'; do
    sleep 1
done

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
vault kv put secret/data/django                                             \
	DJANGO_SECRET="cenkuaop=l+w7c!n4)s&cp_juh!mf4cil9z=pxft==ea64wki*" \
	DJANGO_SUPERUSER_PASSWORD="trans123"

# - Postgres
vault kv put secret/data/postgres                                           \
	POSTGRES_PASSWORD=ft_transcendence

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
