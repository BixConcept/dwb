package db

import (
	"database/sql"
	"fmt"
	_ "github.com/lib/pq"
)

func connectToDB(host string, port int, username string, password string) (*sql.DB, error) {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, username, password, username)
	db, err := sql.Open("postgres", psqlInfo)
	return db, err
}
func Init() {

	fmt.Printf("[ ~ ] connecting to database...\n")
	foo, err := connectToDB("localhost", 5432, "dwb", "")
	Database = foo

	if err != nil {
		fmt.Printf("[ - ] error connecting to database: %s\n", err.Error())
		return
	}
	fmt.Printf("[ + ] successfully connected to database!!!!!11elf!\n")

	fmt.Printf("[ ~ ] initializing  assignments table...\n")
	err = initAssignmentsTable()
	if err != nil {
		fmt.Printf("[ - ] error initializing assignments table: %s\n", err.Error())
		return
	}
	fmt.Printf("[ + ] successfully initialized assignments table!!!!!11elf!\n")


}
