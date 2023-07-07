package liquidity

import "fmt"

type LiquidityPosition struct {
	ID           int
	UserID       int
	PoolID       int
	AmountTokenA float64
	AmountTokenB float64
	LPtokens     float64
}

var liquidityPositions []*LiquidityPosition

func AddLiquidity(userID, poolID int, amountTokenA, amountTokenB, lpTokens float64) (*LiquidityPosition, error) {
	newPosition := &LiquidityPosition{
		ID:           len(liquidityPositions) + 1,
		UserID:       userID,
		PoolID:       poolID,
		AmountTokenA: amountTokenA,
		AmountTokenB: amountTokenB,
		LPtokens:     lpTokens,
	}

	liquidityPositions = append(liquidityPositions, newPosition)
	return newPosition, nil
}

func GetUserLiquidityPositions(userID int) ([]*LiquidityPosition, error) {
	userPositions := make([]*LiquidityPosition, 0)

	for _, position := range liquidityPositions {
		if position.UserID == userID {
			userPositions = append(userPositions, position)
		}
	}

	if len(userPositions) == 0 {
		return nil, fmt.Errorf("No liquidity positions found for user")
	}

	return userPositions, nil
}
