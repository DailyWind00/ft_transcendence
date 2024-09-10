FROM	python:3.10

RUN		mkdir -p /app
WORKDIR	/app

COPY	tools/requirements.txt /app/

# Python & django installation
RUN		apt update -y
RUN		apt upgrade -y
RUN		apt install jq -y
RUN		apt install python3-pip -y
RUN		apt install python3-venv -y
RUN 	pip install --upgrade pip
RUN		pip install --no-cache-dir -r requirements.txt
# ---

COPY 	. /app/
COPY 	tools/ssl/ /app/
COPY 	tools/ssl/vault.crt /etc/vault/certs/
COPY 	tools/ssl/vault.key /etc/vault/certs/

# Python params (less memory usage)
ENV		PYTHONBUFFERED=1
ENV		PYTHONDONTWRITEBYTECODE=1

# Change user to non-root for celery
RUN useradd -ms /bin/bash celeryuser

EXPOSE	2000

ENTRYPOINT		["sh", "tools/setup.sh"]