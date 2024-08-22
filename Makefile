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

venv-setup:
	@python3 -m venv venv
	@. venv/bin/activate && \
	pip install -r BackEnd/requirements.txt

# docker-download:
# 	@sudo apt update
# 	@sudo apt upgrade -y
# 	@sudo apt install ca-certificates curl gnupg
# 	@sudo install -m 0755 -d /etc/apt/keyrings
# 	@curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
# 	@sudo chmod a+r /etc/apt/keyrings/docker.gpg
# 	@echo																														 \
# 		"deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
# 		$(. /etc/os-release && echo "$VERSION_CODENAME") stable" | 																 \
# 		sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
# 	@sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
# 	@sudo apt-get update
# 	@sudo apt-get install docker-ce docker-ce-cli [containerd.io](http://containerd.io/) docker-buildx-plugin docker-compose-plugin
# 	@echo "Docker installed"
# 	@sudo service docker status
# 	@docker compose version
# 	@sudo usermod -aG docker $USER

.PHONY: all up down fclean re venv-setup docker-download