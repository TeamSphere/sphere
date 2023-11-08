package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/TeamSphere/sphere/backend/api/account"
	"github.com/TeamSphere/sphere/backend/api/auth"
	"github.com/TeamSphere/sphere/backend/api/blockchain"
	"github.com/rs/cors"
)

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("/api/account", account.Handler)
	mux.HandleFunc("/api/register", auth.RegisterHandler)
	mux.HandleFunc("/api/login", auth.LoginHandler)
	mux.HandleFunc("/api/blockchain/new", blockchain.CreateBlockHandler)
	mux.HandleFunc("/api/blockchain/get", blockchain.GetBlockchainHandler)

	// Configure CORS
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"}, // allow all origins
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
	})

	// Wrap the mux with the cors handler
	handler := c.Handler(mux)

	// Get the port number from the environment so we can run on App Engine
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		log.Printf("Defaulting to port %s", port)
	}

	// Start the server
	log.Printf("Listening on port %s", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), handler))
}
