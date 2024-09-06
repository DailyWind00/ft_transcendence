all:
	@if [ -f oui ];                                                                        \
	then                                                                                    \
		sh ./ssl_generator.sh;                                                               \
		docker compose -f ./docker-compose.yml up -d --build                                  \
		&& echo "\033[1;35m> You can go to the website : \033[1;33mhttps://localhost\033[0m";  \
	else           		                      	 	                                            \
		echo "\033[1;31m> How dare you !!!\033[0m";                                              \
	fi

up:
	@docker compose -f ./docker-compose.yml up -d

down:
	@docker compose -f ./docker-compose.yml down

# Modifier avant la correction du projet pour pas delete toutes les images
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
	docker image prune -f

re: fclean all

# --- A supprimer avant la correction du projet ---
venv-setup:
	@read -p "Do you want to install/update Python3? (Y/n): " answer;           \
	if [ "$$answer" = "" ] || [ "$$answer" = "y" ] || [ "$$answer" = "Y" ]; then \
		sudo apt update -y;                                                       \
		sudo apt upgrade -y;                                                       \
		sudo apt install python3-pip -y;                                            \
		sudo apt install python3-venv -y;                                            \
	else                                                                              \
		echo "Python3 installation skipped";                                           \
	fi
	@if [ -d "venv" ]; then rm -rf venv; fi;
	@python3 -m venv venv
	@. venv/bin/activate && \
		pip install -r BackEnd/tools/requirements.txt
# -------------------------------------------------

.PHONY: all up down fclean re venv-setup