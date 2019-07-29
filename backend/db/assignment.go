package db

import "git.3nt3.de/3nt3/dwb/structs"

func GetAssignments() ([]structs.Assignment, error) {
	query := "SELECT * FROM assignments;"
	rows, err := Database.Query(query)
	if err != nil {
		return nil, err
	}

	assignments := []structs.Assignment{}
	for rows.Next() {
		assignment := structs.Assignment{}

		err := rows.Scan(&assignment.ID, &assignment.CreatedAt, &assignment.DueDate, &assignment.Text, &assignment.Subject, &assignment.Description, &assignment.Author)
		if err != nil {
			return nil, err
		}

		assignments = append(assignments, assignment)
	}


	return assignments, nil
}