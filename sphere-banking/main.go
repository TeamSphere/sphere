package main

import (
	"sphere-banking/blockchain"
	"sphere-banking/transactions"
	"sphere-banking/users"
	"time"
)

func main() {
	t := time.Now()
	genesisBlock := blockchain.Block{0, t.String(), 0, "", ""}
	genesisBlock.Hash = blockchain.CalculateHash(genesisBlock)
	blockchain.Blockchain = append(blockchain.Blockchain, genesisBlock)

	users.CreateUser("user1")
	users.CreateUser("user2")

	// Let's give user1 some coins
	user1, _ := users.Users.Load("user1")
	user1.(*users.User).Coins = 100

	transactions.CreateTransaction("tx1", "user1", "user2", 10)
}
