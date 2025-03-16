//go:build mage

package main

import (
	"fmt"
	"os"
	"path/filepath"
)

// List of microservices
var services = []string{
	"auth-service", "user-service", "teacher-service", "chat-service",
	"ai-tutoring-service", "course-service", "gamification-service",
	"assessment-service", "payment-service", "referral-service",
	"content-service", "dictionary-service", "media-translation-service",
	"search-service", "notification-service", "sync-service",
}

// CreateProject sets up the folder structure for Langify Backend
func CreateProject() error {
	root := "langify-backend"

	// Define main folders
	folders := []string{
		"cmd", "internal", "pkg", "api-gateway",
		"deployments", "configs", "scripts", "docs",
	}

	// Create root folders
	for _, folder := range folders {
		path := filepath.Join(root, folder)
		if err := os.MkdirAll(path, os.ModePerm); err != nil {
			return err
		}
	}

	// Create microservices and their structure
	for _, service := range services {
		servicePath := filepath.Join(root, "services", service)
		subfolders := []string{"handlers", "models", "repository", "grpc", "api"}

		// Create service directory
		if err := os.MkdirAll(servicePath, os.ModePerm); err != nil {
			return err
		}

		// Create subfolders
		for _, sub := range subfolders {
			if err := os.MkdirAll(filepath.Join(servicePath, sub), os.ModePerm); err != nil {
				return err
			}
		}

		// Create main.go file for each service
		mainFilePath := filepath.Join(servicePath, "main.go")
		if err := os.WriteFile(mainFilePath, []byte("package main\n\nfunc main() {}\n"), 0644); err != nil {
			return err
		}
	}

	// Create infrastructure for SST deployment
	infraPath := filepath.Join(root, "infra")
	if err := os.MkdirAll(infraPath, os.ModePerm); err != nil {
		return err
	}

	// Create SST files
	sstFiles := map[string]string{
		"infra/MyStack.ts":    "export default function MyStack() {}",
		"infra/sst.config.ts": "import { SSTConfig } from 'sst';\n\nexport default {} as SSTConfig;",
		"package.json":        "{\n  \"name\": \"langify-backend\",\n  \"version\": \"1.0.0\"\n}",
		"tsconfig.json":       "{\n  \"compilerOptions\": {\n    \"strict\": true\n  }\n}",
		"README.md":           "# Langify Backend\nThis is the backend for Langify.",
	}

	for filePath, content := range sstFiles {
		fullPath := filepath.Join(root, filePath)
		if err := os.WriteFile(fullPath, []byte(content), 0644); err != nil {
			return err
		}
	}

	fmt.Println("Langify Backend structure created successfully!")
	return nil
}
