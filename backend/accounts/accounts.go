package accounts

import (
	"context"
	"fmt"
	"time"

	"github.com/TeamSphere/sphere/backend/database"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type SphereAccount struct {
	ID        string  `json:"id"`
	OwnerName string  `json:"ownerName"`
	Balance   float64 `json:"balance"`
}

func NewSphereAccount(id string, ownerName string) *SphereAccount {
	return &SphereAccount{
		ID:        id,
		OwnerName: ownerName,
		Balance:   0,
	}
}

func (a *SphereAccount) Deposit(amount float64) {
	a.Balance += amount
}

func (a *SphereAccount) Withdraw(amount float64) error {
	if a.Balance < amount {
		return fmt.Errorf("Insufficient balance")
	}

	a.Balance -= amount
	return nil
}

var client, _ = database.ConnectToDB()
var accountsCollection = client.Database("SphereBank").Collection("accounts")

func (a *SphereAccount) CreateAccount() (*mongo.InsertOneResult, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result, err := accountsCollection.InsertOne(ctx, a)
	if err != nil {
		return nil, err
	}

	return result, nil
}

func GetAccount(id string) (*SphereAccount, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var account SphereAccount
	err := accountsCollection.FindOne(ctx, bson.M{"id": id}).Decode(&account)
	if err != nil {
		return nil, err
	}

	return &account, nil
}

func (a *SphereAccount) UpdateAccount() (*mongo.UpdateResult, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result, err := accountsCollection.UpdateOne(
		ctx,
		bson.M{"id": a.ID},
		bson.D{
			{"$set", bson.D{{"ownerName", a.OwnerName}, {"balance", a.Balance}}},
		},
	)
	if err != nil {
		return nil, err
	}

	return result, nil
}

func DeleteAccount(id string) (*mongo.DeleteResult, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result, err := accountsCollection.DeleteOne(ctx, bson.M{"id": id})
	if err != nil {
		return nil, err
	}

	return result, nil
}
