package main

import (
	"net/http"

	"github.com/TeamSphere/sphere/backend/api/handlers"
)

func main() {
	http.HandleFunc("/api/account", handlers.AccountHandler)
	http.HandleFunc("/api/register", handlers.RegisterHandler)
	http.HandleFunc("/api/login", handlers.LoginHandler)

	http.ListenAndServe(":8000", nil)
}
