# Node.go

This package contains the implementation of a gRPC server for a Node in a decentralized system.

A Node is defined as a struct with a version string and an implementation of the proto.UnimplementedNodeServer interface.

The struct definition is as follows:

```
type Node struct {
	version string
	proto.UnimplementedNodeServer
}
```


## Functions

### NewNode

This function creates and returns a new instance of the Node struct, with the version field set to "sphere-0.1".

````
func NewNode() *Node {
	return &Node{
		version: "sphere-0.1",
	}
}
````

### Handshake

This function implements the Handshake gRPC method and is used for the Node to exchange its version information with other Nodes in the system.

The function takes a context.Context and a proto.Version as its input parameters, and returns a proto.Version and an error.

The function retrieves the peer information from the context using peer.FromContext. It then constructs a proto.Version struct with the version field set to the version field of the Node struct and the height field set to 100. This struct is then returned as the output of the function.

````
func (n *Node) Handshake(ctx context.Context, v *proto.Version) (*proto.Version, error) {
	ourVersion := &proto.Version{
		Version: n.version,
		Height:  100,
	}

	p, _ := peer.FromContext(ctx)

	fmt.Printf("received version from %s: %+v\n", v, p.Addr)

	return ourVersion, nil
}
````

### HandleTransaction

This function implements the HandleTransaction gRPC method and is used for the Node to receive and process transactions from other Nodes in the system.

The function takes a context.Context and a proto.Transaction as its input parameters, and returns a proto.Ack and an error.

The function retrieves the peer information from the context using peer.FromContext and logs it. The function then returns a proto.Ack struct as the output of the function.

````
func (n *Node) HandleTransaction(ctx context.Context, tx *proto.Transaction) (*proto.Ack, error) {
	peer, _ := peer.FromContext(ctx)
	fmt.Println("received tx from:", peer)
	return &proto.Ack{}, nil
}
````