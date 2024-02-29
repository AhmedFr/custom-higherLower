PORT ?= 8080

.PHONY: run_api
run_api:
	@echo "Running..."
	docker-compose up api

.PHONY: run_db
run_db:
	@echo "Running..."
	docker-compose up db

.PHONY: run
run:
	@echo "Running..."
	docker-compose up

.PHONY: build
build:
	@echo "Building & running..."
	docker-compose up --build

.PHONY: stop
stop:
	@echo "Stopping..."
	docker-compose down

.PHONY: clean
clean:
	@echo "Cleaning..."
	docker-compose down --volumes --remove-orphans

.PHONY: dev
dev:
	@echo "Running in dev mode..."
	docker-compose up 
