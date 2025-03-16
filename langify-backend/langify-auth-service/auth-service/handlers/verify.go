package handlers

import (
	"github.com/Aditya-PS-05/langify-auth-service/auth-service/utils"

	"github.com/aws/aws-lambda-go/events"
)

func Verify(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	token := request.Headers["Authorization"]

	if token, err := utils.VerifyJWT(token); err != nil || token == nil {
		return events.APIGatewayProxyResponse{StatusCode: 401, Body: `{"error": "Invalid token"}`}, nil
	}

	return events.APIGatewayProxyResponse{StatusCode: 200, Body: `{"message": "Token is valid"}`}, nil
}
