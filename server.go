package main

import (
	"net/http"
)

func main() {
	// Define the directory to serve HTML files from
	http.Handle("/", http.FileServer(http.Dir(".")))

	// Start the HTTP server on port 8080
	http.ListenAndServe(":8080", nil)
}
