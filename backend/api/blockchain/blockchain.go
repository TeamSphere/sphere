package blockchain

import "time"

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
