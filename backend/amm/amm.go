package amm

import "fmt"

type Pool struct {
	ID       int
	TokenA   string
	TokenB   string
	ReserveA float64
	ReserveB float64
}

type Token struct {
	ID   int
	Name string
}

var pools []*Pool

func CreatePool(tokenA, tokenB string) (*Pool, error) {
	newPool := &Pool{
		ID:     len(pools) + 1,
		TokenA: tokenA,
		TokenB: tokenB,
	}

	pools = append(pools, newPool)
	return newPool, nil
}

func GetPool(poolID int) (*Pool, error) {
	for _, pool := range pools {
		if pool.ID == poolID {
			return pool, nil
		}
	}

	return nil, fmt.Errorf("Pool not found")
}

func ListPools() ([]*Pool, error) {
	return pools, nil
}
