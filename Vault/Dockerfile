FROM hashicorp/vault:1.13.3


COPY config.hcl /vault/config/config.hcl
COPY start_vault.sh /start_vault.sh


RUN chmod +x /start_vault.sh

ENTRYPOINT ["/start_vault.sh"]
