package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"gitlab.com/3nt3rt41nm3nt-gbr/dwb/db"
	"gitlab.com/3nt3rt41nm3nt-gbr/dwb/handlers"
)

const port int = 8000

func main() {

	// datenbank dinge (german1!!!)
	db.Init()

	r := mux.NewRouter()

	// define routes
	r.HandleFunc("/assignment/", handlers.Assignment)
	r.HandleFunc("/assignment/{id}", handlers.Assignment)
	r.HandleFunc("/assignment/all", handlers.Assignment)

	r.HandleFunc("/user/", handlers.User)
	r.HandleFunc("/user/{id}", handlers.User)
	r.HandleFunc("/user/login/", handlers.User)

	r.HandleFunc("/team/", handlers.Team)
	r.HandleFunc("/team/addMember/", handlers.Team)
	r.HandleFunc("/team/removeMember/", handlers.Team)
	r.HandleFunc("/team/all", handlers.Team)

	// start server
	fmt.Printf("[ ~ ] starting server on port %d\n", port)
	log.Panic(http.ListenAndServe(fmt.Sprintf(":%d", port), r))
}
