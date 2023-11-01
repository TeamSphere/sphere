package handlers

import (
	"fmt"
	"net/http"
)

func SphereTransactionHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		fmt.Fprintf(w, "GET method requested. Returning transaction details.")
	case "POST":
		fmt.Fprintf(w, "POST method requested. Creating new transaction.")
	default:
		http.Error(w, "Invalid method. Only GET and POST are supported.", 405)
	}
}
