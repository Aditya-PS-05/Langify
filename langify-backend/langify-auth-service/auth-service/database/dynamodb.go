package database

import (
	"fmt"
	"log"
	"os"
	"time"

	"github.com/google/uuid"

	"github.com/Aditya-PS-05/langify-auth-service/auth-service/models"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/service/dynamodb/dynamodbattribute"
)

var db *dynamodb.DynamoDB

func InitDynamoDB() {
	sess := session.Must(session.NewSession(&aws.Config{
		Region: aws.String("us-east-1"),
	}))
	db = dynamodb.New(sess)
	fmt.Println("DynamoDB initialized")
}

func SaveUser(user models.User) error {
	tableName := os.Getenv("USERS_TABLE")
	if tableName == "" {
		tableName = "UsersTable"
	}

	if user.ID == "" {
		user.ID = uuid.New().String()
	}

	now := time.Now()
	user.CreatedAt = now
	user.UpdatedAt = now

	if user.Role == "" {
		user.Role = models.RoleStudent
	}

	if user.Timezone == "" {
		user.Timezone = "UTC"
	}

	av, err := dynamodbattribute.MarshalMap(user)
	if err != nil {
		log.Printf("Error marshaling user: %v", err)
		return err
	}

	input := &dynamodb.PutItemInput{
		TableName: aws.String(tableName),
		Item:      av,
	}

	_, err = db.PutItem(input)
	if err != nil {
		log.Printf("Error putting item in DynamoDB: %v", err)
		return err
	}

	return nil
}

func GetUserByEmail(email string) (*models.User, error) {
	tableName := os.Getenv("USERS_TABLE")
	if tableName == "" {
		tableName = "Users"
	}

	input := &dynamodb.QueryInput{
		TableName:              aws.String(tableName),
		IndexName:              aws.String("emailIndex"),
		KeyConditionExpression: aws.String("email = :email"),
		ExpressionAttributeValues: map[string]*dynamodb.AttributeValue{
			":email": {S: aws.String(email)},
		},
	}

	result, err := db.Query(input)
	if err != nil {
		return nil, err
	}

	if len(result.Items) == 0 {
		return nil, fmt.Errorf("user not found")
	}

	user := &models.User{}
	err = dynamodbattribute.UnmarshalMap(result.Items[0], user)
	if err != nil {
		return nil, err
	}

	return user, nil
}
