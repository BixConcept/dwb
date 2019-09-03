package db

import "git.3nt3.de/3nt3/dwb/structs"

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
	err := row.Scan(&newTeam.ID, &newTeam.Name, &newTeam.Owner)
	return newTeam, err
}

func CreateTeam(newTeam structs.Team) (structs.Team, error) {
	query := "INSERT INTO teams VALUES (default, $1, $2) RETURNING id;"
	row := Database.QueryRow(query, newTeam.Name, newTeam.Owner)
	err := row.Scan(&newTeam.ID)
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
