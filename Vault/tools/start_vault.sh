#!/usr/bin/env sh

# Start Vault server in the background
vault server -config=/vault/config/config.hcl &
VAULT_PID=$!

# Wait for Vault to start
echo "Waiting for Vault to start..."
sleep 100000  # Augmentez ce délai si nécessaire

# Check if Vault is up
echo "Checking if Vault is up..."
until vault status > /dev/null 2>&1; do
  echo "Vault is not yet available, retrying..."
  sleep 10
done

echo "Vault is up, proceeding with initialization..."

# Initialize Vault
INIT_OUTPUT=$(vault operator init -key-shares=1 -key-threshold=1)

# Extract the unseal key and root token from the output
UNSEAL_KEY=$(echo "$INIT_OUTPUT" | grep 'Unseal Key 1:' | awk '{print $NF}')
ROOT_TOKEN=$(echo "$INIT_OUTPUT" | grep 'Initial Root Token:' | awk '{print $NF}')

# Save the unseal key and root token to files or variables for later use
echo "Unseal Key: $UNSEAL_KEY"
echo "Root Token: $ROOT_TOKEN"

# Save the keys to files (ensure secure storage)
echo "$UNSEAL_KEY" > /vault/file/unseal_key.txt
echo "$ROOT_TOKEN" > /vault/file/root_token.txt

# Unseal Vault
vault operator unseal "$UNSEAL_KEY"

# Set the root token as an environment variable (optional)
export VAULT_TOKEN="$ROOT_TOKEN"

# Wait for Vault to be unsealed
echo "Waiting for Vault to be unsealed..."
sleep 10  # Augmentez ce délai si nécessaire

# Keep the script running to prevent the container from exiting
wait $VAULT_PID
