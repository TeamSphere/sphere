package transactions

import (
	"fmt"
	"sphere-banking/users"
	"sync"
	"time"
)

type Transaction struct {
	ID        string
	UserFrom  string
	UserTo    string
	Amount    uint64
	Timestamp time.Time
}

var Transactions sync.Map

func CreateTransaction(id string, from string, to string, amount uint64) {
	userFrom, _ := users.Users.Load(from)
	userTo, _ := users.Users.Load(to)

	if userFrom == nil || userTo == nil {
		fmt.Println("Either the sender or receiver does not exist.")
		return
	}

	if userFrom.(*users.User).Coins < amount {
		fmt.Println("The sender does not have enough coins.")
		return
	}

	userFrom.(*users.User).Coins -= amount
	userTo.(*users.User).Coins += amount

	Transactions.Store(id, &Transaction{
		ID:        id,
		UserFrom:  from,
		UserTo:    to,
		Amount:    amount,
		Timestamp: time.Now(),
	})
}
