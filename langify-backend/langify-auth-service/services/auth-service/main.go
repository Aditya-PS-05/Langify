package main

import (
	"context"
	"fmt"
	"log"
	"strings"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"

	"github.com/Aditya-PS-05/langify-auth-service/services/auth-service/database"
	"github.com/Aditya-PS-05/langify-auth-service/services/auth-service/handlers"
)

func handler(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	log.Printf("Full Request: %+v", request)

	// Check the actual URL being used for the request
	var reqURL string
	if host, ok := request.Headers["host"]; ok {
		proto := "https"
		if fwdProto, ok := request.Headers["x-forwarded-proto"]; ok {
			proto = fwdProto
		}
		reqURL = proto + "://" + host
	}

	// Extract the actual HTTP Method
	httpMethod := request.HTTPMethod
	if httpMethod == "" {
		// Default to POST if there's a body
		if request.Body != "" {
			httpMethod = "POST"
			log.Printf("No HTTP method specified, defaulting to POST due to request body")
		} else {
			httpMethod = "GET"
		}
	}
	log.Printf("HTTP Method: %s", httpMethod)

	// Important: Extract the path from the actual request URL
	// In your case, you're sending to /signup but it's not showing in the Path field
	endpoint := "/"

	// Check if we can determine endpoint from the raw request
	// Try to extract from the original request URL
	originalURL := ""
	if referer, ok := request.Headers["referer"]; ok && strings.Contains(referer, "/signup") {
		originalURL = referer
	} else if reqURL, ok := request.Headers["x-forwarded-url"]; ok {
		originalURL = reqURL
	}

	log.Printf("Original URL (if available): %s", originalURL)

	// Examine the request to detect which endpoint is being targeted
	if strings.Contains(originalURL, "/signup") {
		endpoint = "/signup"
	} else if strings.Contains(originalURL, "/login") {
		endpoint = "/login"
	} else if strings.Contains(originalURL, "/verify") {
		endpoint = "/verify"
	} else {
		// Check path information from various request fields
		path := request.Path
		if path != "" {
			endpoint = path
		} else if request.RequestContext.Path != "" {
			endpoint = request.RequestContext.Path
		} else if request.RequestContext.ResourcePath != "" {
			endpoint = request.RequestContext.ResourcePath
		} else if request.Resource != "" {
			endpoint = request.Resource
		} else {
			// If we still can't determine, try to infer from the request content
			if httpMethod == "POST" {
				body := strings.ToLower(request.Body)

				// If the request URL contains the API endpoint, parse it
				if strings.HasSuffix(reqURL, "/signup") {
					endpoint = "/signup"
				} else if strings.HasSuffix(reqURL, "/login") {
					endpoint = "/login"
				} else if strings.HasSuffix(reqURL, "/verify") {
					endpoint = "/verify"
				} else if strings.Contains(body, "email") && strings.Contains(body, "password") {
					endpoint = "/signup" // Default assumption for email/password POST
					log.Printf("Detected signup endpoint based on email/password in body")
				}
			}
		}
	}

	log.Printf("Determined endpoint: %s", endpoint)

	// Here's the key - also check if the full URL contains any of our endpoints
	fullUrl := request.Headers["host"]
	if strings.Contains(fullUrl, "/signup") {
		endpoint = "/signup"
	} else if strings.Contains(fullUrl, "/login") {
		endpoint = "/login"
	} else if strings.Contains(fullUrl, "/verify") {
		endpoint = "/verify"
	}

	// Parse the URL in the request if it exists
	for key, value := range request.Headers {
		log.Printf("Header: %s = %s", key, value)
		if strings.Contains(value, "/signup") {
			endpoint = "/signup"
			break
		} else if strings.Contains(value, "/login") {
			endpoint = "/login"
			break
		} else if strings.Contains(value, "/verify") {
			endpoint = "/verify"
			break
		}
	}

	// Route based on the determined endpoint
	switch endpoint {
	case "/signup":
		return handlers.Signup(request)
	case "/login":
		return handlers.Login(request)
	case "/verify":
		return handlers.Verify(request)
	default:
		log.Printf("No route found for endpoint: %s", endpoint)
		return events.APIGatewayProxyResponse{
			StatusCode: 404,
			Body:       `{"error": "Route not found", "endpoint": "` + endpoint + `", "url": "` + reqURL + `"}`,
			Headers: map[string]string{
				"Content-Type": "application/json",
			},
		}, nil
	}
}

func main() {
	database.InitDynamoDB()
	database.InitRedis()
	fmt.Println("🚀 Langify Auth Service Started!")
	lambda.Start(handler)
}
