all:
	@if [ -f oui ]; then                                                   \
		bash "./ssl_generator.sh";                                          \
		docker compose -f ./docker-compose.yml up -d --build;                \
		echo -n "\033[1;35m> You can go to the website : \033[1;33mhttps://"; \
		ip addr | grep inet | grep metric | awk '{print $$2}' | head -c -4 ;   \
		echo ":6942/\033[0m";                                                   \
	else           		                      	 	                             \
		echo "\033[1;31m> How dare you !!!\033[0m";                               \
	fi

up:
	@docker compose -f ./docker-compose.yml up -d

down:
	@docker compose -f ./docker-compose.yml down

fclean:
	@containers=$$(docker ps -qa); \
	if [ -n "$$containers" ]; then  \
		docker rm -f $$containers;   \
	fi;                               \
	volumes=$$(docker volume ls -q);   \
	if [ -n "$$volumes" ]; then         \
		docker volume rm -f $$volumes;   \
	fi;                                   \
	docker network prune -f;               \
	docker image prune -f;    			    \
	rm -f ./FrontEnd/tools/ssl/*;            \
	rm -f ./BackEnd/tools/ssl/*;              \
	rm -f ./Vault/tools/ssl/*

re: fclean all

.PHONY: all up down fclean re venv-setup