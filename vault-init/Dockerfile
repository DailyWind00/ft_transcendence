FROM hashicorp/vault:1.13.3

COPY vault-init.sh /vault-init.sh

RUN chmod +x /vault-init.sh

CMD ["/bin/sh", "/vault-init.sh"]
