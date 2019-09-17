package handlers

import "net/http"


// Contact handles all requests to contact endpoint
func Contact(w http.ResponseWriter, r *http.Request) {
	
	createMessage(w,r)

}

func createMessage(w http.ResponseWriter, r *http.Request) {
	
}