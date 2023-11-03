package database

import (
	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	Username string `bson:"username"`
	Password string `bson:"password"` // this will be the hashed password
}

func AddUser(username, password string) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}

	collection := client.Database("Sphere").Collection("Users")
	user := &User{
		Username: username,
		Password: string(hashedPassword),
	}
	_, err = collection.InsertOne(ctx, user)
	if err != nil {
		return err
	}

	return nil
}

func ValidateUser(username, password string) bool {
	collection := client.Database("Sphere").Collection("Users")

	var user User
	err := collection.FindOne(ctx, bson.M{"username": username}).Decode(&user)
	if err != nil {
		return false
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	return err == nil
}
