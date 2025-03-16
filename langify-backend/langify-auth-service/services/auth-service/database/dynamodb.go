package database

import (
	"fmt"

	"github.com/Aditya-PS-05/langify-auth-service/services/auth-service/models"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
)

var db *dynamodb.DynamoDB

func InitDynamoDB() {
	sess := session.Must(session.NewSession(&aws.Config{
		Region: aws.String("us-east-1"),
	}))
	db = dynamodb.New(sess)
	fmt.Println("✅ DynamoDB initialized")
}

func SaveUser(user models.User) error {
	_, err := db.PutItem(&dynamodb.PutItemInput{
		TableName: aws.String("Users"),
		Item: map[string]*dynamodb.AttributeValue{
			"email":    {S: aws.String(user.Email)},
			"password": {S: aws.String(user.PasswordHash)},
		},
	})
	return err
}

func GetUser(email string) (*models.User, error) {
	// Dummy user for now, replace with actual DB lookup
	return &models.User{
		ID:           "123",
		Email:        email,
		PasswordHash: "$2a$10$hashedpassword", // Replace with actual hashed password
	}, nil
}
