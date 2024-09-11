#!/bin/bash

# Paths
FRONTEND="./FrontEnd/tools/ssl"
BACKEND="./BackEnd/tools/ssl"
VAULT="./Vault/tools/ssl"

mkdir -p "$FRONTEND" "$BACKEND" "$VAULT"

if [ ! -f "${FRONTEND}/cert.crt" ]; then
    openssl req -new -newkey rsa:2048 -days 3650 -nodes -x509 \
        -keyout "${FRONTEND}/cert.key" -out "${FRONTEND}/cert.crt" \
        -subj "/C=FR/O=42LeHavre/CN=transcendance-cert" \
        -extensions v3_ca \
        -config <(cat /etc/ssl/openssl.cnf <(printf '[v3_ca]\nsubjectAltName=DNS:vault')) >/dev/null 2>&1
fi

cp "${FRONTEND}/cert.crt" "${BACKEND}/cert.crt" && cp "${FRONTEND}/cert.key" "${BACKEND}/cert.key"
cp "${FRONTEND}/cert.crt" "${VAULT}/cert.crt" && cp "${FRONTEND}/cert.key" "${VAULT}/cert.key"
echo "Created certificates"