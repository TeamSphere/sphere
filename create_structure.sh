#!/bin/bash

# Create directories
mkdir -p sphere/backend/cmd/server
mkdir -p sphere/backend/blockchain
mkdir -p sphere/backend/ai
mkdir -p sphere/frontend/public
mkdir -p sphere/frontend/src/components/AutoGPT
mkdir -p sphere/frontend/src/pages/Home
mkdir -p sphere/frontend/src/services
mkdir -p sphere/frontend/src/assets

# Create files
touch sphere/backend/cmd/server/main.go
touch sphere/backend/blockchain/chain.go
touch sphere/backend/blockchain/transaction.go
touch sphere/backend/ai/ai.go
touch sphere/frontend/public/index.html
touch sphere/frontend/public/favicon.ico
touch sphere/frontend/src/components/AutoGPT/AutoGPT.js
touch sphere/frontend/src/pages/Home/Home.js
touch sphere/frontend/src/services/api.js
touch sphere/.gitignore
touch sphere/go.mod
touch sphere/go.sum
touch sphere/frontend/package.json
touch sphere/frontend/package-lock.json

# Add initial content to files
echo "<!DOCTYPE html>
<html>
<head>
  <title>Sphere</title>
</head>
<body>
  <div id="root"></div>
  <script src="index.js"></script>
</body>
</html>" > sphere/frontend/public/index.html

echo "{
  \"name\": \"sphere-frontend\",
  \"version\": \"1.0.0\",
  \"scripts\": {
    \"start\": \"react-scripts start\",
    \"build\": \"react-scripts build\",
    \"test\": \"react-scripts test\",
    \"eject\": \"react-scripts eject\"
  },
  \"dependencies\": {
    \"react\": \"^17.0.2\",
    \"react-dom\": \"^17.0.2\",
    \"react-scripts\": \"4.0.3\"
  },
  \"devDependencies\": {}
}" > sphere/frontend/package.json

echo "package main

import (
	"fmt"
)

func main() {
	fmt.Println(\"Hello, Sphere!\")
}" > sphere/backend/cmd/server/main.go

echo "module github.com/TeamSphere/sphere

go 1.17" > sphere/go.mod