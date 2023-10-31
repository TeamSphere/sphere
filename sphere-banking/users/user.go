package users

import "sync"

type User struct {
	ID         string
	Coins      uint64
	Investment uint64
}

var Users sync.Map

func CreateUser(id string) {
	Users.Store(id, &User{
		ID:    id,
		Coins: 0,
	})
}
