package api

import (
	"github.com/labstack/echo/v4"
)

func RegisterRoutes(e *echo.Echo) {
	e.POST("/proposals", CreateProposalHandler)
	e.POST("/proposals/:id/vote", VoteOnProposalHandler)
	e.GET("/proposals/:id", GetProposalHandler)
	e.GET("/proposals", ListProposalsHandler)

	e.POST("/pools", CreatePoolHandler)
	e.GET("/pools/:id", GetPoolHandler)
	e.GET("/pools", ListPoolsHandler)

	// DEX routes
	e.POST("/users/:userID/orders", CreateOrderHandler)
	e.GET("/orders/:orderID", GetOrderHandler)
	e.GET("/orders", ListOrdersHandler)

	// Liquidity routes
	e.POST("/users/:userID/liquidity", AddLiquidityHandler)
	e.GET("/users/:userID/liquidity", GetUserLiquidityPositionsHandler)

	// NFT routes
	e.POST("/users/:userID/nfts", CreateNFTHandler)
	e.GET("/nfts/:nftID", GetNFTHandler)
	e.GET("/nfts", ListNFTsHandler)
}
