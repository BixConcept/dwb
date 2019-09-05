package structs

import (
	"time"

	"gitlab.com/3nt3rt41nm3nt-gbr/dwb/permissions"
)

type Assignment struct {
	ID          int       `json:"id"`
	CreatedAt   time.Time `json:"created_at"`
	DueDate     time.Time `json:"due_date"`
	Text        string    `json:"text"`
	Subject     string    `json:"subject"`
	Description string    `json:"description"`
	Author      int       `json:"author"`
	AuthorName  string    `json:"author_name"`
}

type User struct {
	ID           int    `json:"id"`
	Username     string `json:"username"`
	PasswordHash string
	Permission   int  `json:"permission"`
	Team         int  `json:"team"`
	IsTeamMember bool `json:"team_member"`
}

func (u *User) IsSuperUser() bool {
	return u.Permission >= permissions.ADMIN_PERMISSION
}

type Session struct {
	ID     int
	UUID   string
	UserID int
}

type Team struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Owner int    `json:"owner"`
}
