#!/usr/bin/env sh

# Debug option
#set -ex

unseal() {
	vault operator unseal "$(grep 'Key 1:' /vault/file/keys | awk '{print $NF}')"
	vault operator unseal "$(grep 'Key 2:' /vault/file/keys | awk '{print $NF}')"
	vault operator unseal "$(grep 'Key 3:' /vault/file/keys | awk '{print $NF}')"
}

init() {
	vault operator init > /vault/file/keys
	sleep 5
}

log_in() {
	export ROOT_TOKEN=$(grep 'Initial Root Token:' /vault/file/keys | awk '{print $NF}')
	vault login "$ROOT_TOKEN"
}

create_token() {
	vault token create -id "$MY_VAULT_TOKEN"
}

create_approles() {
	vault auth enable approle
	echo 'path "secret/data/django/*" 
	{ 
		capabilities = [ "create", "read", "update", "delete", "list" ] 
	}' >> /vault/file/django-backend.hcl
	echo 'path "secret/*" 
	{ 
		capabilities = [ "create", "read", "update", "delete", "list" ] 
	}' >> /vault/file/django-backend.hcl
	vault policy write django-backend /vault/file/django-backend.hcl
	vault write auth/approle/role/django-backend token_policies="django-backend" token_ttl=1h token_max_ttl=4h token_type=batch
	
	echo 'path "secret/data/react/*" 
	{
		 capabilities =  [ "create", "read", "update", "delete", "list" ] 
	}' >> /vault/file/react-frontend.hcl
	echo 'path "secret/*" 
	{ 
		capabilities = [ "create", "read", "update", "delete", "list" ] 
	}' >> /vault/file/react-frontend.hcl
	vault policy write react-frontend /vault/file/react-frontend.hcl
	vault write auth/approle/role/react-frontend token_policies="react-frontend" token_ttl=1h token_max_ttl=4h token_type=batch

	DJANGO_ROLE_ID=$(vault read -field=role_id auth/approle/role/django-backend/role-id)
	REACT_ROLE_ID=$(vault read -field=role_id auth/approle/role/react-frontend/role-id)

	DJANGO_SECRET_ID=$(vault write -f -field=secret_id auth/approle/role/django-backend/secret-id)
	REACT_SECRET_ID=$(vault write -f -field=secret_id auth/approle/role/react-frontend/secret-id)

	echo "DJANGO_ROLE_ID=$DJANGO_ROLE_ID" >> /vault/file/env_vars.sh
	echo "REACT_ROLE_ID=$REACT_ROLE_ID" >> /vault/file/env_vars.sh
	echo "DJANGO_SECRET_ID=$DJANGO_SECRET_ID" >> /vault/file/env_vars.sh
	echo "REACT_SECRET_ID=$REACT_SECRET_ID" >> /vault/file/env_vars.sh
}

store_env() {
	vault secrets enable -path=secret kv-v2

	vault kv put secret/django POSTGRES_DB="$POSTGRES_DB" POSTGRES_USER="$POSTGRES_USER" \
		POSTGRES_PASSWORD="$POSTGRES_PASSWORD" DATABASE_HOST_NAME="$DATABASE_HOST_NAME" \
		DATABASE_PORT="$DATABASE_PORT" SECRET_KEY="$SECRET_KEY" DJANGO_SUPERUSER_USERNAME="$DJANGO_SUPERUSER_USERNAME" DJANGO_SUPERUSER_EMAIL="$DJANGO_SUPERUSER_EMAIL" DJANGO_SUPERUSER_PASSWORD="$DJANGO_SUPERUSER_PASSWORD" 
	vault kv put secret/react VITE_API_URL="$VITE_API_URL"
}

if [ -s /vault/file/keys ]; then
	unseal
else
	init
	unseal
	log_in
	create_token
	create_approles
	store_env
fi

vault status > /vault/file/status
