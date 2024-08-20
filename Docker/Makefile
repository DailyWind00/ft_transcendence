all:
	@docker compose -f ./docker-compose.yml up -d --build

up:
	@docker compose -f ./docker-compose.yml up -d

down:
	@docker compose -f ./docker-compose.yml down

fclean:
	@docker rm -f $$(docker ps -qa); \
	docker volume rm -f $$(docker volume ls -q); \
	docker network rm -f $$(docker network ls -q); #

re: fclean all
