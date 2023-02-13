package node

import (
	"bytes"
	"encoding/hex"
	"fmt"

	"github.com/TeamSphere/sphere/crypto"
	"github.com/TeamSphere/sphere/proto"
	"github.com/TeamSphere/sphere/types"
)

const godSeed = "1c01f7de816c1104a9ae1816200719091acabac81d5167b972aa055ef9ad509d"

type HeaderList struct {
	headers []*proto.Header
}

func NewHeaderList() *HeaderList {
	return &HeaderList{
		headers: []*proto.Header{},
	}
}
func (list *HeaderList) Add(h *proto.Header) {
	list.headers = append(list.headers, h)
}

func (list *HeaderList) Get(index int) *proto.Header {
	if index > list.Height() {
		panic("index too high!")
	}
	return list.headers[index]
}
func (list *HeaderList) Height() int {
	return list.Len() - 1
}

func (list *HeaderList) Len() int {
	return len(list.headers)
}

type UTXO struct {
	Hash     string
	OutIndex int
	Amount   int64
	Spent    bool
}

type Chain struct {
	txStore    TXStorer
	blockStore BlockStorer
	utxoStore  UTXOStorer
	headers    *HeaderList
}

func NewChain(bs BlockStorer, txStore TXStorer) *Chain {
	chain := &Chain{
		blockStore: bs,
		txStore:    txStore,
		utxoStore:  NewMemoryUTXOStore(),
		headers:    NewHeaderList(),
	}
	chain.addBlock(createGenesisBlock())
	return chain
}

func (c *Chain) Height() int {
	return c.headers.Height()
}

func (c *Chain) AddBlock(b *proto.Block) error {
	if err := c.ValidateBlock(b); err != nil {
		return err
	}
	return c.addBlock(b)
}

func (c *Chain) addBlock(b *proto.Block) error {
	c.headers.Add(b.Header)

	for _, tx := range b.Transactions {
		if err := c.txStore.Put(tx); err != nil {
			return err
		}

		hash := hex.EncodeToString(types.HashTransaction(tx))
		for it, output := range tx.Outputs {
			utxo := &UTXO{
				Hash:     hash,
				Amount:   output.Amount,
				OutIndex: it,
				Spent:    false,
			}
			if err := c.utxoStore.Put(utxo); err != nil {
				return err
			}
		}
	}

	return c.blockStore.Put(b)
}

func (c *Chain) GetBlockByHash(hash []byte) (*proto.Block, error) {
	hashHex := hex.EncodeToString(hash)
	return c.blockStore.Get(hashHex)
}

func (c *Chain) GetBlockByHeight(height int) (*proto.Block, error) {
	if c.Height() < height {
		return nil, fmt.Errorf("given height (%d) too high - height (%d)", height, c.Height())
	}
	header := c.headers.Get(height)
	hash := types.HashHeader(header)
	return c.GetBlockByHash(hash)
}

func (c *Chain) ValidateBlock(b *proto.Block) error {
	// Validate the signature of the block
	if !types.VerifyBlock(b) {
		return fmt.Errorf("invalid block signature")
	}
	// Validate if the prevHash is the actual hash of the current block
	currentBlock, err := c.GetBlockByHeight(c.Height())
	if err != nil {
		return err
	}
	hash := types.HashBlock(currentBlock)
	if !bytes.Equal(hash, b.Header.PrevHash) {
		return fmt.Errorf("invalid previous block hash")
	}

	for _, tx := range b.Transactions {
		if err := c.ValidateTransaction(tx); err != nil {
			return err
		}
	}

	return nil
}

func (c *Chain) ValidateTransaction(tx *proto.Transaction) error {
	if !types.VerifyTransaction(tx) {
		return fmt.Errorf("invalid tx signature")
	}
	var (
		nInputs = len(tx.Inputs)
		hash    = hex.EncodeToString(types.HashTransaction(tx))
	)
	sumInputs := 0
	for i := 0; i < nInputs; i++ {
		prevHash := hex.EncodeToString(tx.Inputs[i].PrevTxHash)
		key := fmt.Sprintf("%s_%d", prevHash, i)
		utxo, err := c.utxoStore.Get(key)
		sumInputs += int(utxo.Amount)
		if err != nil {
			return err
		}
		if utxo.Spent {
			return fmt.Errorf("input %d of tx %s is already spent", i, hash)
		}
	}

	sumOutputs := 0
	for _, output := range tx.Outputs {
		sumOutputs += int(output.Amount)
	}

	if sumInputs < sumOutputs {
		return fmt.Errorf("insufficient balance got (%d) spending (%d)", sumInputs, sumOutputs)
	}

	return nil
}

func createGenesisBlock() *proto.Block {
	privKey := crypto.NewPrivateKeyFromSeedStr(godSeed)

	block := &proto.Block{
		Header: &proto.Header{
			Version: 1,
		},
	}

	tx := &proto.Transaction{
		Version: 1,
		Inputs:  []*proto.TxInput{},
		Outputs: []*proto.TxOutput{
			{
				Amount:  1000,
				Address: privKey.Public().Address().Bytes(),
			},
		},
	}

	block.Transactions = append(block.Transactions, tx)

	types.SignBlock(privKey, block)

	return block
}
