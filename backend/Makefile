.PHONY: all build test clean docker-up dev swagger swagger-install

# Go related variables
BINARY_NAME=kasikorn-line
MAIN_PACKAGE=cmd/main.go

# Go commands
GOCMD=go
GOBUILD=$(GOCMD) build
GOTEST=$(GOCMD) test
GOCLEAN=$(GOCMD) clean
GOGET=$(GOCMD) get
GOMOD=$(GOCMD) mod
GOTIDY=$(GOMOD) tidy

# Swagger
SWAG=$(HOME)/go/bin/swag


# Build
build:
	$(GOBUILD) -o $(BINARY_NAME) $(MAIN_PACKAGE)

# Test
test:
	$(GOTEST) -v ./...

# Clean
clean:
	$(GOCLEAN)
	rm -f $(BINARY_NAME)

# Dependencies
deps:
	$(GOTIDY)

# Run the application
run:
	$(GOCMD) run $(MAIN_PACKAGE)

# Initialize project
init: deps build swagger

# Start Docker containers
docker-up:
	docker-compose up -d

# Stop Docker containers
docker-down:
	docker-compose down

# Run with Air for development (hot-reload)
dev:
	$(HOME)/go/bin/air -c .air.toml

# Install Swagger tools
swagger-install:
	$(GOGET) -u github.com/swaggo/swag/cmd/swag

# Generate Swagger documentation
swagger:
	$(SWAG) init -g $(MAIN_PACKAGE) 