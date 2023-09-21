package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/", handler).Methods("POST")
	log.Println("Server started on http://localhost:8000")
	log.Fatal(http.ListenAndServe(":8000", r))
}

func handler(w http.ResponseWriter, r *http.Request) {
	// Process the request from the Minecraft server plugin
	// Add your custom logic here
	fmt.Fprintf(w, "Received request from Minecraft server!")
}
