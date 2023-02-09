# Keys.go

# Package crypto

This package provides functions and data structures to generate and use Ed25519 cryptographic keys and signatures.

## Imports

The following packages are imported:

"crypto/ed25519"
"crypto/rand"
"io"

shell
Copy code

## Constants

const (
privKeyLen = 64
pubKeyLen = 32
seedLen = 32
addressLen = 20
)

shell
Copy code

## Data Structures

### PrivateKey

type PrivateKey struct {
key ed25519.PrivateKey
}

css
Copy code

#### func (p *PublicKey) Address() Address

Returns the address derived from the public key.

func (p *PublicKey) Address() Address {
return Address {
value: p.key(len(p.key)-addressLen)
}
}

go
Copy code

#### func GeneratePrivateKey() *PrivateKey

Generates a new private key.

func GeneratePrivateKey() *PrivateKey {
seed := make([]byte, seedLen)
_, err := io.ReadFull(rand.Reader, seed)
if err != nil {
panic(err)
}
return &PrivateKey{
key: ed25519.NewKeyFromSeed(seed),
}
}

scss
Copy code

#### func (p *PrivateKey) Bytes() []byte

Returns the bytes of the private key.

func (p *PrivateKey) Bytes() []byte {
return p.key
}

vbnet
Copy code

#### func (p *PrivateKey) Sign(msg []byte) *Signature

Signs the given message with the private key and returns the signature.

func (p *PrivateKey) Sign(msg []byte) *Signature {
return &Signature{
value: ed25519.Sign(p.key, msg),
}
}


#### func (p *PrivateKey) Public() *PublicKey

Returns the public key derived from the private key.

func (p *PrivateKey) Public() *PublicKey {
b := make([]byte, pubKeyLen)
copy(b, p.key[32:])

return &PublicKey{
	key: b,
}
}

### PublicKey

type PublicKey struct {
key ed25519.PublicKey
}

#### func (p *PublicKey) Bytes() []byte

Returns the bytes of the public key.

func (p *PublicKey) Bytes() []byte {
return p.key
}

### Signature

type Signature struct {
value []byte
}

#### func (s *Signature) Bytes() []byte

Returns the bytes of the signature.

func (s *Signature) Bytes() []byte {
return s.value
}


#### func (s *Signature) Verify(pubKey *PublicKey, msg []byte) bool

Verifies the signature with the given public key and message. Returns `true