#!/bin/bash

CERTS_DIR="./ssl/certs"
PRIVATE_KEY_DIR="./ssl/private"

# Création des répertoires avec permissions
mkdir -p "$CERTS_DIR" "$PRIVATE_KEY_DIR"
sudo chmod 777 "${CERTS_DIR}" "${PRIVATE_KEY_DIR}"

# Générer le certificat de l'autorité de certification (CA) si nécessaire
if [ ! -f "${CERTS_DIR}/ca.crt" ]; then
    openssl req -new -x509 -days 3650 -keyout "${PRIVATE_KEY_DIR}/ca.key" -out "${CERTS_DIR}/ca.crt" -nodes \
        -subj "/C=FR/O=42LeHavre/CN=transcendance-ca" >/dev/null 2>&1
fi

# Générer le certificat serveur si nécessaire
if [ ! -f "${CERTS_DIR}/vault.crt" ]; then
    openssl req -new -nodes -newkey rsa:4096 -keyout "${PRIVATE_KEY_DIR}/vault.key" -out "${CERTS_DIR}/vault.csr" \
        -subj "/C=FR/O=42LeHavre/CN=www.transcendance.ff" \
        -addext "subjectAltName=DNS:vault,DNS:localhost,DNS:www.transcendance.ff" >/dev/null 2>&1

    # Créer un fichier temporaire pour les extensions
    EXTFILE=$(mktemp)
    printf "subjectAltName=DNS:vault,DNS:localhost,DNS:www.transcendance.ff" > "${EXTFILE}"

    # Générer le certificat avec le fichier temporaire d'extensions
    openssl x509 -req -days 365 -in "${CERTS_DIR}/vault.csr" -CA "${CERTS_DIR}/ca.crt" -CAkey "${PRIVATE_KEY_DIR}/ca.key" \
        -CAcreateserial -out "${CERTS_DIR}/vault.crt" -extfile "${EXTFILE}" >/dev/null 2>&1

    # Supprimer le fichier temporaire
    rm -f "${EXTFILE}"
fi