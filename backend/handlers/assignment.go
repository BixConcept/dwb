package handlers

import (
	"encoding/json"
	"fmt"
	"git.3nt3.de/3nt3/dwb/db"
	"git.3nt3.de/3nt3/dwb/structs"
	"net/http"
)

func Assignment(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("access-control-allow-origin", r.Header.Get("origin"))
	w.Header().Set("access-control-allow-credentials", "true")

	fmt.Printf("\n-*- %s assignment %s -*-\n", r.Method, r.URL.Path)

	switch r.Method {
	case "GET":
		getAssignments(w, r)
	case "POST":
		createAssignments(w, r)
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}

}

func getAssignments(w http.ResponseWriter, _ *http.Request) {

	assignments, err := db.GetAssignments()
	if err != nil {
		fmt.Printf("[ - ] error fetching assignments: %v\n", err)
		return
	}

	fmt.Printf("[ * ] assignments: %v\n", assignments)

	err = json.NewEncoder(w).Encode(assignments)
	if err != nil {
		fmt.Printf("[ - ] error: %v\n", err)
		w.WriteHeader(500)
		return
	}

}

func createAssignments(w http.ResponseWriter, r *http.Request) {
	assignment := structs.Assignment{}
	err := json.NewDecoder(r.Body).Decode(&assignment)

	if err != nil {
		fmt.Printf("[ - ] error decoding json: %s \n", err.Error())
		w.WriteHeader(500)
		return
	}
	fmt.Printf("[ * ] assignment: %+v\n", assignment)

	err = db.CreateAssignments(assignment)
	if err != nil {
		fmt.Printf("[ - ] error creating assignment: %v\n", err)
		w.WriteHeader(500)
		return
	}
}
