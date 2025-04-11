# Kasikorn Line Backend Service

This is the backend service for the Kasikorn Line assignment. This guide will help you set up and run the service locally.

## Prerequisites

- Go 1.21 or higher
- Docker and Docker Compose
- Air (for hot-reload development)

## Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd backend
```

2. Install required tools:

```bash
# Install Air for hot-reload
go install github.com/cosmtrek/air@latest

# Install Swagger tools
make swagger-install
```

3. Install dependencies:

```bash
make deps
```

4. Generate Swagger documentation:

```bash
make swagger
```

## Running the Service

### Development Mode (with hot-reload)

```bash
make dev
```

This will start the service with hot-reload enabled using Air. Any changes to the code will automatically restart the server.

### Production Mode

```bash
make build
./kasikorn-line
```

### Using Docker

To run the service using Docker:

1. Start the containers:

```bash
make docker-up
```

2. Stop the containers:

```bash
make docker-down
```

## Available Make Commands

- `make build` - Build the application
- `make test` - Run tests
- `make clean` - Clean build artifacts
- `make deps` - Install dependencies
- `make run` - Run the application directly
- `make init` - Initialize project (deps + build + swagger)
- `make docker-up` - Start Docker containers
- `make docker-down` - Stop Docker containers
- `make dev` - Run with hot-reload
- `make swagger-install` - Install Swagger tools
- `make swagger` - Generate Swagger documentation

## API Documentation

After running the service, you can access the Swagger API documentation at:

```
http://localhost:8080/swagger/index.html
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=8080

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=assignment

# JWT Configuration
JWT_SECRET=your-secret-key
```

Default values will be used if environment variables are not set:

- `PORT`: 8080
- `DB_HOST`: localhost
- `DB_PORT`: 3306
- `DB_USER`: root
- `DB_PASSWORD`: root
- `DB_NAME`: assignment
- `JWT_SECRET`: your-secret-key

## Troubleshooting

If you encounter any issues:

1. Make sure all prerequisites are installed
2. Check if all environment variables are properly set
3. Try cleaning and rebuilding:

```bash
make clean
make init
```
