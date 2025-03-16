// package handlers

// import (
// 	"encoding/json"

// 	"github.com/Aditya-PS-05/langify-auth-service/services/auth-service/database"
// 	"github.com/Aditya-PS-05/langify-auth-service/services/auth-service/models"
// 	"github.com/Aditya-PS-05/langify-auth-service/services/auth-service/utils"

// 	"github.com/aws/aws-lambda-go/events"
// )

// func Login(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
// 	var creds models.Credentials
// 	err := json.Unmarshal([]byte(request.Body), &creds)
// 	if err != nil {
// 		return events.APIGatewayProxyResponse{StatusCode: 400, Body: `{"error": "Invalid request"}`}, nil
// 	}

// 	user, err := database.GetUserByEmail(creds.Email)
// 	if err != nil || !utils.CheckPassword(creds.Password, user.PasswordHash) {
// 		return events.APIGatewayProxyResponse{StatusCode: 401, Body: `{"error": "Invalid credentials"}`}, nil
// 	}

// 	// Generate Access Token and Refresh Token
// 	accessToken, _ := utils.GenerateJWT(user.Email)           // Short-lived access token
// 	refreshToken, _ := utils.GenerateRefreshToken(user.Email) // Long-lived refresh token

// 	// Store both tokens in Redis
// 	err = database.StoreSession(user.Email, accessToken, refreshToken)
// 	if err != nil {
// 		return events.APIGatewayProxyResponse{StatusCode: 500, Body: `{"error": "Failed to store session"}`}, nil
// 	}

// 	// Return both tokens in response
// 	response := map[string]string{
// 		"access_token":  accessToken,
// 		"refresh_token": refreshToken,
// 	}
// 	responseJSON, _ := json.Marshal(response)

// 	return events.APIGatewayProxyResponse{StatusCode: 200, Body: string(responseJSON)}, nil
// }

package handlers

import (
	"encoding/json"
	"log"

	"github.com/Aditya-PS-05/langify-auth-service/auth-service/database"
	"github.com/Aditya-PS-05/langify-auth-service/auth-service/models"
	"github.com/Aditya-PS-05/langify-auth-service/auth-service/utils"

	"github.com/aws/aws-lambda-go/events"
)

func Login(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	// Log the incoming request for debugging
	log.Printf("Login handler received request: %s", request.Body)

	var creds models.Credentials
	err := json.Unmarshal([]byte(request.Body), &creds)
	if err != nil {
		log.Printf("Failed to parse request body: %v", err)
		return events.APIGatewayProxyResponse{
			StatusCode: 400,
			Body:       `{"error": "Invalid request format"}`,
			Headers: map[string]string{
				"Content-Type": "application/json",
			},
		}, nil
	}

	// Validate input
	if creds.Email == "" || creds.Password == "" {
		log.Printf("Missing credentials: email=%s, password provided=%t",
			creds.Email, creds.Password != "")
		return events.APIGatewayProxyResponse{
			StatusCode: 400,
			Body:       `{"error": "Email and password are required"}`,
			Headers: map[string]string{
				"Content-Type": "application/json",
			},
		}, nil
	}

	// Attempt to get the user
	user, err := database.GetUserByEmail(creds.Email)
	if err != nil {
		log.Printf("User lookup failed: %v", err)
		return events.APIGatewayProxyResponse{
			StatusCode: 401,
			Body:       `{"error": "Invalid credentials"}`,
			Headers: map[string]string{
				"Content-Type": "application/json",
			},
		}, nil
	}

	// Check if this is a valid user (has a password hash)
	if user.PasswordHash == "" {
		log.Printf("User found but has no password hash: %s", creds.Email)
		return events.APIGatewayProxyResponse{
			StatusCode: 401,
			Body:       `{"error": "Invalid credentials"}`,
			Headers: map[string]string{
				"Content-Type": "application/json",
			},
		}, nil
	}

	// Verify password
	if !utils.CheckPassword(creds.Password, user.PasswordHash) {
		log.Printf("Password verification failed for user: %s", creds.Email)
		return events.APIGatewayProxyResponse{
			StatusCode: 401,
			Body:       `{"error": "Invalid credentials"}`,
			Headers: map[string]string{
				"Content-Type": "application/json",
			},
		}, nil
	}

	// If we reached here, authentication was successful
	log.Printf("User successfully authenticated: %s", creds.Email)

	// Generate Access Token and Refresh Token
	accessToken, err := utils.GenerateJWT(user.Email)
	if err != nil {
		log.Printf("Failed to generate access token: %v", err)
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       `{"error": "Failed to generate tokens"}`,
			Headers: map[string]string{
				"Content-Type": "application/json",
			},
		}, nil
	}

	refreshToken, err := utils.GenerateRefreshToken(user.Email)
	if err != nil {
		log.Printf("Failed to generate refresh token: %v", err)
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       `{"error": "Failed to generate tokens"}`,
			Headers: map[string]string{
				"Content-Type": "application/json",
			},
		}, nil
	}

	// Store both tokens in Redis
	err = database.StoreSession(user.Email, accessToken, refreshToken)
	if err != nil {
		log.Printf("Failed to store session in Redis: %v", err)
		return events.APIGatewayProxyResponse{
			StatusCode: 500,
			Body:       `{"error": "Failed to store session"}`,
			Headers: map[string]string{
				"Content-Type": "application/json",
			},
		}, nil
	}

	// Return both tokens in response
	response := map[string]string{
		"access_token":  accessToken,
		"refresh_token": refreshToken,
		"user_id":       user.ID,
		"email":         user.Email,
	}
	responseJSON, _ := json.Marshal(response)

	return events.APIGatewayProxyResponse{
		StatusCode: 200,
		Body:       string(responseJSON),
		Headers: map[string]string{
			"Content-Type":                "application/json",
			"Access-Control-Allow-Origin": "*", // For CORS support
		},
	}, nil
}
