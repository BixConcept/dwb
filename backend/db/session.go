package db

import (
	"git.3nt3.de/3nt3/dwb/structs"
	uuid "github.com/satori/go.uuid"
)

func CreateSession(userID int) (structs.Session, error) {

	sessionIDRaw, _ := uuid.NewV4()
	sessionID := sessionIDRaw.String()

	newSession := structs.Session{
		UUID:   sessionID,
		UserID: userID,
	}

	query := "insert into sessions values (default, $1, $2) returning id;"
	row := Database.QueryRow(query, sessionID, userID)

	err := row.Scan(&newSession.ID)
	return newSession, err
}

func GetSession(uuid string) (structs.Session, error) {
	query := "select * from sessions where uuid = $1"
	row := Database.QueryRow(query, uuid)

	session := structs.Session{}

	err := row.Scan(&session.ID, &session.UUID, &session.UserID)
	return session, err
}
