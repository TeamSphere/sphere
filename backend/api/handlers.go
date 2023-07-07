package api

import (
	"net/http"
	"strconv"

	"github.com/TeamSphere/sphere/amm"
	"github.com/TeamSphere/sphere/dao"
	"github.com/TeamSphere/sphere/dex"
	"github.com/TeamSphere/sphere/liquidity"
	"github.com/TeamSphere/sphere/nft"
	"github.com/labstack/echo/v4"
)

func CreateProposalHandler(c echo.Context) error {
	title := c.FormValue("title")
	description := c.FormValue("description")

	proposal, err := dao.CreateProposal(title, description)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, proposal)
}

func VoteOnProposalHandler(c echo.Context) error {
	proposalID, _ := strconv.Atoi(c.FormValue("proposal_id"))
	userID, _ := strconv.Atoi(c.FormValue("user_id"))
	choice := c.FormValue("choice")

	err := dao.VoteOnProposal(userID, proposalID, choice)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, "Vote recorded")
}

func GetProposalHandler(c echo.Context) error {
	proposalID, _ := strconv.Atoi(c.Param("id"))

	proposal, err := dao.GetProposal(proposalID)
	if err != nil {
		return c.JSON(http.StatusNotFound, err.Error())
	}

	return c.JSON(http.StatusOK, proposal)
}

func ListProposalsHandler(c echo.Context) error {
	proposals, err := dao.ListProposals()
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, proposals)
}

func CreatePoolHandler(c echo.Context) error {
	tokenA := c.FormValue("token_a")
	tokenB := c.FormValue("token_b")

	pool, err := amm.CreatePool(tokenA, tokenB)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, pool)
}

func GetPoolHandler(c echo.Context) error {
	poolID, _ := strconv.Atoi(c.Param("id"))

	pool, err := amm.GetPool(poolID)
	if err != nil {
		return c.JSON(http.StatusNotFound, err.Error())
	}

	return c.JSON(http.StatusOK, pool)
}

func ListPoolsHandler(c echo.Context) error {
	pools, err := amm.ListPools()
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, pools)
}

// DEX handlers
func CreateOrderHandler(c echo.Context) error {
	userID, _ := strconv.Atoi(c.Param("userID"))
	pair := c.FormValue("pair")
	orderType := c.FormValue("orderType")
	price, _ := strconv.ParseFloat(c.FormValue("price"), 64)
	amount, _ := strconv.ParseFloat(c.FormValue("amount"), 64)

	newOrder, err := dex.CreateOrder(userID, pair, orderType, price, amount)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusCreated, newOrder)
}

func GetOrderHandler(c echo.Context) error {
	orderID, _ := strconv.Atoi(c.Param("orderID"))

	order, err := dex.GetOrder(orderID)
	if err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, order)
}

func ListOrdersHandler(c echo.Context) error {
	orders, err := dex.ListOrders()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, orders)
}

// Liquidity handlers
func AddLiquidityHandler(c echo.Context) error {
	userID, _ := strconv.Atoi(c.Param("userID"))
	poolID, _ := strconv.Atoi(c.FormValue("poolID"))
	amountTokenA, _ := strconv.ParseFloat(c.FormValue("amountTokenA"), 64)
	amountTokenB, _ := strconv.ParseFloat(c.FormValue("amountTokenB"), 64)
	lpTokens, _ := strconv.ParseFloat(c.FormValue("lpTokens"), 64)

	newPosition, err := liquidity.AddLiquidity(userID, poolID, amountTokenA, amountTokenB, lpTokens)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusCreated, newPosition)
}

func GetUserLiquidityPositionsHandler(c echo.Context) error {
	userID, _ := strconv.Atoi(c.Param("userID"))

	positions, err := liquidity.GetUserLiquidityPositions(userID)
	if err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, positions)
}

// NFT handlers
func CreateNFTHandler(c echo.Context) error {
	userID, _ := strconv.Atoi(c.Param("userID"))
	name := c.FormValue("name")
	description := c.FormValue("description")
	imageURL := c.FormValue("imageURL")

	newNFT, err := nft.CreateNFT(userID, name, description, imageURL)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusCreated, newNFT)
}

func GetNFTHandler(c echo.Context) error {
	nftID, _ := strconv.Atoi(c.Param("nftID"))

	foundNFT, err := nft.GetNFT(nftID)
	if err != nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, foundNFT)
}

func ListNFTsHandler(c echo.Context) error {
	allNFTs, err := nft.ListNFTs()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, allNFTs)
}
