package dex

import "fmt"

type Order struct {
	ID        int
	UserID    int
	Pair      string
	OrderType string
	Price     float64
	Amount    float64
	Filled    float64
	Status    string
}

var orders []*Order

func CreateOrder(userID int, pair, orderType string, price, amount float64) (*Order, error) {
	newOrder := &Order{
		ID:        len(orders) + 1,
		UserID:    userID,
		Pair:      pair,
		OrderType: orderType,
		Price:     price,
		Amount:    amount,
		Filled:    0,
		Status:    "open",
	}

	orders = append(orders, newOrder)
	return newOrder, nil
}

func GetOrder(orderID int) (*Order, error) {
	for _, order := range orders {
		if order.ID == orderID {
			return order, nil
		}
	}

	return nil, fmt.Errorf("Order not found")
}

func ListOrders() ([]*Order, error) {
	return orders, nil
}
