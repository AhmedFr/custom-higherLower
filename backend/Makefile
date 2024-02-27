PORT ?= 8080

.PHONY: run
run:
	@echo "Running..."
	docker-compose up api

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
