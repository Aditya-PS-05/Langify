// package main

// import (
// 	"context"
// 	"fmt"
// 	"log"
// 	"strings"

// 	"github.com/aws/aws-lambda-go/events"
// 	"github.com/aws/aws-lambda-go/lambda"

// 	"github.com/Aditya-PS-05/langify-auth-service/services/auth-service/database"
// 	"github.com/Aditya-PS-05/langify-auth-service/services/auth-service/handlers"
// )

// func handler(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
// 	log.Printf("Full Request: %+v", request)

// 	// Check the actual URL being used for the request
// 	var reqURL string
// 	if host, ok := request.Headers["host"]; ok {
// 		proto := "https"
// 		if fwdProto, ok := request.Headers["x-forwarded-proto"]; ok {
// 			proto = fwdProto
// 		}
// 		reqURL = proto + "://" + host
// 	}

// 	// Extract the actual HTTP Method
// 	httpMethod := request.HTTPMethod
// 	if httpMethod == "" {
// 		// Default to POST if there's a body
// 		if request.Body != "" {
// 			httpMethod = "POST"
// 			log.Printf("No HTTP method specified, defaulting to POST due to request body")
// 		} else {
// 			httpMethod = "GET"
// 		}
// 	}
// 	log.Printf("HTTP Method: %s", httpMethod)

// 	// Important: Extract the path from the actual request URL
// 	// In your case, you're sending to /signup but it's not showing in the Path field
// 	endpoint := "/"

// 	// Check if we can determine endpoint from the raw request
// 	// Try to extract from the original request URL
// 	originalURL := ""
// 	if referer, ok := request.Headers["referer"]; ok && strings.Contains(referer, "/signup") {
// 		originalURL = referer
// 	} else if reqURL, ok := request.Headers["x-forwarded-url"]; ok {
// 		originalURL = reqURL
// 	}

// 	log.Printf("Original URL (if available): %s", originalURL)

// 	// Examine the request to detect which endpoint is being targeted
// 	if strings.Contains(originalURL, "/signup") {
// 		endpoint = "/signup"
// 	} else if strings.Contains(originalURL, "/login") {
// 		endpoint = "/login"
// 	} else if strings.Contains(originalURL, "/verify") {
// 		endpoint = "/verify"
// 	} else {
// 		// Check path information from various request fields
// 		path := request.Path
// 		if path != "" {
// 			endpoint = path
// 		} else if request.RequestContext.Path != "" {
// 			endpoint = request.RequestContext.Path
// 		} else if request.RequestContext.ResourcePath != "" {
// 			endpoint = request.RequestContext.ResourcePath
// 		} else if request.Resource != "" {
// 			endpoint = request.Resource
// 		} else {
// 			// If we still can't determine, try to infer from the request content
// 			if httpMethod == "POST" {
// 				body := strings.ToLower(request.Body)

// 				// If the request URL contains the API endpoint, parse it
// 				if strings.HasSuffix(reqURL, "/signup") {
// 					endpoint = "/signup"
// 				} else if strings.HasSuffix(reqURL, "/login") {
// 					endpoint = "/login"
// 				} else if strings.HasSuffix(reqURL, "/verify") {
// 					endpoint = "/verify"
// 				} else if strings.Contains(body, "email") && strings.Contains(body, "password") {
// 					endpoint = "/signup" // Default assumption for email/password POST
// 					log.Printf("Detected signup endpoint based on email/password in body")
// 				}
// 			}
// 		}
// 	}

// 	log.Printf("Determined endpoint: %s", endpoint)

// 	// Here's the key - also check if the full URL contains any of our endpoints
// 	fullUrl := request.Headers["host"]
// 	if strings.Contains(fullUrl, "/signup") {
// 		endpoint = "/signup"
// 	} else if strings.Contains(fullUrl, "/login") {
// 		endpoint = "/login"
// 	} else if strings.Contains(fullUrl, "/verify") {
// 		endpoint = "/verify"
// 	}

// 	// Parse the URL in the request if it exists
// 	for key, value := range request.Headers {
// 		log.Printf("Header: %s = %s", key, value)
// 		if strings.Contains(value, "/signup") {
// 			endpoint = "/signup"
// 			break
// 		} else if strings.Contains(value, "/login") {
// 			endpoint = "/login"
// 			break
// 		} else if strings.Contains(value, "/verify") {
// 			endpoint = "/verify"
// 			break
// 		} else if strings.Contains(value, "/auth/google") {
// 			endpoint = "/auth/google"
// 			break
// 		} else if strings.Contains(value, "/auth/google/callback") {
// 			endpoint = "/auth/google/callback"
// 			break
// 		}
// 	}

