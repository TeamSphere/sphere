package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/your-username/the-sphere/internal/handlers"
)

func main() {
	router := gin.Default()

	// User routes
	router.POST("/users", handlers.CreateUser)
	router.GET("/users/:id", handlers.GetUser)

	log.Fatal(http.ListenAndServe(":8080", router))
}
