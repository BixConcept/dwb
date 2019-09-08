package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"gitlab.com/3nt3rt41nm3nt-gbr/dwb/db"
	"gitlab.com/3nt3rt41nm3nt-gbr/dwb/structs"
	"gitlab.com/3nt3rt41nm3nt-gbr/dwb/permissions"
)

func Assignment(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("access-control-allow-origin", r.Header.Get("origin"))
	w.Header().Set("access-control-allow-credentials", "true")

	fmt.Printf("\n-*- %s assignment %s -*-\n", r.Method, r.URL.Path)

	switch r.Method {
	case "GET":
		if r.URL.Path == "/assignment/all" {
			getAllAssignments(w, r)
		} else {
			getAssignments(w, r)
		}
	case "POST":
		createAssignments(w, r)
	case "DELETE":
		deleteAssignment(w, r)
	case "OPTIONS":
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, DELETE")
	default:
		if _, ok := mux.Vars(r)["id"]; ok {
			deleteAssignment(w, r)
		}
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
	assignment.AuthorName = user.Username

	err = db.CreateAssignment(assignment)
	if err != nil {
		fmt.Printf("[ - ] error creating assignment: %v\n", err)
		w.WriteHeader(500)
		return
	}

	_ = json.NewEncoder(w).Encode(assignment)
}

func deleteAssignment(w http.ResponseWriter, r *http.Request) {
	sessionCookie, err := r.Cookie("session")
	if err != nil {
		fmt.Printf("[ - ] error retrieving session from req: %v\n", err)
		w.WriteHeader(401)
		return
	}

	session, err := db.GetSession(sessionCookie.Value)
	if err != nil {
		fmt.Printf("[ - ] error retrieving session from db: %v\n", err)
		w.WriteHeader(401)
		return
	}

	fmt.Printf("[ * ] session: %+v\n", session)

	user, err := db.GetUserByID(session.UserID)
	if err != nil {
		fmt.Printf("[ - ] error retrieving user from db: %v\n", err)
		w.WriteHeader(501)
		return
	}
	fmt.Printf("[ * ] user: %+v\n", user)

	authenticated := false
	if !user.IsTeamMember {
		authenticated = true
	} else if user.Permission > permissions.STANDARD_PERMISSION {
		authenticated = true
	}

	fmt.Printf("[ * ] authenticated: %t\n", authenticated)

	if !authenticated {
		w.WriteHeader(401)
		return
	}

	assignmentId, err := getIntFromMuxVars(r, "id")
	if err != nil {
		fmt.Printf("[ - ] error converting assignmentId to int: %v\n", err)
		w.WriteHeader(400)
		return
	}

	err = db.DeleteAssignment(assignmentId)
	if err != nil {
		fmt.Printf("[ - ] error deleting assignment: %v\n", err)
		w.WriteHeader(500)
		return
	}

	fmt.Printf("[ + ] succesfully deleted assignment #%4d from db!!\n", assignmentId)
}

func getAllAssignments(w http.ResponseWriter, r *http.Request) {
	session, err := extractSession(w, r)
	if err != nil {
		fmt.Printf("[ - ] error extractin session: %v\n", err)
		w.WriteHeader(403)
		return
	}

	user, err := db.GetUserByID(session.UserID)
	if err != nil {
		fmt.Printf("[ - ] error retrieving user from db: %v\n", err)
		w.WriteHeader(500)
		return
	}

	if user.Permission < permissions.ADMIN_PERMISSION {
		fmt.Printf("[ - ] permission denied.\n")
		w.WriteHeader(403)
		return
	}

	assignments, err := db.GetAllAssignments()
	if err != nil {
		fmt.Printf("[ - ] error retrieving all assignments from db: %v\n", err)
		w.WriteHeader(500)
		return
	}

	_ = json.NewEncoder(w).Encode(assignments)
}
