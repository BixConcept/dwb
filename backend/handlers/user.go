package handlers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/gorilla/mux"
	"gitlab.com/3nt3rt41nm3nt-gbr/dwb/db"
)

func User(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("access-control-allow-origin", r.Header.Get("origin"))
	w.Header().Set("access-control-allow-credentials", "true")

	fmt.Printf("\n-*- %s user %s -*-\n", r.Method, r.URL.Path)

	if r.URL.Path == "/user/login/" {
		login(w, r)
		return
	}

	switch r.Method {
	case "POST":
		createUser(w, r)
	case "GET":
		if r.URL.Path == "/user/all" {
			getAllUsers(w, r)
		} else if len(mux.Vars(r)) != 0 {
			getUserByID(w, r)
		} else {
			getUserBySession(w, r)
		}
	default:
		w.WriteHeader(404)
	}
}

func createUser(w http.ResponseWriter, r *http.Request) {
	foo := map[string]string{}
	err := json.NewDecoder(r.Body).Decode(&foo)
	if err != nil {
		fmt.Printf("[ - ] error decoding json: %v\n", err)
		return
	}

	username, ok := foo["username"]
	if !ok {
		w.WriteHeader(400)
		return
	}

	password, ok := foo["password"]
	if !ok {
		w.WriteHeader(400)
		return
	}

	//fmt.Printf("[ * ] username: %s password: %s\n", username, password)

	id, err := db.CreateUser(username, password, 0)
	if err != nil {
		fmt.Printf("[ - ] error creating user: %v\n", err)
		w.WriteHeader(500)
		return
	}

	fmt.Printf("[ * ] userID: %d \n", id)

	session, err := db.CreateSession(id)
	if err != nil {
		fmt.Printf("[ - ] error creating session: %v\n", err)
		w.WriteHeader(500)
		return
	}

	fmt.Printf("[ * ] session: %+v\n", session)

	sessionCookie := http.Cookie{
		Path:   "/",
		Name:   "session",
		Value:  session.UUID,
		Expires: time.Now().AddDate(1, 0, 0),
		Domain: "3nt3.de",
	}

	http.SetCookie(w, &sessionCookie)
}

func getUserBySession(w http.ResponseWriter, r *http.Request) {
	sessionCookie, err := r.Cookie("session")

	if err != nil {
		fmt.Printf("[ - ] error extracting session cookie: %v \n", err)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	fmt.Printf("[ * ] session cookie: %+v \n", sessionCookie)
	session, err := db.GetSession(sessionCookie.Value)

	if err != nil {
		fmt.Printf("[ - ] error retrieving session: %v \n", err)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	fmt.Printf("[ * ] session: %+v \n", session)

	user, err := db.GetUserByID(session.UserID)

	if err != nil {
		fmt.Printf("[ - ] error rertrieving user: %v \n", err)
		w.WriteHeader(500)
		return
	}

	fmt.Printf("[ * ] user: %+v \n", user)

	user.PasswordHash = ""
	_ = json.NewEncoder(w).Encode(user)
}

func getUserByID(w http.ResponseWriter, r *http.Request) {
	rawID, ok := mux.Vars(r)["id"]
	if !ok {
		return
	}

	id, _ := strconv.Atoi(rawID)

	user, err := db.GetUserByID(id)
	if err != nil {
		fmt.Printf("[ - ] error fetching user: %v\n", err)
		w.WriteHeader(401)
		return
	}

	fmt.Printf("[ * ] user: %+v\n", user)

	_ = json.NewEncoder(w).Encode(map[string]interface{}{
		"id":         user.ID,
		"username":   user.Username,
		"permission": user.Permission,
	})
}

func login(w http.ResponseWriter, r *http.Request) {
	foo := map[string]string{}
	err := json.NewDecoder(r.Body).Decode(&foo)
	if err != nil {
		fmt.Printf("[ - ] error decoding json: %v\n", err)
		return
	}

	username, ok := foo["username"]
	if !ok {
		return
	}

	password, ok := foo["password"]
	if !ok {
		return
	}

	//fmt.Printf("[ * ] username: %s password: %s\n", username, password)

	user, err := db.GetUserByName(username)
	if err != nil {
		fmt.Printf("[ - ] error fetching user: %v\n", err)
		w.WriteHeader(401)
		return
	}

	fmt.Printf("[ * ] user: %+v\n", user)

	authenticated := db.CheckPasswordHash(password, user.PasswordHash)
	fmt.Printf("[ * ] authenticated: %t\n", authenticated)

	// session stuff lol
	if !authenticated {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}

	session, err := db.CreateSession(user.ID)

	if err != nil {
		fmt.Printf("[ - ] error creating session: %v\n", err)
		w.WriteHeader(500)
		return
	}

	cookie := http.Cookie{
		Path:   "/",
		Name:   "session",
		Value:  session.UUID,
		Expires: time.Now().AddDate(1, 0, 0),
		Domain: "3nt3.de",
	}

	http.SetCookie(w, &cookie)
}

func getAllUsers(w http.ResponseWriter, r *http.Request) {
	session, err := extractSession(w, r)
	if err != nil {
		fmt.Printf("[ - ] error extracting session: %v\n", err)
		w.WriteHeader(401)
		return
	}

	user, err := db.GetUserByID(session.UserID)
	if err != nil {
		fmt.Printf("[ - ] error retrieving user from db: %v\n", err)
		w.WriteHeader(500)
		return
	}
	fmt.Printf("[ * ] user: %+v\n", user)

	if !user.IsSuperUser() {
		fmt.Printf("[ - ] permission denied\n")
		w.WriteHeader(403)
		return
	}

	users, err := db.GetUsers()
	if err != nil {
		fmt.Printf("[ - ] error retrieving users from db: %v\n", err)
		w.WriteHeader(500)
		return
	}

	_ = json.NewEncoder(w).Encode(users)
}
