package handlers

import (
	"errors"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"3nt3rt41nmn3nt/dwb/db"
	"3nt3rt41nmn3nt/dwb/structs"
)

func extractSession(w http.ResponseWriter, r *http.Request) (structs.Session, error) {
	sessionCookie, err := r.Cookie("session")
	if err != nil {
		fmt.Printf("[ - ] error extracting session cookie: %v\n", err)
		w.WriteHeader(http.StatusUnauthorized)
		return structs.Session{}, err
	}

	fmt.Printf("[ * ] session cookie: %+v\n", sessionCookie)

	session, err := db.GetSession(sessionCookie.Value)
	if err != nil {
		fmt.Printf("[ * ] error retrieving session from database: %v\n", err)
		w.WriteHeader(http.StatusUnauthorized)
		return structs.Session{}, err
	}
	fmt.Printf("[ * ] session: %+v\n", session)

	return session, nil
}

func getIntFromMuxVars(r *http.Request, key string) (int, error) {
	raw, ok := mux.Vars(r)[key]
	if !ok {
		return 0, errors.New("specified key not found")
	}

	return strconv.Atoi(raw)
}

