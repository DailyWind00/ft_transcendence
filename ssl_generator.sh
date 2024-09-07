#!/bin/bash

# Paths
FRONTEND="./FrontEnd/tools/ssl"
BACKEND="./BackEnd/tools/ssl"
VAULT="./Vault/tools/ssl"

mkdir -p "$FRONTEND" "$BACKEND"

# Frontend
if [ ! -f "${FRONTEND}/frontend.crt" ]; then
    openssl req -new -x509 -days 3650 -keyout "${FRONTEND}/frontend.key" -out "${FRONTEND}/frontend.crt" -nodes \
        -subj "/C=FR/O=42LeHavre/CN=transcendance-frontend" >/dev/null 2>&1
fi

# Backend
if [ ! -f "${BACKEND}/backend.crt" ]; then
    openssl req -new -x509 -days 3650 -keyout "${BACKEND}/backend.key" -out "${BACKEND}/backend.crt" -nodes \
        -subj "/C=FR/O=42LeHavre/CN=transcendance-backend" >/dev/null 2>&1
fi
cp "${BACKEND}/backend.crt" "${FRONTEND}/backend.crt"
cp "${BACKEND}/backend.key" "${FRONTEND}/backend.key"

# Vault
if [ ! -f "${VAULT}/vault.crt" ]; then
    openssl req -new -x509 -days 3650 -keyout "${VAULT}/vault.key" -out "${VAULT}/vault.crt" -nodes \
        -subj "/C=FR/O=42LeHavre/CN=transcendance-vault" \
        -addext "subjectAltName=DNS:vault" >/dev/null 2>&1
fi
cp "${VAULT}/vault.crt" "${BACKEND}/vault.crt"
cp "${VAULT}/vault.key" "${BACKEND}/vault.key"