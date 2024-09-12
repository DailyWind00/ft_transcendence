FROM	python:3.10

RUN		mkdir -p /app
WORKDIR	/app

COPY	tools/requirements.txt /app/

# Python & django installation
RUN		apt update -y
RUN		apt upgrade -y
RUN		apt install jq -y
RUN		apt install rabbitmq-server -y
RUN		apt install python3-pip -y
RUN 	pip install --upgrade pip
RUN		pip install -U --no-cache-dir -r requirements.txt
# ---

COPY 	. /app/
COPY 	tools/ssl/ /app/
COPY 	tools/ssl/cert.crt /etc/vault/certs/
COPY 	tools/ssl/cert.key /etc/vault/certs/

COPY 	tools/ssl/cert.crt /usr/local/share/ca-certificates/cert.crt
RUN 	update-ca-certificates

# Python params (less memory usage)
ENV		PYTHONBUFFERED=1
ENV		PYTHONDONTWRITEBYTECODE=1

EXPOSE	5672
EXPOSE	2000

# Pong WebSocket
EXPOSE  2500

ENTRYPOINT		["sh", "tools/setup.sh"]
