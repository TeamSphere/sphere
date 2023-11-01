package handlers

import (
	"fmt"
	"net/http"
)

func SphereAccountHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		fmt.Fprintf(w, "GET method requested. Returning account details.")
	case "POST":
		fmt.Fprintf(w, "POST method requested. Creating new account.")
	default:
		http.Error(w, "Invalid method. Only GET and POST are supported.", 405)
	}
}
