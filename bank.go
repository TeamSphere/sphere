package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/dgraph-io/badger"
	"github.com/gorilla/mux"
)

type Transaction struct {
	ID     string  `json:"id"`
	From   string  `json:"from"`
	To     string  `json:"to"`
	Amount float64 `json:"amount"`
}

type Blockchain struct {
	chain []Transaction
}

var blockchain Blockchain

func getBalance(reservoir float64) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		params := mux.Vars(r)
		account := params["account"]

		var balance float64
		for _, transaction := range blockchain.chain {
			if transaction.To == account {
				balance += transaction.Amount
			}
			if transaction.From == account {
				balance -= transaction.Amount
			}
		}

		json.NewEncoder(w).Encode(balance)
	}
}

func makeTransaction(reservoir float64, db *badger.DB) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		var transaction Transaction
		err := json.NewDecoder(r.Body).Decode(&transaction)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		if transaction.Amount <= 0 {
			http.Error(w, "Invalid transaction amount", http.StatusBadRequest)
			return
		}

		err = db.Update(func(txn *badger.Txn) error {
			var storedTransaction Transaction
			storedTransactionBytes, err := txn.Get([]byte(transaction.ID))
			if err != nil && err != badger.ErrKeyNotFound {
				return err
			}

			if err == nil {
				err = storedTransactionBytes.Value(func(val []byte) error {
					return json.Unmarshal(val, &storedTransaction)
				})
				if err != nil {
					return err
				}
			}

			if storedTransaction.ID == transaction.ID {
				http.Error(w, "Transaction already exists", http.StatusBadRequest)
				return nil
			}

			isValid := transaction.From == "Reservoir"
			if !isValid {
				for _, t := range blockchain.chain {
					if t.To == transaction.From {
						isValid = true
						break
					}
				}
			}

			if !isValid {
				http.Error(w, "Invalid 'From' account", http.StatusBadRequest)
				return nil
			}

			if transaction.To == "Reservoir" {
				reservoir -= transaction.Amount
				if reservoir < 0 {
					http.Error(w, fmt.Sprintf("Insufficient funds in reservoir. Current balance: %.2f", reservoir+transaction.Amount), http.StatusBadRequest)
					return nil
				}
			}

			err = txn.Set([]byte(transaction.ID), []byte(fmt.Sprintf("%.2f", transaction.Amount)))
			if err != nil {
				return err
			}

			err = json.NewEncoder(w).Encode(transaction)
			if err != nil {
				return err
			}

			blockchain.chain = append(blockchain.chain, transaction)

			return nil
		})

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}

func main() {
	db, err := badger.Open(badger.DefaultOptions("./database"))
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	router := mux.NewRouter()

	reservoir := 314 * 1e15
	blockchain.chain = append(blockchain.chain, Transaction{"genesis", "Reservoir", "Account1", reservoir})

	apiRouter := router.PathPrefix("/api/v1").Subrouter()
	apiRouter.HandleFunc("/balance/{account}", getBalance(reservoir)).Methods("GET")
	apiRouter.HandleFunc("/transaction", makeTransaction(reservoir, db)).Methods("POST")

	log.Fatal(http.ListenAndServe(":8000", router))
}
