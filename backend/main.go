package main

import (
	"fmt"
	"log"
	"net/http"

	"3nt3rt41nmn3nt/dwb/db"
	"3nt3rt41nmn3nt/dwb/handlers"
	"3nt3rt41nmn3nt/dwb/metrics"
	"github.com/gorilla/mux"
)

const port int = 8000

func main() {
	fmt.Println("starting to do things.")

	// datenbank dinge (german1!!!)
	err := db.Init()
	if err != nil {
		fmt.Printf("[ - ] error initializing db. exiting...")
		return
	}

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
	r.HandleFunc("/team/message", handlers.Team)

	r.HandleFunc("/contact/", handlers.Contact)

	r.HandleFunc("/metrics", metrics.MetricsHandler)

	r.HandleFunc("/file", handlers.GetFile)
	r.HandleFunc("/file/{path}", handlers.GetFile)

	// start server
	fmt.Printf("[ ~ ] starting srver on port %d\n", port)
	log.Panic(http.ListenAndServe(fmt.Sprintf(":%d", port), r))
}
