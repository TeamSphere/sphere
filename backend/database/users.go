package database

import (
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	Username string
	Password string // this will be the hashed password
}

var users = map[string]*User{}

func AddUser(username, password string) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	users[username] = &User{
		Username: username,
		Password: string(hashedPassword),
	}

	return nil
}

func ValidateUser(username, password string) bool {
	user, exists := users[username]
	if !exists {
		return false
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	return err == nil
}
