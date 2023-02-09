# Types.proto

## Proto Package

This package contains the protobuf definitions for a Node in the Sphere system.

### Services

#### Node

This is the main service for the node, it has two RPC methods:

Handshake: takes in a Version message and returns a Version message

HandleTransaction: takes in a Transaction message and returns an Ack message

### Messages

#### Version

This message contains the version and height of a node. It has the following fields:

version: a string representing the version of the node

height: an integer representing the height of the node

#### Ack

This is an empty message that is used to acknowledge receipt of a transaction.

#### None

This is an empty message that is used as a placeholder.

#### Block

This message represents a block in the Sphere system. It has the following fields:

header: a Header message representing the header of the block

transactions: a repeated field of Transaction messages representing the transactions in the block

#### Header

This message represents the header of a block. It has the following fields:

version: an integer representing the version of the header

height: an integer representing the height of the header

prevHash: a byte slice representing the hash of the previous block

rootHash: a byte slice representing the merkle root of the transactions in the block

timestamp: an integer representing the timestamp of the header

#### TxInput

This message represents an input in a transaction. It has the following fields:

PrevTxHash: a byte slice representing the hash of the previous transaction

PrevOutIndex: an integer representing the index of the previous output in the previous transaction

publicKey: a byte slice representing the public key of the input

signature: a byte slice representing the signature of the input

#### TxOutput

This message represents an output in a transaction. It has the following fields:

amount: an integer representing the amount in the output

address: a byte slice representing the address of the output

#### Transaction

This message represents a transaction in the Sphere system. It has the following fields:

version: an integer representing the version of the transaction

inputs: a repeated field of TxInput messages representing the 
inputs in the transaction

outputs: a repeated field of TxOutput messages representing the outputs in the transaction