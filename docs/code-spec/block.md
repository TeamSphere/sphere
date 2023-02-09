# Block.go

## Package Types

This package contains functions for working with blocks in the Sphere system.

## Import

The package imports the following dependencies:

crypto/sha256 for computing the SHA256 hash of a block
github.com/TeamSphere/sphere/crypto for handling private keys and signatures

github.com/TeamSphere/sphere/proto for working with the block protobuf definition

github.com/golang/protobuf/proto for marshaling and unmarshaling protobuf messages

## Functions

### SignBlock

This function signs a given block using the provided private key. It does this by first computing the hash of the block and then signing the hash with the private key.

#### Input

A private key pk of type *crypto.PrivateKey

A block b of type *proto.Block

#### Output

A signature of type *crypto.Signature

### HashBlock

This function computes the SHA256 hash of the header of a given block. It first marshals the block to a byte slice and then computes the hash of the resulting byte slice.

#### Input

A block block of type *proto.Block

#### Output

A byte slice representing the hash of the header of the block