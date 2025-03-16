package utils

import (
	"regexp"
	"strings"
	"unicode"
)

// IsValidEmail validates if the provided string is a valid email address format.
// It uses a simplified regex pattern that covers most common email formats.
func IsValidEmail(email string) bool {
	// Basic email validation regex
	// This pattern checks for:
	// - One or more characters that can be letters, digits, dots, underscores, percent signs, plus signs, or hyphens
	// - Followed by @
	// - Followed by a domain name that includes one or more letters, digits, hyphens, or dots
	// - Ending with a TLD of at least 2 characters
	emailRegex := regexp.MustCompile(`^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$`)

	// Trim whitespace and check against regex
	email = strings.TrimSpace(email)

	// Additional basic checks
	if email == "" || len(email) > 254 || !strings.Contains(email, "@") {
		return false
	}

	return emailRegex.MatchString(email)
}

// IsStrongPassword checks if a password meets minimum security requirements.
// Requirements:
// - Minimum 8 characters
// - At least one uppercase letter
// - At least one lowercase letter
// - At least one number
// - At least one special character
func IsStrongPassword(password string) bool {
	if len(password) < 8 {
		return false
	}

	var (
		hasUpper   bool
		hasLower   bool
		hasNumber  bool
		hasSpecial bool
	)

	for _, char := range password {
		switch {
		case unicode.IsUpper(char):
			hasUpper = true
		case unicode.IsLower(char):
			hasLower = true
		case unicode.IsNumber(char):
			hasNumber = true
		case unicode.IsPunct(char) || unicode.IsSymbol(char):
			hasSpecial = true
		}
	}

	// Check if all criteria are met
	return hasUpper && hasLower && hasNumber && hasSpecial
}

// IsValidName checks if a provided name is valid (non-empty and contains only allowed characters)
func IsValidName(name string) bool {
	name = strings.TrimSpace(name)
	if name == "" || len(name) > 100 {
		return false
	}

	// Allow letters, spaces, hyphens, and apostrophes in names
	nameRegex := regexp.MustCompile(`^[a-zA-Z\s\-']+$`)
	return nameRegex.MatchString(name)
}
