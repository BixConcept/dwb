package db

func initAssignmentsTable() error {
	query := "CREATE TABLE IF NOT EXISTS assignments (id serial, created_at timestamp, due_date date, text text, subject integer, description text, author int, author_name text, file BOOLEAN, file_path text);"
	_, err := Database.Exec(query)
	return err
}

func initUsersTable() error {
	query := "CREATE TABLE IF NOT EXISTS users (id serial, username text unique, password_hash text, team int, is_team_member BOOLEAN, permission int, email text);"
	_, err := Database.Exec(query)
	return err
}

func initSessionsTable() error {
	query := "CREATE TABLE IF NOT EXISTS sessions (id serial, uuid text unique, user_id int);"
	_, err := Database.Exec(query)
	return err
}

func initTeamsTable() error {
	query := "CREATE TABLE IF NOT EXISTS teams (id serial, name text, owner int, message text)"
	_, err := Database.Exec(query)
	return err
}
