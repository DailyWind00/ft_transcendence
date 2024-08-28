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
RUN		pip install --no-cache-dir -r requirements.txt
# ---

COPY 	. /app/

# Python params (less memory usage)
ENV		PYTHONBUFFERED=1
ENV		PYTHONDONTWRITEBYTECODE=1

EXPOSE	2000

CMD 	["sh", "tools/db_setup.sh"]

ENTRYPOINT		["gunicorn", "--bind", "0.0.0.0:2000", "backend.wsgi:application"]
