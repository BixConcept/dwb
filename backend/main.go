package main

import (
	"fmt"
	"git.3nt3.de/3nt3/dwb/db"
	"git.3nt3.de/3nt3/dwb/handlers"
	"github.com/gorilla/mux"
	"log"
	"net/http"
)

const PORT = 8000

func main() {

	// datenbank dinge (german1!!!)
	db.Init()

	r := mux.NewRouter()

	// define routes
	r.HandleFunc("/assignment/", handlers.Assignment)

	r.HandleFunc("/user/", handlers.User)
	r.HandleFunc("/user/{id}", handlers.User)
	r.HandleFunc("/user/login/", handlers.User)
	r.HandleFunc("/team/", handlers.Team)

	// start server
	fmt.Printf("[ ~ ] starting server on port %d\n", PORT)
	log.Panic(http.ListenAndServe(fmt.Sprintf(":%d", PORT), r))
}
