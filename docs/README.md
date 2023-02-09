# Sphere Monorepo

The Sphere is a blockchain-based platform that uses gRPC and Protocol Buffers for communication between nodes. It uses the Sphere protocol to implement the basic functionalities of a blockchain network.

At the core of the platform is the Node struct, which represents a single node in the network. The Node struct implements the proto.NodeServer interface, which defines the Handshake and HandleTransaction methods. The Handshake method is called when another node connects to this node and sends its version information. The HandleTransaction method is called when another node sends a transaction to this node.

The platform also has a util package that provides helper functions for creating random hashes and blocks. The RandomHash function generates a random 32-byte hash using the crypto/rand package. The RandomBlock function creates a block with random header information, including the version, height, previous hash, root hash, and timestamp.

The types package provides functions for signing and verifying transactions, as well as calculating the hash of a transaction. The SignTransaction function signs a transaction using the given private key, and the HashTransaction function calculates the SHA-256 hash of the protobuf representation of a transaction. The VerifyTransaction function verifies the signatures of all inputs in a transaction to ensure that the transaction is valid.

In summary, The Sphere is a blockchain platform that provides basic functionalities for nodes to communicate and process transactions. It uses the Sphere protocol, gRPC, and Protocol Buffers for communication, and includes helper functions for generating random hashes and blocks, as well as signing and verifying transactions.

[View the code specification](code-spec/README.md)

# Features

## Decentralized Exchange (DEX)

Sphere's DEX is a non-custodial exchange that allows users to trade cryptocurrencies and other digital assets without having to entrust their funds to a centralized party. The DEX uses smart contracts to automate the matching and settlement of trades, making it possible to trade in a trustless and secure manner.

## NFT Marketplace

Sphere's NFT marketplace is a platform for buying, selling, and trading non-fungible tokens (NFTs). NFTs are unique digital assets that represent ownership of a specific item or piece of content, such as an in-game item or a collectible. The marketplace uses smart contracts to handle transactions and enforce ownership rules, allowing users to trade NFTs in a secure and transparent manner.

## Getting Started

To get started with the Sphere monorepo, you'll need to have a local development environment set up. You'll need Node.js, npm, and a code editor like Visual Studio Code installed on your computer.

1. Clone the repository:

> git clone https://github.com/TeamSphere/sphere/

2. Install the dependencies:

> cd sphere

> npm install

3. Start the development server:

> npm run start

This will start a local development server that you can use to test and debug the application.

## Contributions

We welcome contributions to the Sphere monorepo! If you'd like to contribute, please follow our [contributor guidelines](CONTRIBUTING.md) and submit a pull request.

## License

Sphere is open source software licensed under the [MIT license](LICENSE).

