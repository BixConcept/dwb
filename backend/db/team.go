package db

import "git.3nt3.de/3nt3/dwb/structs"

func GetTeamByOwner(ownerID int) (structs.Team, error) {
	newTeam := structs.Team{}

	query := "SELECT * FROM teams WHERE owner = $1"

	row := Database.QueryRow(query, ownerID)
	err := row.Scan(&newTeam.ID, &newTeam.Name, &newTeam.Owner)

	return newTeam, err
}

func GetTeamByID(teamID int) (structs.Team, error) {
	newTeam := structs.Team{}
	query := "SELECT * FROM teams WHERE id = $1"
	row := Database.QueryRow(query, teamID)
	err := row.Scan(&newTeam.ID, &newTeam.Name, &newTeam.Owner)
	return newTeam, err
}

func CreateTeam(newTeam structs.Team) (structs.Team, error) {
	query := "INSERT INTO teams VALUES (default, $1, $2) RETURNING id"
	row := Database.QueryRow(query, newTeam.Name, newTeam.Owner)
	err := row.Scan(&newTeam.ID)
	return newTeam, err
}
