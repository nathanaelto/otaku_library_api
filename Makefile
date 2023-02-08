.PHONY: build packages up down restart

build:
	@docker-compose build

packages:
	@docker-compose run --rm app npm install

up:
	@docker-compose up -d

down:
	@docker-compose down
	@docker-compose rm -fv

restart:
	@docker-compose restart
