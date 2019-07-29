package db

func initAssignmentsTable() error {
	query := "CREATE TABLE IF NOT EXISTS assignments (id serial, created_at timestamp, due_date date, text text, subject text, description text, author int);"
	_, err := Database.Exec(query)
	return err
}
