package database

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var (
	ctx    context.Context
	client *mongo.Client
)

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	DB_CONNECTION_STRING := os.Getenv("DB_CONNECTION_STRING")

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel() // Ensure that the context is cancelled

	clientOptions := options.Client().ApplyURI(DB_CONNECTION_STRING).SetMaxPoolSize(200) // Set connection pool size
	client, err = mongo.Connect(ctx, clientOptions)

	if err != nil {
		log.Fatalf("Failed to connect to the database: %v", err)
	}

	err = client.Ping(ctx, nil)
	if err != nil {
		log.Fatalf("Couldn't connect to the database: %v", err)
	} else {
		log.Println("Connected successfully to the database.")
	}
}
