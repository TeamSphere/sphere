package main

import (
	"log"

	"/Users/joe/sphere/backend/database" // replace "your_project" with your project's import path
)

func main() {
	err := database.AddUser("joseph@thesphere.online", "sphere2024")
	if err != nil {
		log.Fatal(err)
	}
}
