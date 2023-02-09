# Transaction.go

The types package contains helper functions for working with transactions in the Sphere blockchain.

## Functions

### SignTransaction

SignTransaction function signs a given Transaction using the provided private key. It returns the signature for the transaction.

### HashTransaction

HashTransaction function takes a Transaction as input and returns the hash of the transaction. The function uses Protocol Buffers to marshal the transaction into bytes, and then calculates the SHA-256 hash of the bytes.

### VerifyTransaction

VerifyTransaction function verifies that all the inputs in a Transaction are signed with a valid signature. It takes a Transaction as input, and returns true if all signatures are valid, and false otherwise. For each input, it extracts the public key from the input, and then verifies the signature using the Verify method of the crypto.Signature type.