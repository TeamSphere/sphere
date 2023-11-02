package handlers

import (
	"net/http"
)

func AccountHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello, Account!"))
}
