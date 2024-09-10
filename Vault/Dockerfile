FROM	hashicorp/vault:1.13.3

# Copy files
COPY 	tools/config.hcl /vault/config/config.hcl
COPY 	tools/start_vault.sh /start_vault.sh
COPY 	tools/ssl/vault.crt /etc/vault/certs/vault.crt
COPY 	tools/ssl/vault.key /etc/vault/private/vault.key
# ---

RUN 	apk add --no-cache curl

EXPOSE 	8200

ENTRYPOINT ["sh", "start_vault.sh"]
