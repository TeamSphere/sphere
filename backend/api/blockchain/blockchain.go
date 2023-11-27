package blockchain

import (
	"encoding/json"
	"net/http"
	"sync"
	"time"
)

type User struct {
	UserID   string
	Accounts []Account
}

type Account struct {
	AccountID string
	UserID    string
	Stacks    []Stack
	Offhand   Stack
}

type Stack struct {
	StackID string
	Coins   []Coin
}

type Coin struct {
	CoinID   string
	CoinType string
}

type Transaction struct {
	FromUserID    string
	FromAccountID string
	FromStackID   string
	ToUserID      string
	ToAccountID   string
	ToStackID     string
	CoinID        string
	CoinType      string
	Amount        int
}

type Block struct {
	BlockID           string
	Timestamp         time.Time
	Transactions      []Transaction
	PreviousBlockHash string
	Hash              string
}

var (
	blockchain []Block
	mux        sync.Mutex
)

func CreateBlockHandler(w http.ResponseWriter, r *http.Request) {
	// Parse the request body to get the transactions
	var transactions []Transaction
	err := json.NewDecoder(r.Body).Decode(&transactions)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Create a new block with the transactions
	block := Block{
		BlockID:      "{new_block_id}", // Generate a new block ID
		Timestamp:    time.Now(),
		Transactions: transactions,
		// Compute the previous block hash and the current block hash
		// For simplicity, I'm leaving these as empty strings in this example
		PreviousBlockHash: "{previous_block_hash}",
		Hash:              "{current_block_hash}",
	}

	// Add the block to the blockchain
	mux.Lock()
	blockchain = append(blockchain, block)
	mux.Unlock()

	// Send the new block as the response
	json.NewEncoder(w).Encode(block)
}

func GetBlockchainHandler(w http.ResponseWriter, r *http.Request) {
	// Send the entire blockchain as the response
	mux.Lock()
	json.NewEncoder(w).Encode(blockchain)
	mux.Unlock()
}
