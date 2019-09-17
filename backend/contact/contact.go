package contact

import (
	"fmt"
	"io/ioutil"
	"net/smtp"

	"gitlab.com/3nt3rt41nm3nt-gbr/dwb/db"
	"gitlab.com/3nt3rt41nm3nt-gbr/dwb/structs"
)

// CreateMessage sends email and stuff
func CreateMessage(message structs.ContactMessage) error {
	emails, err := db.GetAdminEmails()
	if err != nil {
		return err
	}

	return sendEmail(emails, message)
}

func sendEmail(recipients []string, message structs.ContactMessage) error {
	// hostname is used by PlainAuth to validate the TLS certificate.
	hostname := "smtp.mail.eu-west-1.awsapps.com"
	auth := smtp.PlainAuth("", "noreply@3nt3.de", "=CsfDsfKvxQ2DWrRDhNQ$g4m+LfQVeMhw-!uYy2*PEFA*yJe#m=5^d-J-a7TPJZ&", hostname)

	mime := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n"

	recipientsString := ""
	for i, recipient := range recipients {
		if i == len(recipients)-1 {
			recipientsString += recipient
		}
		recipientsString += recipient + ","
	}

	body, err := ioutil.ReadFile("template.html")
	if err != nil {
		return err
	}

	subjectString := fmt.Sprintf("Subject: new message by %s (%s)\r\n", message.Name, message.Email)
	msg := []byte("From: noreply@3nt3.de\r\n" + "To: " + recipientsString + "\r\n" +
		subjectString +
		mime +
		"\r\n" +
		fmt.Sprintf(string(body)+"\r\n", message.Name, message.Email, message.Email, message.Name, message.Email, message.Message))

	err = smtp.SendMail(hostname+":465", auth, "noreply@3nt3.de", recipients, msg)
	if err != nil {
		return err
	}
	return nil
}
