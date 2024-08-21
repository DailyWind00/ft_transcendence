FROM	python:3.10

RUN		mkdir -p /app
WORKDIR	/app

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

COPY	tools/pythonlib.txt /app/

RUN		pip install --no-cache-dir -r pythonlib.txt # install libs dependencies
# ---

COPY 	tools/ /app/

# Python params (less memory usage)
ENV		PYTHONBUFFERED=1
ENV		PYTHONDONTWRITEBYTECODE=1

EXPOSE	3001

CMD		["python", "manage.py", "runserver", "0.0.0.0:3000"]
#CMD		["gunicorn", "--bind", "0.0.0.0:3000", "app.wsgi:application"]
