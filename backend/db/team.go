package db

import (
	"gitlab.com/3nt3rt41nm3nt-gbr/dwb/permissions"
	"gitlab.com/3nt3rt41nm3nt-gbr/dwb/structs"
)

/*
func GetTeamByOwner(ownerID int) (strcts.Team, error) {
	newTeam := structs.Team{}

	query := "SELECT * FROM teams WHERE owner = $1"

	row := Database.QueryRow(query, ownerID)
	err := row.Scan(&newTeam.ID, &newTeam.Name, &newTeam.Owner)

	return newTeam, err
}
*/
func GetTeamMembers(teamID int) ([]structs.User, error) {
	var users []structs.User

	query := "SELECT id, username FROM users WHERE is_team_member = true AND team = $1"
	rows, err := Database.Query(query, teamID)
	if err != nil {
		return users, err
	}

	for rows.Next() {
		newUser := structs.User{}
		err = rows.Scan(&newUser.ID, &newUser.Username)
		if err != nil {
			return nil, err
		}

		users = append(users, newUser)
	}

	return users, nil
}

func GetTeamByID(teamID int) (structs.Team, error) {
	newTeam := structs.Team{}
	query := "SELECT * FROM teams WHERE id = $1"
	row := Database.QueryRow(query, teamID)
	err := row.Scan(&newTeam.ID, &newTeam.Name, &newTeam.Owner, &newTeam.Message)
	return newTeam, err
}

func CreateTeam(newTeam structs.Team) (structs.Team, error) {
	// create the team
	query := "INSERT INTO teams VALUES (default, $1, $2, $3) RETURNING id;"
	row := Database.QueryRow(query, newTeam.Name, newTeam.Owner, &newTeam.Message)
	err := row.Scan(&newTeam.ID)
	if err != nil {
		return newTeam, err
	}

	// update the users permission
	query = "UPDATE users SET permission = $1 WHERE id = $2"
	_, err = Database.Exec(query, permissions.TEAM_OWNER_PERMISSION, newTeam.Owner)

	return newTeam, err
}

func AddTeamMember(teamID int, userID int) error {
	query := "UPDATE users SET team = $1, is_team_member = true WHERE id = $2"
	_, err := Database.Exec(query, teamID, userID)
	return err
}

func RemoveTeamMember(userID int) error {
	query := "UPDATE users SET TEAM = 0, is_team_member = false WHERE id = $1"
	_, err := Database.Exec(query, userID)
	return err
}

func GetAllTeams() ([]structs.Team, error) {
	query := "SELECT * FROM teams;"
	rows, err := Database.Query(query)
	if err != nil {
		return nil, err
	}

	teams := []structs.Team{}
	for rows.Next() {
		team := structs.Team{}
		err := rows.Scan(&team.ID, &team.Name, &team.Owner, &team.Message)
		if err != nil {
			return nil, err
		}
		teams = append(teams, team)
	}
	return teams, nil
}

func SetTeamMessage(teamID int, message string) error {
	query := "UPDATE teams SET message = $1 WHERE id = $2"
	_, err := Database.Exec(query, message, teamID)
	return err
}
