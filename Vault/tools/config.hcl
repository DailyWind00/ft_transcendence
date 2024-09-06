listener "tcp" {
  address = "frontend:8200"
  tls_cert_file = "/etc/vault/certs/vault.crt"
  tls_key_file = "/etc/vault/private/vault.key"
}


storage "file" {
  path = "/opt/vault"
}

api_addr = "https://frontend:8200"
ui = true
disable_mlock = "true"
log_requests_level = "trace"