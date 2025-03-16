package handlers

import (
	"encoding/json"

	"github.com/Aditya-PS-05/langify-auth-service/services/auth-service/database"
	"github.com/Aditya-PS-05/langify-auth-service/services/auth-service/models"
	"github.com/Aditya-PS-05/langify-auth-service/services/auth-service/utils"

	"github.com/aws/aws-lambda-go/events"
)

func Signup(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var user models.User
	err := json.Unmarshal([]byte(request.Body), &user)
	if err != nil {
		return events.APIGatewayProxyResponse{StatusCode: 400, Body: `{"error": "Invalid request"}`}, nil
	}

	user.PasswordHash, _ = utils.HashPassword(user.PasswordHash)
	err = database.SaveUser(user)
	if err != nil {
		return events.APIGatewayProxyResponse{StatusCode: 500, Body: `{"error": "Failed to save user"}`}, nil
	}

	return events.APIGatewayProxyResponse{StatusCode: 201, Body: `{"message": "User created successfully"}`}, nil
}
