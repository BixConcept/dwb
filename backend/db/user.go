package db

import (
	"errors"

	"gitlab.com/3nt3rt41nm3nt-gbr/dwb/permissions"

	"gitlab.com/3nt3rt41nm3nt-gbr/dwb/structs"
	"golang.org/x/crypto/bcrypt"
)

// CreateUser -> append an user to 'users' table
func CreateUser(username, password string, permission int) (int, error) {
	user := structs.User{}

	// hash password
	hashedPass, err := HashPassword(password)
	if err != nil {
		return 0, err
	}

	user.PasswordHash = hashedPass

	query := "INSERT INTO users  VALUES (default, $1, $2, 0, false, $3) returning id;"
	row := Database.QueryRow(query, username, hashedPass, permission)

	id := 0
	err = row.Scan(&id)

	return id, err
}

// GetUsers -> fetch all user data from database
func GetUsers() ([]structs.User, error) {
	var users []structs.User

	query := "SELECT * FROM users;"
	rows, err := Database.Query(query)
	if err != nil {
		return users, err
	}

	for rows.Next() {
		newUser := structs.User{}

		err = rows.Scan(&newUser.ID, &newUser.Username, &newUser.PasswordHash, &newUser.Team, &newUser.IsTeamMember, &newUser.Permission)
		if err != nil {
			return users, err
		}

		users = append(users, newUser)
	}

	return users, err
}

// GetUserByName -> return user with specified name
func GetUserByName(name string) (structs.User, error) {
	users, err := GetUsers()

	if err != nil {
		return structs.User{}, err
	}

	for _, dbUser := range users {
		if dbUser.Username == name {
			return dbUser, nil
		}
	}

	return structs.User{}, errors.New("user does not exist")
}

// GetUserByID -> return user with specified id
func GetUserByID(id int) (structs.User, error) {
	users, err := GetUsers()

	user := structs.User{}

	if err != nil {
		return user, err
	}
	for _, dbUser := range users {
		if dbUser.ID == id {
			user = dbUser
			break
		}
	}

	return user, err
}

// GetAdminEmails returns every users' email address with ADMIN_PERMISSION
func GetAdminEmails() ([]string, error) {
	q := "SELECT email FROM users WHERE permission = $1;"
	rows, err := Database.Query(q, permissions.ADMIN_PERMISSION)
	if err != nil {
		return nil, err
	}

	emails := []string{}
	for rows.Next() {
		email := ""
		err := rows.Scan(&email)
		if err != nil {
			return nil, err
		}
		emails = append(emails, email)
	}

	return emails, err
}

// HashPassword hashes the password
// using with bcrypt algorithm
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

// CheckPasswordHash checks the passwords hash
func CheckPasswordHash(password, hash string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	return err == nil
}
