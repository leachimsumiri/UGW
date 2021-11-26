package serverlink

// As a reference see:
// https://github.com/supabase-community/postgrest-go

import (
	"fmt"

	"github.com/supabase/postgrest-go"
)

func ServerRun() {

	client := postgrest.NewClient("http://localhost:3000", "", nil)
	if client.ClientError != nil {
		panic(client.ClientError)
	}

	result := client.Rpc("add_them", "", map[string]int{"a": 12, "b": 3})
	if client.ClientError != nil {
		panic(client.ClientError)
	}

	fmt.Println(result)
}
