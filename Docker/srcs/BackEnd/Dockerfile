FROM	python:3.10

RUN		mkdir -p /app
WORKDIR	/app

# Python installation
RUN		apt update -y
RUN		apt upgrade -y
RUN		apt install pip -y

COPY	pythonlib.txt /app/

RUN		pip install --no-cache-dir -r pythonlib.txt # install libs dependencies
# ---

COPY 	. /app/

# Python params
ENV		PYTHONBUFFERED 1
ENV		PYTHONDONTWRITEBYTECODE 1

EXPOSE	3001

CMD		["python", "manage.py", "runserver", "0.0.0.0:3000"]
#CMD		["gunicorn", "--bind", "0.0.0.0:3000", "app.wsgi:application"]
