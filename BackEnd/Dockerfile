FROM	python:3.10

RUN		mkdir -p /app
WORKDIR	/app

COPY	tools/requirements.txt /app/

# Python & django installation
RUN		apt update -y
RUN		apt upgrade -y
RUN		apt install python3-pip -y
RUN		apt install python3-venv -y
RUN		python3 -m venv venv
RUN		. venv/bin/activate
RUN 	pip install --upgrade pip
RUN		pip install --no-cache-dir -r requirements.txt
# ---

COPY 	. /app/
COPY 	tools/backend.crt /app/
COPY 	tools/backend.key /app/

# Python params (less memory usage)
ENV		PYTHONBUFFERED=1
ENV		PYTHONDONTWRITEBYTECODE=1

EXPOSE	2000

ENTRYPOINT		["sh", "tools/setup.sh"]