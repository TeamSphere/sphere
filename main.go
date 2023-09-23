package main

import (
	"log"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/openai/openai-go/v1"
)

// Initialize the OpenAI GPT-3.5 client
var client *openai.Client

func main() {
	// Initialize the GPT-3.5 client with your API key
	client = openai.NewClient("<YOUR_API_KEY>")

	// Initialize the Gin router
	router := gin.Default()

	// Define a route to handle POST requests to the requirement-to-user-stories endpoint
	router.POST("/generate-user-stories", generateUserStories)

	// Run the server
	log.Fatal(router.Run(":8080"))
}

// RequestPayload represents the JSON payload for the generate-user-stories endpoint
type RequestPayload struct {
	Requirement string `json:"requirement"`
}

// ResponsePayload represents the JSON payload for the generate-user-stories endpoint response
type ResponsePayload struct {
	UserStories string `json:"user_stories"`
}

// generateUserStories is the handler function for the generate-user-stories endpoint
func generateUserStories(c *gin.Context) {
	// Parse the request payload
	var reqPayload RequestPayload
	if err := c.ShouldBindJSON(&reqPayload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request payload"})
		return
	}

	// Generate user stories using the GPT-3.5 model
	userStories, err := generateUserStoriesFromRequirement(reqPayload.Requirement)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to generate user stories"})
		return
	}

	// Create the response payload
	resPayload := ResponsePayload{
		UserStories: userStories,
	}

	// Send the response
	c.JSON(http.StatusOK, resPayload)
}

// generateUserStoriesFromRequirement generates user stories using the GPT-3.5 model
func generateUserStoriesFromRequirement(requirement string) (string, error) {
	// Set up the prompt for the GPT-3.5 model
	prompt := "MetaGPT: The Multi-Agent Framework\n\nInput: " + requirement + "\nOutput:"

	// Generate user stories using the GPT-3.5 model
	resp, err := client.Completions.CreateCompletion(
		&openai.CreateCompletionRequest{
			Model:            "text-davinci-003", // Update with the appropriate GPT-3.5 model variant
			Prompt:           &prompt,
			MaxTokens:        100,
			Temperature:      0.7,
			StopSequences:    []string{"\n"},
			StopSequences2:   []string{"."},
			N:                1,
			TopP:             1,
			PresencePenalty:  0.6,
			FrequencyPenalty: 0.0,
		},
	)
	if err != nil {
		return "", err
	}

	// Extract the generated user stories from the GPT-3.5 model response
	userStories := strings.TrimSpace(resp.Choices[0].Text)

	return userStories, nil
}