// 	// Route based on the determined endpoint
// 	switch endpoint {
// 	case "/signup":
// 		return handlers.Signup(request)
// 	case "/login":
// 		return handlers.Login(request)
// 	case "/auth/google":
// 		return handlers.HandleGoogleLogin(request)
// 	case "/auth/google/callback":
// 		return handlers.HandleGoogleCallback(request)
// 	case "/verify":
// 		return handlers.Verify(request)
// 	default:
// 		log.Printf("No route found for endpoint: %s", endpoint)
// 		return events.APIGatewayProxyResponse{
// 			StatusCode: 404,
// 			Body:       `{"error": "Route not found", "endpoint": "` + endpoint + `", "url": "` + reqURL + `"}`,
// 			Headers: map[string]string{
// 				"Content-Type": "application/json",
// 			},
// 		}, nil
// 	}
// }

// func main() {
// 	database.InitDynamoDB()
// 	database.InitRedis()
// 	fmt.Println("🚀 Langify Auth Service Started!")
// 	lambda.Start(handler)
// }

// ==========================================================================================

// package main

// import (
// 	"context"
// 	"fmt"
// 	"log"
// 	"strings"

// 	"github.com/aws/aws-lambda-go/events"
// 	"github.com/aws/aws-lambda-go/lambda"

// 	"github.com/Aditya-PS-05/langify-auth-service/services/auth-service/database"
// 	"github.com/Aditya-PS-05/langify-auth-service/services/auth-service/handlers"
// )

// func handler(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
// 	log.Printf("Received request: %+v", request)

// 	// Extract the actual HTTP Method
// 	httpMethod := request.HTTPMethod
// 	if httpMethod == "" {
// 		// Default to POST if there's a body
// 		if request.Body != "" {
// 			httpMethod = "POST"
// 			log.Printf("No HTTP method specified, defaulting to POST due to request body")
// 		} else {
// 			httpMethod = "GET"
// 		}
// 	}
// 	log.Printf("HTTP Method: %s", httpMethod)

// 	// The problem is primarily in endpoint detection
// 	// Let's use a more direct approach to identify the endpoint

// 	// First, check the path in the request itself - most reliable source
// 	endpoint := request.Path

// 	// If that's empty, check the resource path
// 	if endpoint == "" || endpoint == "/" {
// 		endpoint = request.Resource
// 	}

// 	// Check the raw path from request context
// 	if (endpoint == "" || endpoint == "/") && request.RequestContext.Path != "" {
// 		endpoint = request.RequestContext.Path
// 	}

// 	// If we still don't have a valid endpoint, check for specific patterns in the body
// 	if (endpoint == "" || endpoint == "/") && httpMethod == "POST" {
// 		body := strings.ToLower(request.Body)

// 		// Basic heuristic based on request body content
// 		if strings.Contains(body, "email") && strings.Contains(body, "password") {
// 			// This looks like a login or signup request
// 			// Default to login for now, handlers will validate
// 			endpoint = "/login"
// 			log.Printf("Detected login endpoint based on email/password in body")
// 		}
// 	}

// 	// If endpoint is still empty, default to root
// 	if endpoint == "" {
// 		endpoint = "/"
// 	}

// 	log.Printf("Determined endpoint: %s", endpoint)

// 	// Route based on the determined endpoint
// 	switch {
// 	case strings.HasSuffix(endpoint, "/signup"):
// 		return handlers.Signup(request)
// 	case strings.HasSuffix(endpoint, "/login"):
// 		return handlers.Login(request)
// 	case strings.HasSuffix(endpoint, "/auth/google"):
// 		return handlers.HandleGoogleLogin(request)
// 	case strings.HasSuffix(endpoint, "/auth/google/callback"):
// 		return handlers.HandleGoogleCallback(request)
// 	case strings.HasSuffix(endpoint, "/verify"):
// 		return handlers.Verify(request)
// 	default:
// 		// If the endpoint is not recognized, but we have email and password in the body,
// 		// let's assume it's a login attempt for compatibility
// 		if httpMethod == "POST" && strings.Contains(strings.ToLower(request.Body), "email") &&
// 			strings.Contains(strings.ToLower(request.Body), "password") {
// 			log.Printf("Defaulting to login handler for unrecognized endpoint with credentials")
// 			return handlers.Login(request)
// 		}

