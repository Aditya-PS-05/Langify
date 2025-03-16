package handlers

import (
	"context"
	"encoding/json"
	"log"
	"os"

	"github.com/Aditya-PS-05/langify-auth-service/auth-service/database"
	"github.com/Aditya-PS-05/langify-auth-service/auth-service/models"
	"github.com/Aditya-PS-05/langify-auth-service/auth-service/utils"
	"github.com/google/uuid"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"

	"github.com/aws/aws-lambda-go/events"
)

// Google OAuth config
var googleOAuthConfig = &oauth2.Config{
	ClientID:     os.Getenv("GOOGLE_CLIENT_ID"),
	ClientSecret: os.Getenv("GOOGLE_CLIENT_SECRET"),
	RedirectURL:  os.Getenv("GOOGLE_REDIRECT_URI"), // e.g., https://yourdomain.com/auth/google/callback
	Scopes:       []string{"https://www.googleapis.com/auth/userinfo.email", "https://www.googleapis.com/auth/userinfo.profile"},
	Endpoint:     google.Endpoint,
}

type GoogleUser struct {
	ID    string `json:"id"`
	Email string `json:"email"`
	Name  string `json:"name"`
}

// HandleGoogleLogin redirects user to Google's OAuth consent page
func HandleGoogleLogin(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	url := googleOAuthConfig.AuthCodeURL("state", oauth2.AccessTypeOffline)
	return events.APIGatewayProxyResponse{
		StatusCode: 302,
		Headers:    map[string]string{"Location": url},
	}, nil
}

// HandleGoogleCallback handles Google's OAuth callback
func HandleGoogleCallback(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	code := request.QueryStringParameters["code"]
	if code == "" {
		return utils.CreateErrorResponse(400, "Code not found")
	}

	token, err := googleOAuthConfig.Exchange(context.Background(), code)
	if err != nil {
		log.Printf("OAuth token exchange failed: %v", err)
		return utils.CreateErrorResponse(500, "OAuth token exchange failed")
	}

	client := googleOAuthConfig.Client(context.Background(), token)
	resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
	if err != nil {
		log.Printf("Failed to fetch user info: %v", err)
		return utils.CreateErrorResponse(500, "Failed to fetch user info")
	}
	defer resp.Body.Close()

	var googleUser GoogleUser
	if err := json.NewDecoder(resp.Body).Decode(&googleUser); err != nil {
		log.Printf("Failed to decode user info: %v", err)
		return utils.CreateErrorResponse(500, "Failed to decode user info")
	}

	// Check if user already exists
	existingUser, _ := database.GetUserByEmail(googleUser.Email)
	if existingUser != nil {
		token, err := utils.GenerateJWT(existingUser.ID)
		if err != nil {
			log.Printf("Error generating JWT: %v", err)
			return utils.CreateErrorResponse(500, "Failed to generate token")
		}
		return utils.CreateSuccessResponse(200, "User authenticated successfully", map[string]string{"token": token, "user_id": existingUser.ID})
	}

	// Create a new user
	newUser := models.User{
		ID:       uuid.New().String(), // Ensure UUID format
		FullName: googleUser.Name,
		Email:    googleUser.Email,
	}

	if err := database.SaveUser(newUser); err != nil {
		log.Printf("Error saving Google user: %v", err)
		return utils.CreateErrorResponse(500, "Failed to save user")
	}

	jwtToken, err := utils.GenerateJWT(newUser.ID) // jwtToken is a string
	if err != nil {
		log.Printf("Error generating JWT: %v", err)
		return utils.CreateErrorResponse(500, "Failed to generate token")
	}

	// Use jwtToken properly in the response
	return utils.CreateSuccessResponse(201, "User created successfully", map[string]string{"token": jwtToken, "user_id": newUser.ID})

}
