package handlers

import (
	"encoding/json"
	"fmt"
	"git.3nt3.de/3nt3/dwb/db"
	"github.com/gorilla/mux"
	"net/http"
	"strconv"
)

func User(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("access-contol-allow-origin", r.Header.Get("origin"))
	w.Header().Set("access-contol-allow-credentials", "true")

	fmt.Printf("\n-*- %s user %s -*-\n", r.Method, r.URL.Path)

	if r.URL.Path == "/user/login/" {
		login(w,r)
		return
	}

	switch r.Method {
	case "POST":
		createUser(w,r)
	case "GET":
		getUser(w,r)
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
		return
	}

	password, ok := foo["password"]
	if !ok {
		return
	}

	fmt.Printf("[ * ] username: %s password: %s\n", username, password)

	id, err := db.CreateUser(username, password, 0)
	if err != nil {
		fmt.Printf("[ - ] error creating user: %v\n", err)
		return
	}

	fmt.Printf("[ * ] userID: %d \n", id)

}

func getUser(w http.ResponseWriter, r *http.Request) {
	rawID, ok := mux.Vars(r)["id"]
	if !ok {
		return
	}

	id, _ := strconv.Atoi(rawID)

	user, err := db.GetUserByID(id)
	if err != nil {
		fmt.Printf("[ - ] error fetching user: %v\n", err)
		return
	}

	fmt.Printf("[ * ] user: %+v\n", user)

	_ = json.NewEncoder(w).Encode(map[string]interface{}{
		"id": user.ID,
		"username": user.Username,
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

	fmt.Printf("[ * ] username: %s password: %s\n", username, password)

	user, err := db.GetUserByName(username)
	if err != nil {
		fmt.Printf("[ - ] error fetching user: %v\n", err)
		return
	}

	fmt.Printf("[ * ] user: %+v\n", user)

	authenticated := db.CheckPasswordHash(password, user.PasswordHash)
	fmt.Printf("[ * ] authenticated: %t\n", authenticated)

	// session stuff lol
	if !authenticated {
		return
	}

	session, err := db.CreateSession(user.ID)

	if err != nil {
		fmt.Printf("[ - ] error creating session: %v\n", err)
		return
	}

	cookie := http.Cookie{
		Name:"session",
		Value:session.UUID,
	}

	http.SetCookie(w, &cookie)
}