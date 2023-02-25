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

	sphereCmd.AddCommand(versionCmd)

	err := tbbCmd.Execute()
	if err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}

func incorrectUsageErr() error {
	return fmt.Errorf("incorrect usage")
}
