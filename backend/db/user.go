package db

import "golang.org/x/crypto/bcrypt"


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