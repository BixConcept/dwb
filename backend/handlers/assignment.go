package handlers

import (
	"encoding/json"
	"fmt"
	"git.3nt3.de/3nt3/dwb/db"
	"net/http"
)

func Assignment(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("access-control-allow-origin", r.Header.Get("origin"))

	switch r.Method {
	case "GET":
		getAssignments(w, r)
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}

}

func getAssignments(w http.ResponseWriter, _ *http.Request) {
	fmt.Printf("--- getAssignments request ---\n")

	assignments, err := db.GetAssignments()
	if err != nil {
		fmt.Printf("[ - ] error fetching assignments: %v\n", err)
		return
	}

	_ = json.NewEncoder(w).Encode(assignments)

}
