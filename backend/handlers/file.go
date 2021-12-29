package handlers

import (
	"fmt"
	"io/ioutil"
	"net/http"

	"3nt3rt41nmn3nt/dwb/db"
	"3nt3rt41nmn3nt/dwb/permissions"
	"3nt3rt41nmn3nt/dwb/structs"

	"github.com/gorilla/mux"
)

// GetFile Handler to be called in order to access some file
func GetFile(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("access-control-allow-origin", r.Header.Get("origin"))
	w.Header().Set("access-control-allow-credentials", "true")

	fmt.Printf("\n-*- %s file %s -*-\n", r.Method, r.URL.Path)

	vars := mux.Vars(r)

	// if there are no variables, just display some static stuff
	if len(vars) < 1 {
		fmt.Fprintf(w, "<h1> /files </h1>")
		return
	}

	var path string = vars["path"]
	fmt.Printf("[ getFile ] [ * ] path: %s\n", path)

	var session structs.Session
	session, err := extractSession(w, r)
	if err != nil {
		fmt.Printf("[ getFile ] [ - ] error extracting session: %s\n", err.Error())
		w.WriteHeader(401)
		return
	}

	var user structs.User
	user, err = db.GetUserByID(session.UserID)
	if err != nil {
		fmt.Printf("[ getFile ] [ - ] error retrieving user data: %s\n", err.Error())
		w.WriteHeader(401)
		return
	}
	fmt.Printf("[ getFile ] [ * ] user: %v\n", user)

	var authorized bool = false

	// admnistrators can access everything lol
	if user.Permission >= permissions.ADMIN_PERMISSION {
		authorized = true
	} else {
		assignment, err := db.GetAssignmentByFile(path)
		if err != nil {
			fmt.Printf("[ getFile ] [ - ] error retrieving assignment from database: %s\n", err.Error())
		} else {
			if assignment.Author == user.ID {
				// if the user created the assignment him/herself -> authorized
				authorized = true
			} else if user.IsTeamMember {
				// if the user is on a team and the author of the assignment is on the same team -> authorized
				author, err := db.GetUserByID(assignment.Author)

				if err != nil {
					fmt.Printf("[ getFile ] [ - ] error retrieving author of requested resource from database: %s\n", err.Error())
				} else if author.Team == user.Team {
					authorized = true
				}
			}
		}
	}

	if !authorized {
		fmt.Printf("[ getFile ] [ * ] permission denied.\n")
		w.WriteHeader(403)
		return
	}

	// read file
	fileBytes, err := ioutil.ReadFile(fmt.Sprintf("/files/%s", path))
	if err != nil {
		w.WriteHeader(500)
		fmt.Printf("[ getFile ] [ - ] error reading file: %s\n", err.Error())
		return
	}

	// write file bytes
	_, err = w.Write(fileBytes)
	if err != nil {
		fmt.Printf("[ getFile ] [ - ] error writing to responsewriter: %s\n", err.Error())
	}
}
