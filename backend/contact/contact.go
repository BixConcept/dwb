package contact

import (
	"errors"
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

	if len(emails) < 1 {
		return errors.New("no email addresses found")
	}

	return sendEmail(emails, message)
}

func sendEmail(recipients []string, message structs.ContactMessage) error {
	// hostname is used by PlainAuth to validate the TLS certificate.
	hostname := "email-smtp.eu-west-1.amazonaws.com"
	// hostname := "mail.gmx.net"
	auth := smtp.PlainAuth("", "AKIA43UVUTYHDXCBNNNB", "BN5vgdDxOhy1ApuiSNymkh/PXzxkrnvwMMUZGj5KqoVU", hostname)
	// auth := smtp.PlainAuth("", "niels-schlegel@gmx.de", "NielsS16nov", hostname)

	mime := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n"

	recipientsString := ""
	for _, recipient := range recipients {
		recipientsString += recipient + ", "
	}
	recipientsString = recipientsString[:len(recipientsString)-2]

	fmt.Println(recipientsString)

	body, err := ioutil.ReadFile("contact/template.html")
	if err != nil {
		return err
	}

	subjectString := fmt.Sprintf("Subject: new message by %s (%s)\r\n", message.Name, message.Email)
	msg := []byte("From: norepy@3nt3.de\r\n" + "To: " + recipientsString + "\r\n" +
		subjectString +
		mime +
		"\r\n" +
		fmt.Sprintf(string(body)+"\r\n", message.Name, message.Email, message.Email, message.Name, message.Email, message.Message))

	err = smtp.SendMail(hostname+":587", auth, "norepy@3nt3.de", recipients, msg)
	if err != nil {
		return err
	}
	return nil
}
