package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"gitlab.com/3nt3rt41nm3nt-gbr/dwb/contact"
	"gitlab.com/3nt3rt41nm3nt-gbr/dwb/structs"
)

// Contact handles all requests to contact endpoint
func Contact(w http.ResponseWriter, r *http.Request) {
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

	err = contact.CreateMessage(message)
	if err != nil {
		fmt.Printf("[ - ] error sending message: %v\n", err)
		w.WriteHeader(500)
		return
	}

	fmt.Printf("[ + ] successfully sent message.\n")
}
