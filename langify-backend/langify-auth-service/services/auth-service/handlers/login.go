package handlers

import (
	"encoding/json"

	"github.com/Aditya-PS-05/langify-auth-service/services/auth-service/database"
	"github.com/Aditya-PS-05/langify-auth-service/services/auth-service/models"
	"github.com/Aditya-PS-05/langify-auth-service/services/auth-service/utils"

	"github.com/aws/aws-lambda-go/events"
)

func Login(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	var creds models.Credentials
	err := json.Unmarshal([]byte(request.Body), &creds)
	if err != nil {
		return events.APIGatewayProxyResponse{StatusCode: 400, Body: `{"error": "Invalid request"}`}, nil
	}

	user, err := database.GetUser(creds.Email)
	if err != nil || !utils.CheckPassword(creds.Password, user.PasswordHash) {
		return events.APIGatewayProxyResponse{StatusCode: 401, Body: `{"error": "Invalid credentials"}`}, nil
	}

	token, _ := utils.GenerateJWT(user.Email)
	database.StoreSession(user.Email, token)

	return events.APIGatewayProxyResponse{StatusCode: 200, Body: `{"token": "` + token + `"}`}, nil
}
