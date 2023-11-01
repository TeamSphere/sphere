package main

import (
	"fmt"
	"net/http"

	"github.com/TeamSphere/sphere/backend/api/handlers"
)

func main() {
	http.HandleFunc("/api/accounts", handlers.SphereAccountHandler)
	http.HandleFunc("/api/transactions", handlers.SphereTransactionHandler)

	fmt.Println("Sphere server is running on http://localhost:8000")
	http.ListenAndServe(":8000", nil)
}
