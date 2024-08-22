FROM	python:3.10

RUN		mkdir -p /app
WORKDIR	/app

COPY	requirements.txt /app/

# Python & django installation
RUN		apt update -y
RUN		apt upgrade -y
RUN		apt install python3-pip -y
RUN		apt install python3-venv -y
RUN		python3 -m venv venv
RUN		. venv/bin/activate
RUN		pip install django
RUN		pip install djangorestframework
RUN 	django-admin --version
RUN		pip install psycopg2
RUN 	pip install gunicorn

RUN		pip install --no-cache-dir -r requirements.txt
# ---

COPY 	. /app/

# Python params (less memory usage)
ENV		PYTHONBUFFERED=1
ENV		PYTHONDONTWRITEBYTECODE=1

EXPOSE	3000

RUN     python3 manage.py makemigrations

#CMD		["python", "manage.py", "runserver", "0.0.0.0:3000"]
CMD		["gunicorn", "--bind", "0.0.0.0:3000", "backend.wsgi:application"]
