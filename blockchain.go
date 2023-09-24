package main

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"time"
)

type Block struct {
	Index     int64
	Timestamp time.Time
	Data      string
	PrevHash  string
	Hash      string
}

func (b *Block) calculateHash() {
	hashData := fmt.Sprintf("%d%s%s%s", b.Index, b.Timestamp.String(), b.Data, b.PrevHash)

	hash := sha256.Sum256([]byte(hashData))
	b.Hash = hex.EncodeToString(hash[:])
}

func generateBlock(prevBlock *Block, data string) *Block {
	newBlock := &Block{
		Index:     prevBlock.Index + 1,
		Timestamp: time.Now(),
		Data:      data,
		PrevHash:  prevBlock.Hash,
		Hash:      "",
	}
	newBlock.calculateHash()
	return newBlock
}

func initializeBlockchain() []*Block {
	genesisBlock := &Block{
		Index:     0,
		Timestamp: time.Now(),
		Data:      "Genesis Block",
		PrevHash:  "",
		Hash:      "",
	}
	genesisBlock.calculateHash()
	return []*Block{genesisBlock}
}

func addBlockToBlockchain(blockchain []*Block, data string) []*Block {
	prevBlock := blockchain[len(blockchain)-1]
	newBlock := generateBlock(prevBlock, data)
	return append(blockchain, newBlock)
}

func main() {
	blockchain := initializeBlockchain()
	blockchain = addBlockToBlockchain(blockchain, "Data 1")
	blockchain = addBlockToBlockchain(blockchain, "Data 2")

	for _, block := range blockchain {
		fmt.Printf("Index: %d\n", block.Index)
		fmt.Printf("Timestamp: %s\n", block.Timestamp.String())
		fmt.Printf("Data: %s\n", block.Data)
		fmt.Printf("PrevHash: %s\n", block.PrevHash)
		fmt.Printf("Hash: %s\n\n", block.Hash)
	}
}
