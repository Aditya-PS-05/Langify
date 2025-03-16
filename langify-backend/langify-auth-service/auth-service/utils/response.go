package utils

import (
	"encoding/json"

	"github.com/aws/aws-lambda-go/events"
)

// ErrorResponse represents a structured error response.
type ErrorResponse struct {
	Message string `json:"message"`
}

// SuccessResponse represents a structured success response.
type SuccessResponse struct {
	Message string      `json:"message"`
	Data    interface{} `json:"data,omitempty"`
}

// CreateErrorResponse generates an API Gateway proxy response for errors.
func CreateErrorResponse(statusCode int, message string) (events.APIGatewayProxyResponse, error) {
	responseBody, _ := json.Marshal(ErrorResponse{Message: message})

	return events.APIGatewayProxyResponse{
		StatusCode: statusCode,
		Body:       string(responseBody),
		Headers:    map[string]string{"Content-Type": "application/json"},
	}, nil
}

// CreateSuccessResponse generates an API Gateway proxy response for successful requests.
func CreateSuccessResponse(statusCode int, message string, data interface{}) (events.APIGatewayProxyResponse, error) {
	responseBody, _ := json.Marshal(SuccessResponse{Message: message, Data: data})

	return events.APIGatewayProxyResponse{
		StatusCode: statusCode,
		Body:       string(responseBody),
		Headers:    map[string]string{"Content-Type": "application/json"},
	}, nil
}