// 		log.Printf("No route found for endpoint: %s", endpoint)
// 		return events.APIGatewayProxyResponse{
// 			StatusCode: 404,
// 			Body:       fmt.Sprintf(`{"error": "Route not found", "endpoint": "%s"}`, endpoint),
// 			Headers: map[string]string{
// 				"Content-Type": "application/json",
// 			},
// 		}, nil
// 	}
// }

// func main() {
// 	database.InitDynamoDB()
// 	database.InitRedis()
// 	fmt.Println("🚀 Langify Auth Service Started!")
// 	lambda.Start(handler)
// }

// ==========================================================================================

package main

import (
	"context"
	"fmt"
	"log"
	"strings"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"

	"github.com/Aditya-PS-05/langify-auth-service/auth-service/database"
	"github.com/Aditya-PS-05/langify-auth-service/auth-service/handlers"
)

func handler(ctx context.Context, request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
	log.Printf("Processing request: Method=%s, Path=%s, Resource=%s",
		request.HTTPMethod, request.Path, request.Resource)

	// Set default HTTP method if empty
	httpMethod := request.HTTPMethod
	if httpMethod == "" {
		if request.Body != "" {
			httpMethod = "POST"
		} else {
			httpMethod = "GET"
		}
	}

	// Construct current URL for logging
	var reqURL string
	if host, ok := request.Headers["host"]; ok {
		proto := "https"
		if fwdProto, ok := request.Headers["x-forwarded-proto"]; ok {
			proto = fwdProto
		}
		reqURL = proto + "://" + host
		log.Printf("Request URL: %s", reqURL)
	}

	// Multiple sources to determine the endpoint
	endpoint := determineEndpoint(request)
	log.Printf("Determined endpoint: %s", endpoint)

	// Analyze request body if endpoint is still unclear
	if endpoint == "/" && httpMethod == "POST" {
		body := strings.ToLower(request.Body)

		if strings.Contains(body, "full_name") &&
			strings.Contains(body, "email") &&
			strings.Contains(body, "password") {
			log.Printf("Detected signup request based on body content")
			endpoint = "/signup"
		} else if strings.Contains(body, "email") &&
			strings.Contains(body, "password") &&
			!strings.Contains(body, "full_name") {
			log.Printf("Detected login request based on body content")
			endpoint = "/login"
		}
	}

	// Final routing based on determined endpoint
	switch {
	case strings.HasSuffix(endpoint, "/signup"):
		return handlers.Signup(request)
	case strings.HasSuffix(endpoint, "/login"):
		return handlers.Login(request)
	case strings.HasSuffix(endpoint, "/auth/google"):
		return handlers.HandleGoogleLogin(request)
	case strings.HasSuffix(endpoint, "/auth/google/callback"):
		return handlers.HandleGoogleCallback(request)
	case strings.HasSuffix(endpoint, "/verify"):
		return handlers.Verify(request)
	default:
		log.Printf("No route found for endpoint: %s", endpoint)
		return events.APIGatewayProxyResponse{
			StatusCode: 404,
			Body:       fmt.Sprintf(`{"error": "Route not found", "endpoint": "%s", "url": "%s"}`, endpoint, reqURL),
			Headers: map[string]string{
				"Content-Type": "application/json",
			},
		}, nil
	}
}

// determineEndpoint attempts to identify the correct endpoint from multiple request properties
func determineEndpoint(request events.APIGatewayProxyRequest) string {
	// Candidate sources in order of reliability
	candidatePaths := []string{
		request.Path,
		request.Resource,
		request.RequestContext.Path,
		request.RequestContext.ResourcePath,
	}

	// Check each candidate path
	for _, path := range candidatePaths {
		if path != "" && path != "/" {
			return path
		}
	}

	// Check common headers for endpoint info
	headerKeys := []string{
		"referer",
		"x-forwarded-url",
		"origin",
		"path",
	}

	for _, key := range headerKeys {
		if value, exists := request.Headers[key]; exists {
			// Check if the header value contains any known endpoint
			for _, endpoint := range []string{"/signup", "/login", "/verify", "/auth/google", "/auth/google/callback"} {
				if strings.Contains(value, endpoint) {
					return endpoint
				}
			}
		}
	}

	// If no specific path found, check all headers as a last resort
	for _, value := range request.Headers {
		for _, endpoint := range []string{"/signup", "/login", "/verify", "/auth/google", "/auth/google/callback"} {
			if strings.Contains(value, endpoint) {
				return endpoint
			}
		}
	}

	// Default to root if we can't determine the endpoint
	return "/"
}

func main() {
	database.InitDynamoDB()
	database.InitRedis()
	fmt.Println("🚀 Langify Auth Service Started!")
	lambda.Start(handler)
}
