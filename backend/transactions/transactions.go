package transactions

import (
	"context"
	"time"

	"github.com/TeamSphere/sphere/backend/database"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type SphereTransaction struct {
	ID            string    `json:"id"`
	FromAccountID string    `json:"fromAccountId"`
	ToAccountID   string    `json:"toAccountId"`
	Amount        float64   `json:"amount"`
	CreatedAt     time.Time `json:"createdAt"`
}

func NewSphereTransaction(id string, fromAccountId string, toAccountId string, amount float64) *SphereTransaction {
	return &SphereTransaction{
		ID:            id,
		FromAccountID: fromAccountId,
		ToAccountID:   toAccountId,
		Amount:        amount,
		CreatedAt:     time.Now(),
	}
}

var client, _ = database.ConnectToDB()
var transactionsCollection = client.Database("SphereBank").Collection("transactions")

func (t *SphereTransaction) CreateTransaction() (*mongo.InsertOneResult, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result, err := transactionsCollection.InsertOne(ctx, t)
	if err != nil {
		return nil, err
	}

	return result, nil
}

func GetTransaction(id string) (*SphereTransaction, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var transaction SphereTransaction
	err := transactionsCollection.FindOne(ctx, bson.M{"id": id}).Decode(&transaction)
	if err != nil {
		return nil, err
	}

	return &transaction, nil
}

func (t *SphereTransaction) UpdateTransaction() (*mongo.UpdateResult, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result, err := transactionsCollection.UpdateOne(
		ctx,
		bson.M{"id": t.ID},
		bson.D{
			{"$set", bson.D{{"fromAccountId", t.FromAccountID}, {"toAccountId", t.ToAccountID}, {"amount", t.Amount}}},
		},
	)
	if err != nil {
		return nil, err
	}

	return result, nil
}

func DeleteTransaction(id string) (*mongo.DeleteResult, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result, err := transactionsCollection.DeleteOne(ctx, bson.M{"id": id})
	if err != nil {
		return nil, err
	}

	return result, nil
}
