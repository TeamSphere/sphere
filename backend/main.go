package main

import (
	"net/http"

	"github.com/TeamSphere/sphere/backend/api/handlers"
	"github.com/rs/cors"
)

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("/api/account", handlers.AccountHandler)
	mux.HandleFunc("/api/register", handlers.RegisterHandler)
	mux.HandleFunc("/api/login", handlers.LoginHandler)

	// Configure CORS
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"}, // allow all origins
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
	})

	// Wrap the mux with the cors handler
	handler := c.Handler(mux)

	http.ListenAndServe(":8000", handler)
}
