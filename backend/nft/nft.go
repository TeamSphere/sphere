package nft

import "fmt"

type NFT struct {
	ID          int
	UserID      int
	Name        string
	Description string
	ImageURL    string
}

var nfts []*NFT

func CreateNFT(userID int, name, description, imageURL string) (*NFT, error) {
	newNFT := &NFT{
		ID:          len(nfts) + 1,
		UserID:      userID,
		Name:        name,
		Description: description,
		ImageURL:    imageURL,
	}

	nfts = append(nfts, newNFT)
	return newNFT, nil
}

func GetNFT(nftID int) (*NFT, error) {
	for _, nft := range nfts {
		if nft.ID == nftID {
			return nft, nil
		}
	}

	return nil, fmt.Errorf("NFT not found")
}

func ListNFTs() ([]*NFT, error) {
	return nfts, nil
}
