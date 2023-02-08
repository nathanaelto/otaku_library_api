# Otaku Library API

## Usage
Swagger on : http://localhost:8080/doc

---

## Installation

If you have `make` :
```bash
# Build Dockerfile
make build

# Run docker-compose
make up
```

If you don't have `make` :
```bash
# Build Dockerfile
docker-compose build

# Run docker-compose
docker-compose up -d
```

## Restart
If you have `make` :
```bash
make restart
```

If you don't have `make` :
```bash
docker-compose restart
```

## Stop
If you have `make` :
```bash
make down
```

If you don't have `make` :
```bash
docker-compose down
docker-compose rm -fv
```