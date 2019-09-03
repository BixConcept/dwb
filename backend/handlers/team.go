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
		if r.URL.Path == "/team/addMember/" {
			addMember(w, r)
		} else if r.URL.Path == "/team/removeMember" {

		} else {
			createTeam(w, r)
		}

	case "GET":
		getTeam(w, r)
	}
}

func getTeam(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("-*- getTeam -*-\n")

	session, err := extractSession(w, r)
	if err != nil {
		fmt.Printf("[ - ] error extracting session: %v\n", err)
		w.WriteHeader(401)
		return
	}

	user, err := db.GetUserByID(session.UserID)
	if err != nil {
		fmt.Printf("[ - ] error retrieving user from database: %v\n", err)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	fmt.Printf("[ * ] user: %+v\n", user)

	if !user.IsTeamMember {
		fmt.Printf("[ - ] user is not even member of a team!\n")
		w.WriteHeader(http.StatusNoContent)
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
	session, err := extractSession(w, r)
	if err != nil {
		fmt.Printf("[ - ] error extracting session: %v\n", err)
		w.WriteHeader(401)
		return
	}

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

	err = db.AddTeamMember(team.ID, user.ID)
	if err != nil {
		fmt.Printf("[ - ] error adding user to team: %v\n", err)
		w.WriteHeader(500)
		return
	}

	_ = json.NewEncoder(w).Encode(team)

}

func addMember(w http.ResponseWriter, r *http.Request) {
	fmt.Printf("-*- addMember -*-\n")

	session, err := extractSession(w, r)
	if err != nil {
		fmt.Printf("[ - ] error extracting session: %v\n", err)
		w.WriteHeader(401)
		return
	}

	user, err := db.GetUserByID(session.UserID)
	if err != nil {
		fmt.Printf("[ - ] error retrieving user from database: %v\n", err)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	fmt.Printf("[ * ] user: %+v\n", user)

	team, err := db.GetTeamByID(user.Team)
	if err != nil {
		fmt.Printf("[ - ] error retrieving team from db: %v\n", err)
	}

	if user.Permission < db.TEAM_MODERATOR_PERMISSION {
		fmt.Printf("[ - ] this guy is not allowed to do this kind of action. call the police!!\n")
		w.WriteHeader(401)
		return
	}

	teamUsername := ""
	err = json.NewDecoder(r.Body).Decode(&teamUsername)
	if err != nil {
		fmt.Printf("[ - ] error decoding team user: %v\n", err)
		w.WriteHeader(500)
		return
	}

	teamUser, err := db.GetUserByName(teamUsername)
	if err != nil {
		fmt.Printf("[ - ] error retrieving team user from db: %v\n", err)
		w.WriteHeader(404)
		return
	}

	err = db.AddTeamMember(team.ID, teamUser.ID)
	if err != nil {
		fmt.Printf("[ - ] error adding user to team: %v\n", err)
		w.WriteHeader(500)
		return
	}
}

func removeMember(w http.ResponseWriter, r *http.Request) {
	session, err := extractSession(w, r)
	if err != nil {
		fmt.Printf("[ - ] error extracting session: %v\n", err)
		w.WriteHeader(401)
		return
	}

	user, err := db.GetUserByID(session.UserID)
	if err != nil {
		fmt.Printf("[ - ] error retrieving user from db: %v\n", err)
		w.WriteHeader(401)
		return
	}

	if !user.IsTeamMember {
		fmt.Print("[ - ] %s is not a team member!\n")
		w.WriteHeader(400)
		return
	}

	if user.Permission <= 0 {
		fmt.Printf("[ - ] permission denied. required permission: %v; actual permission: %d\n", db.TEAM_MODERATOR_PERMISSION, user.Permission)
		w.WriteHeader(401)
		return
	}

	memberID, err := getIntFromMuxVars(r, "memberID")
	if err != nil {
		fmt.Printf("[ - ] error extracting memberID from req: %v\n", err)
		w.WriteHeader(400)
		return
	}

	member, err := db.GetUserByID(memberID)
	if err != nil {
		fmt.Printf("[ - ] error retrieving member from db: %v\n", err)
		w.WriteHeader(500)
		return
	}
	fmt.Printf("[ * ] member to remove: %+v\n", member)

	if !member.IsTeamMember || member.Team != user.Team || member.Permission == db.TEAM_OWNER_PERMISSION {
		fmt.Printf("[ - ] permission denied.\n")
		w.WriteHeader(http.StatusForbidden)
		return
	}

	err = db.RemoveTeamMember(member.ID)
	if err != nil {
		fmt.Printf("[ - ] error removing team member: %v\n", err)
		w.WriteHeader(500)
		return
	}
}
