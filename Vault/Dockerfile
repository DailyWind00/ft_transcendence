FROM	hashicorp/vault:1.13.3

# Copy files
COPY 	tools/config.hcl /vault/config/config.hcl
COPY 	tools/start_vault.sh /start_vault.sh
COPY 	tools/ssl/cert.crt /etc/vault/certs/cert.crt
COPY 	tools/ssl/cert.key /etc/vault/private/cert.key
# ---

RUN 	apk add --no-cache curl

EXPOSE 	8200

ENTRYPOINT ["sh", "start_vault.sh"]
