FROM hashicorp/vault:1.13.3


COPY vault-config.hcl /vault/config/config.hcl
COPY start_vault.sh /start_vault.sh


RUN chmod +x /start_vault.sh

EXPOSE 8200

ENTRYPOINT ["/bin/sh", "/start_vault.sh"]