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

# --- A supprimer avant la correction du projet ---
venv-setup:
	@read -p "Do you want to install/update Python3? (Y/n): " answer; \
	if [ "$$answer" = "" ] || [ "$$answer" = "y" ] || [ "$$answer" = "Y" ]; then \
		sudo apt update -y; \
		sudo apt upgrade -y; \
		sudo apt install python3-pip -y; \
		sudo apt install python3-venv -y; \
	else \
		echo "Python3 installation skipped"; \
	fi
	@if [ -d "venv" ]; then rm -rf venv; fi;
	@python3 -m venv venv
	@. venv/bin/activate && \
		pip install -r BackEnd/requirements.txt
# -------------------------------------------------

.PHONY: all up down fclean re venv-setup docker-download