package handlers

import (
	"encoding/json"
	"fmt"
	"git.3nt3.de/3nt3/dwb/db"
	"git.3nt3.de/3nt3/dwb/structs"
	"net/http"
)

func Team(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("access-control-allow-origin", r.Header.Get("origin"))

	fmt.Printf("\n-*- %s %s -*-\n", r.Method, r.URL.Path)

	switch r.Method {
	case "POST":
		createTeam(w, r)
	}
}

func createTeam(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("-*- createTeam -*-\n")

	sessionCookie, err := r.Cookie("session")
	if err != nil {
		fmt.Printf("[ - ] error extracting session cookie: %v\n", err)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	fmt.Printf("[ * ] session cookie: %+v\n", sessionCookie)

	session, err := db.GetSession(sessionCookie.Value)
	if err != nil {
		fmt.Printf("[ * ] error retrieving session from database: %v\n", err)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	fmt.Printf("[ * ] session: %+v\n", session)

	user, err := db.GetUserByID(session.UserID)
	if err != nil {
		fmt.Printf("[ - ] error retrieving user from database: %v\n", err)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	fmt.Printf("[ * ] user: %+v\n", user)

	rawTeam := structs.Team{}
	err = json.NewDecoder(r.Body).Decode(&rawTeam)
	if err != nil {
		fmt.Printf("[ - ] error decoding team: %v\n", err)
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	rawTeam.Owner = user.ID
	fmt.Printf("[ * ] raw team: %+v\n", rawTeam)

	team, err := db.CreateTeam(rawTeam)
	if err != nil {
		fmt.Printf("[ - ] error creating team: %v\n", err)
		w.WriteHeader(500)
		return
	}
	fmt.Printf("[ * ] team: %+v\n", team)
	
	_ = json.NewEncoder(w).Encode(team)

}
