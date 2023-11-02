package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/TeamSphere/sphere/backend/accounts"
)

var dummyAccounts = map[string]*accounts.SphereAccount{
	"1": accounts.NewSphereAccount("1", "Joe"),
	"2": accounts.NewSphereAccount("2", "Alice"),
}

func SphereAccountHandler(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		accountID := r.URL.Query().Get("id")
		account, exists := dummyAccounts[accountID]
		if !exists {
			http.Error(w, "Account not found", 404)
			return
		}
		json.NewEncoder(w).Encode(account)
	case "POST":
		newAccount := accounts.NewSphereAccount("3", "Bob")
		dummyAccounts["3"] = newAccount
		json.NewEncoder(w).Encode(newAccount)
	default:
		http.Error(w, "Invalid method. Only GET and POST are supported.", 405)
	}
}
