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

func getAssignments(w http.ResponseWriter, r *http.Request) {
	sessionCookie, err := r.Cookie("session")
	if err != nil {
		fmt.Printf("[ - ] error extracting session: %v\n", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	fmt.Printf("[ * ] session cookie: %+v\n", sessionCookie)

	session, err := db.GetSession(sessionCookie.Value)
	if err != nil {
		fmt.Printf("[ - ] error retrieving session from db: %v\n", err)
		w.WriteHeader(400)
		return
	}
	fmt.Printf("[ * ] session: %+v\n", session)

	user, err := db.GetUserByID(session.UserID)
	if err != nil {
		fmt.Printf("[ - ] error retrieving user from db: %v\n", err)
		w.WriteHeader(400)
		return
	}
	fmt.Printf("[ * ] user: %+v\n", user)

	assignments := []structs.Assignment{}
	if !user.IsTeamMember {
		assignments, err = db.GetAssignmentsByOwner(user.ID)
	} else {
		assignments, err = db.GetAssignmentsByTeam(user.Team)
	}

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

	sessionCookie, err := r.Cookie("session")
	if err != nil {
		fmt.Printf("[ - ] error extracting session: %v\n", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	fmt.Printf("[ * ] session cookie: %+v\n", sessionCookie)

	session, err := db.GetSession(sessionCookie.Value)
	if err != nil {
		fmt.Printf("[ - ] error retrieving session from db: %v\n", err)
		w.WriteHeader(400)
		return
	}
	fmt.Printf("[ * ] session: %+v\n", session)

	user, err := db.GetUserByID(session.UserID)
	if err != nil {
		fmt.Printf("[ - ] error retrieving user from db: %v\n", err)
		w.WriteHeader(400)
		return
	}
	fmt.Printf("[ * ] user: %+v\n", user)

	assignment.Author = user.ID

	err = db.CreateAssignments(assignment)
	if err != nil {
		fmt.Printf("[ - ] error creating assignment: %v\n", err)
		w.WriteHeader(500)
		return
	}

	_ = json.NewEncoder(w).Encode(assignment)
}
