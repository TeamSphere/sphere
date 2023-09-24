package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os/exec"
)

type GeneratedCodeResponse struct {
	GeneratedCode string `json:"generatedCode"`
}

func generateCode(w http.ResponseWriter, r *http.Request) {
	cmd := exec.Command("python3", "autogpt.py") // Assuming Python3 is installed
	out, err := cmd.Output()
	if err != nil {
		log.Println("Error generating code:", err)
		http.Error(w, "Failed to generate code", http.StatusInternalServerError)
		return
	}

	response := GeneratedCodeResponse{
		GeneratedCode: string(out),
	}

	json.NewEncoder(w).Encode(response)
}

func main() {
	http.HandleFunc("/api/generate-code", generateCode)
	log.Println("Server listening on port 5000...")
	http.ListenAndServe(":5000", nil)
}
