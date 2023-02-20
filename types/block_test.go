package types

import (
	"testing"

	"github.com/TeamSphere/sphere/crypto"
	"github.com/TeamSphere/sphere/proto"
	"github.com/TeamSphere/sphere/utils"
	"github.com/stretchr/testify/assert"
)

func TestCalculateRootHash(t *testing.T) {
	var (
		privKey = crypto.GeneratePrivateKey()
		block   = utils.RandomBlock()
		tx      = &proto.Transaction{
			Version: 1,
		}
	)

	block.Transactions = append(block.Transactions, tx)
	SignBlock(privKey, block)
	assert.True(t, VerifyRootHash(block))
	assert.Equal(t, 32, len(block.Header.RootHash))

}

func TestSignVerifyBlock(t *testing.T) {
	var (
		block   = utils.RandomBlock()
		privKey = crypto.GeneratePrivateKey()
		pubKey  = privKey.Public()
	)

	sig := SignBlock(privKey, block)
	assert.Equal(t, 64, len(sig.Bytes()))
	assert.True(t, sig.Verify(pubKey, HashBlock(block)))

	assert.Equal(t, block.PublicKey, pubKey.Bytes())
	assert.Equal(t, block.Signature, sig.Bytes())
	assert.True(t, VerifyBlock(block))

	invalidPrivKey := crypto.GeneratePrivateKey()
	block.PublicKey = invalidPrivKey.Public().Bytes()
	assert.False(t, VerifyBlock(block))
}

func TestHashBlock(t *testing.T) {
	block := utils.RandomBlock()
	hash := HashBlock(block)
	assert.Equal(t, 32, len(hash))
}
