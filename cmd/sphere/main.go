package main

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"
)

func main() {
	var sphereCmd = &cobra.Command{
		Use:   "sphere",
		Short: "The Sphere Blockchain CLI",
		Run: func(cmd *cobra.Command, args []string) {
		},
	}

	err := sphereCmd.Execute()
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}
