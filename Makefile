all:
	@docker compose -f ./docker-compose.yml up -d --build

up:
	@docker compose -f ./docker-compose.yml up -d

down:
	@docker compose -f ./docker-compose.yml down

fclean:
	@containers=$$(docker ps -qa);     \
	if [ -n "$$containers" ]; then     \
		docker rm -f $$containers;     \
	fi;                                \
	volumes=$$(docker volume ls -q);   \
	if [ -n "$$volumes" ]; then        \
		docker volume rm -f $$volumes; \
	fi;                                \
	docker network prune -f

re: fclean all
