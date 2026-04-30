package main

import (
	"fmt"
	"io"
	"net/http"
	"os"
)

func main() {
	savedContents, _ := os.ReadFile("items.json")
	data := string(savedContents)

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "*")
		w.Header().Set("Access-Control-Allow-Headers", "*")
		w.Header().Set("Content-Type", "application/json")

		switch r.Method {
		case "GET":
			fmt.Fprintf(w, data)
		case "POST":
			body, _ := io.ReadAll(r.Body)
			r.Body.Close()
			os.WriteFile("items.json", body, 0644)
			data = string(body)
		case "OPTIONS":

		}

	})

	http.ListenAndServe(":8090", nil)
}
