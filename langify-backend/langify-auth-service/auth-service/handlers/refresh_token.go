package handlers

import (
	"encoding/json"
	"log"

	"github.com/Aditya-PS-05/langify-auth-service/auth-service/database"
	"github.com/Aditya-PS-05/langify-auth-service/auth-service/utils"

	"github.com/aws/aws-lambda-go/events"
)

// RefreshTokenHandler generates a new access and refresh token using the old refresh token
func RefreshTokenHandler(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	// Parse request body
	var reqData struct {
		RefreshToken string `json:"refresh_token"`
		Email        string `json:"email"`
	}
	err := json.Unmarshal([]byte(request.Body), &reqData)
	if err != nil {
		log.Printf("Failed to parse request body: %v", err)
		return events.APIGatewayProxyResponse{StatusCode: 400, Body: `{"error": "Invalid request format"}`}, nil
	}

	// Validate request
	if reqData.RefreshToken == "" || reqData.Email == "" {
		log.Println("Missing refresh_token or email in request")
		return events.APIGatewayProxyResponse{StatusCode: 400, Body: `{"error": "Refresh token and email are required"}`}, nil
	}

	// Get session from Redis
	_, storedRefreshToken, err := database.GetSession(reqData.Email)
	if err != nil {
		log.Printf("Session not found in Redis: %v", err)
		return events.APIGatewayProxyResponse{StatusCode: 401, Body: `{"error": "Invalid session"}`}, nil
	}

	// Ensure provided refresh token matches the stored one
	if storedRefreshToken != reqData.RefreshToken {
		log.Println("Provided refresh token does not match stored token")
		return events.APIGatewayProxyResponse{StatusCode: 401, Body: `{"error": "Invalid refresh token"}`}, nil
	}

	// Verify refresh token validity
	claims, err := utils.VerifyToken(reqData.RefreshToken)
	if err != nil {
		log.Printf("Invalid refresh token: %v", err)
		return events.APIGatewayProxyResponse{StatusCode: 401, Body: `{"error": "Invalid refresh token"}`}, nil
	}

	// Generate new tokens
	newAccessToken, err := utils.GenerateJWT(claims.UserID)
	if err != nil {
		log.Printf("Failed to generate access token: %v", err)
		return events.APIGatewayProxyResponse{StatusCode: 500, Body: `{"error": "Failed to generate new tokens"}`}, nil
	}

	newRefreshToken, err := utils.GenerateRefreshToken(claims.UserID)
	if err != nil {
		log.Printf("Failed to generate refresh token: %v", err)
		return events.APIGatewayProxyResponse{StatusCode: 500, Body: `{"error": "Failed to generate new tokens"}`}, nil
	}

	// Update session in Redis
	err = database.StoreSession(reqData.Email, newAccessToken, newRefreshToken)
	if err != nil {
		log.Printf("Failed to update session in Redis: %v", err)
		return events.APIGatewayProxyResponse{StatusCode: 500, Body: `{"error": "Failed to store new session"}`}, nil
	}

	// Return new tokens
	response := map[string]string{
		"access_token":  newAccessToken,
		"refresh_token": newRefreshToken,
	}
	responseJSON, _ := json.Marshal(response)

	return events.APIGatewayProxyResponse{StatusCode: 200, Body: string(responseJSON)}, nil
}
