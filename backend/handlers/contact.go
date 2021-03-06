package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"3nt3rt41nmn3nt/dwb/contact"
	"3nt3rt41nmn3nt/dwb/structs"
)

// Contact handles all requests to contact endpoint
func Contact(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("access-control-allow-origin", r.Header.Get("origin"))
	w.Header().Set("access-control-allow-credentials", "true")

	fmt.Printf("\n-*- %s assignment %s -*-\n", r.Method, r.URL.Path)

	createMessage(w, r)
}

func createMessage(w http.ResponseWriter, r *http.Request) {
	message := structs.ContactMessage{}
	err := json.NewDecoder(r.Body).Decode(&message)
	if err != nil {
		fmt.Printf("[ - ] error decoding body: %v\n", err)
		w.WriteHeader(400)
		return
	}

	fmt.Printf("[ * ] message: %+v\n", message)

	err = contact.CreateMessage(message)
	if err != nil {
		fmt.Printf("[ - ] error sending message: '%v'\n", err)
		w.WriteHeader(500)
		return
	}

	fmt.Printf("[ + ] successfully sent message.\n")
}
