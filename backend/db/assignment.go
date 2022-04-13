package db

import "3nt3rt41nmn3nt/dwb/structs"

func GetAssignmentsByOwner(ownerID int) ([]structs.Assignment, error) {
	query := "SELECT * FROM assignments WHERE author = $1;"
	rows, err := Database.Query(query, ownerID)
	if err != nil {
		return nil, err
	}

	assignments := []structs.Assignment{}
	for rows.Next() {
		assignment := structs.Assignment{}

		err := rows.Scan(&assignment.ID, &assignment.CreatedAt, &assignment.DueDate, &assignment.Text, &assignment.Subject, &assignment.Description, &assignment.Author, &assignment.AuthorName, &assignment.File, &assignment.FileName)
		if err != nil {
			return nil, err
		}

		assignments = append(assignments, assignment)
	}

	return assignments, nil
}

func GetAssignmentsByTeam(teamID int) ([]structs.Assignment, error) {
	query := "SELECT id FROM users WHERE team = $1"
	rows, err := Database.Query(query, teamID)
	if err != nil {
		return nil, err
	}

	users := []int{}

	for rows.Next() {
		id := 0
		err := rows.Scan(&id)
		if err != nil {
			return nil, err
		}

		users = append(users, id)
	}

	assignments := []structs.Assignment{}

	for _, user := range users {
		query := "SELECT * FROM assignments WHERE author = $1"
		rows, err = Database.Query(query, user)
		if err != nil {
			return nil, err
		}

		for rows.Next() {
			a := structs.Assignment{}
			err := rows.Scan(&a.ID, &a.CreatedAt, &a.DueDate, &a.Text, &a.Subject, &a.Description, &a.Author, &a.AuthorName, &a.File, &a.FileName)
			if err != nil {
				return nil, err
			}
			assignments = append(assignments, a)
		}
	}
	return assignments, nil
}

func GetAssignmentByFile(fileName string) (structs.Assignment, error) {
	query := "select * from assignments where file_path = $1;"
	row := Database.QueryRow(query, fileName)

	var a structs.Assignment
	err := row.Scan(&a.ID, &a.CreatedAt, &a.DueDate, &a.Text, &a.Subject, &a.Description, &a.Author, &a.AuthorName, &a.File, &a.FileName)
	return a, err
}

func CreateAssignment(assignment structs.Assignment) error {
	query := "insert into assignments values (default, now(), $1, $2, $3, $4, $5, $6, $7, $8)"
	_, err := Database.Exec(query, assignment.DueDate, assignment.Text, assignment.Subject, assignment.Description, assignment.Author, assignment.AuthorName, assignment.File, assignment.FileName)
	return err
}

func DeleteAssignment(id int) error {
	query := "delete from assignments where id = $1;"
	_, err := Database.Exec(query, id)
	return err
}

func GetAllAssignments() ([]structs.Assignment, error) {
	query := "SELECT * FROM assignments;"
	rows, err := Database.Query(query)
	if err != nil {
		return nil, err
	}

	assignments := []structs.Assignment{}
	for rows.Next() {
		a := structs.Assignment{}
		err := rows.Scan(&a.ID, &a.CreatedAt, &a.DueDate, &a.Text, &a.Subject, &a.Description, &a.Author, &a.AuthorName, &a.File, &a.FileName)
		if err != nil {
			return nil, err
		}
		assignments = append(assignments, a)
	}

	return assignments, err
}
