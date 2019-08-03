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
	w.Header().Set("access-control-allow-credentials", "true")

	fmt.Printf("\n-*- %s %s -*-\n", r.Method, r.URL.Path)

	switch r.Method {
	case "POST":
		createTeam(w, r)
	case "GET":
		getTeam(w, r)
	}
}

func getTeam(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("-*- getTeam -*-\n")

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

	if !user.IsTeamMember {
		fmt.Printf("[ - ] user is not even member of a team!\n")
		w.WriteHeader(500)
		return
	}

	team, err := db.GetTeamByID(user.Team)
	if err != nil {
		fmt.Printf("[ - ] error retrieving team: %v\n", err)
		w.WriteHeader(404)
		return
	}
	fmt.Printf("[ * ] team: %+v\n", team)

	members, err := db.GetTeamMembers(team.ID)
	if err != nil {
		fmt.Printf("[ - ] error retrieving members: %v\n", err)
		return
	}

	_ = json.NewEncoder(w).Encode(map[string]interface{}{
		"team":    team,
		"members": members,
	})
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

func addMember(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("-*- addMember -*-\n")

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

	if team.Owner != user.ID {
		fmt.Printf("[ - ] this guy is not allowed to do this kind of action. call the police!!\n")
		w.WriteHeader(401)
		return
	}

	teamUser := structs.User{}
	err = json.NewDecoder(r.Body).Decode(&teamUser)
	if err != nil {
		fmt.Printf("[ - ] error decoding team user: %v\n", err)
		w.WriteHeader(500)
		return
	}

	err = db.AddTeamMember(team.ID, teamUser.ID)
	if err != nil {
		fmt.Printf("[ - ] error adding user to team: %v\n", err)
		w.WriteHeader(500)
		return
	}

}
