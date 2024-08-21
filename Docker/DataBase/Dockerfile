FROM	postgres:latest

COPY	tools/init.sql /docker-entrypoint-initdb.d/

EXPOSE	5432

CMD		["postgres"]