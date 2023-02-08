build:
	@go build -o bin/sphere

run: build
	@./bin/docker

test:
	@go test -v ./...