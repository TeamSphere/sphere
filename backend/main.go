package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"os"

	"github.com/TeamSphere/sphere/backend/api/account"
	"github.com/TeamSphere/sphere/backend/api/auth"
	"github.com/TeamSphere/sphere/backend/api/blockchain"
	"github.com/rs/cors"
)

type Order struct {
	Price  float64
	Amount float64
}

type OrderBook struct {
	Bids []Order
	Asks []Order
}

type DataGatheringLayer struct {
	APIKey string
}

func (dgl *DataGatheringLayer) GetOrderBookData(symbol string) OrderBook {
	// Placeholder for API communication
	// In a real application this would make a request to the exchange's API and parse the response into an OrderBook

	client := &http.Client{}
	req, err := http.NewRequest("GET", fmt.Sprintf("{exchange_api}/orderbook/%s", symbol), nil)
	if err != nil {
		log.Println(err)
		return OrderBook{} // Return an empty order book if an error occurs
	}

	req.Header.Add("Authorization", fmt.Sprintf("Bearer %s", dgl.APIKey))

	resp, err := client.Do(req)
	if err != nil {
		log.Println(err)
		return OrderBook{} // Return an empty order book if an error occurs
	}

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)

	if err != nil {
		log.Println(err)
		return OrderBook{} // Return an empty order book if an error occurs
	}

	fmt.Println(string(body))

	// For now, just return an empty OrderBook
	return OrderBook{}
}

type SignalGenerationLayer struct {
	Threshold float64
}

func (sgl *SignalGenerationLayer) FindArbitrageOpportunity(orderBooks map[string]OrderBook) {
	for symbol, orderBook := range orderBooks {
		// Check if the spread (difference between the highest bid and the lowest ask) is greater than the threshold
		if len(orderBook.Bids) > 0 && len(orderBook.Asks) > 0 {
			spread := orderBook.Bids[0].Price - orderBook.Asks[0].Price
			if spread > sgl.Threshold {
				fmt.Printf("Arbitrage opportunity found in %s with a spread of %f\n", symbol, spread)
			}
		}
	}
}

type ExecutionLayer struct {
	// Placeholder for the Execution Layer
}

func (el *ExecutionLayer) ExecuteTrade(symbol string, bid Order, ask Order) {
	// In a real application this would make a request to the exchange's API to execute the trade
	fmt.Printf("Executing trade on %s: buying at %f and selling at %f\n", symbol, bid.Price, ask.Price)
}

func main() {
	mux := http.NewServeMux()

	mux.HandleFunc("/api/account", account.Handler)
	mux.HandleFunc("/api/register", auth.RegisterHandler)
	mux.HandleFunc("/api/login", auth.LoginHandler)
	mux.HandleFunc("/api/blockchain/new", blockchain.CreateBlockHandler)
	mux.HandleFunc("/api/blockchain/get", blockchain.GetBlockchainHandler)

	// New APIs
	dgl := DataGatheringLayer{
		APIKey: "{your_api_key}",
	}

	sgl := SignalGenerationLayer{
		Threshold: 0.01,
	}

	el := ExecutionLayer{}

	symbols := []string{"BTC-USD", "ETH-USD", "LTC-USD"}

	for _, symbol := range symbols {
		orderBook := dgl.GetOrderBookData(symbol)
		if len(orderBook.Bids) > 0 && len(orderBook.Asks) > 0 {
			spread := orderBook.Bids[0].Price - orderBook.Asks[0].Price
			if spread > sgl.Threshold {
				el.ExecuteTrade(symbol, orderBook.Bids[0], orderBook.Asks[0])
			}
		}
	}

	// Configure CORS
	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"}, // allow all origins
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE"},
	})

	// Wrap the mux with the cors handler
	handler := c.Handler(mux)

	// Get the port number from the environment so we can run on App Engine
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
		log.Printf("Defaulting to port %s", port)
	}

	// Start the server
	log.Printf("Listening on port %s", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%s", port), handler))
}
