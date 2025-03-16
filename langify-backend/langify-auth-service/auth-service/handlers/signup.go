package handlers

import (
	"encoding/json"
	"log"
	"time"

	"github.com/Aditya-PS-05/langify-auth-service/auth-service/database"
	"github.com/Aditya-PS-05/langify-auth-service/auth-service/models"
	"github.com/Aditya-PS-05/langify-auth-service/auth-service/utils"
	"github.com/google/uuid"

	"github.com/aws/aws-lambda-go/events"
)

type SignupRequest struct {
	FullName string          `json:"full_name"`
	Email    string          `json:"email"`
	Password string          `json:"password"`
	Language string          `json:"language,omitempty"`
	Role     models.UserRole `json:"role,omitempty"`
	Timezone string          `json:"timezone,omitempty"`
}

func Signup(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	log.Printf("Request body: %s", request.Body)

	var signupReq SignupRequest
	if err := json.Unmarshal([]byte(request.Body), &signupReq); err != nil {
		log.Printf("Error unmarshaling request body: %v", err)
		resp, err := utils.CreateErrorResponse(400, "Invalid request format")
		return resp, err
	}

	// Validate required fields
	if signupReq.Email == "" || signupReq.Password == "" || signupReq.FullName == "" {
		resp, err := utils.CreateErrorResponse(400, "All fields are required")
		return resp, err
	}

	// Check if email is valid format
	if !utils.IsValidEmail(signupReq.Email) {
		resp, err := utils.CreateErrorResponse(400, "Invalid email format")
		return resp, err
	}

	// Check if email already exists
	existingUser, err := database.GetUserByEmail(signupReq.Email)
	if err != nil && err.Error() != "user not found" {
		log.Printf("Error checking for existing user: %v", err)
		resp, err := utils.CreateErrorResponse(500, "Failed to process signup")
		return resp, err
	}

	if existingUser != nil {
		log.Printf("Attempted signup with existing email: %s", signupReq.Email)
		resp, err := utils.CreateErrorResponse(409, "Email already registered")
		return resp, err
	}

	// Validate password strength
	if !utils.IsStrongPassword(signupReq.Password) {
		resp, err := utils.CreateErrorResponse(400, "Password too weak: must be at least 8 characters with a mix of letters, numbers, and special characters")
		return resp, err
	}

	passwordHash, err := utils.HashPassword(signupReq.Password)
	if err != nil {
		log.Printf("Error hashing password: %v", err)
		resp, err := utils.CreateErrorResponse(500, "Failed to process password")
		return resp, err
	}

	user := models.User{
		ID:                 uuid.New().String(),
		FullName:           signupReq.FullName,
		Email:              signupReq.Email,
		PasswordHash:       passwordHash,
		Language:           signupReq.Language,
		Role:               signupReq.Role,
		Timezone:           signupReq.Timezone,
		SubscriptionStatus: "free",
		CreatedAt:          time.Now(),
		UpdatedAt:          time.Now(),
	}

	// Set defaults for optional fields
	if user.Role == "" {
		user.Role = models.RoleStudent
	}

	if user.Timezone == "" {
		user.Timezone = "UTC"
	}

	if user.Language == "" {
		user.Language = "en"
	}

	if err := database.SaveUser(user); err != nil {
		log.Printf("Error saving user to DB: %v", err)
		resp, err := utils.CreateErrorResponse(500, "Failed to save user")
		return resp, err
	}

	// Return only necessary user information (excluding sensitive data)
	userResponse := map[string]interface{}{
		"user_id":   user.ID,
		"full_name": user.FullName,
		"email":     user.Email,
		"role":      user.Role,
	}

	resp, err := utils.CreateSuccessResponse(201, "User created successfully", userResponse)
	return resp, err
}
