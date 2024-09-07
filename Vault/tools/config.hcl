listener "tcp" {
  address = "0.0.0.0:8200"
  tls_disable = "false"
  tls_cert_file = "/etc/vault/certs/vault.crt"
  tls_key_file = "/etc/vault/private/vault.key"
}


storage "file" {
  path = "/vault/data"
}

ui = true
disable_mlock = "true"