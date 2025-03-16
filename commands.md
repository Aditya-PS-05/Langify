**To initiate the project structure

```
cd langify-backend
mage -compile ../mage_output
../mage_output CreateProject

```

Auth-Service → AWS Cognito + Lambda + API Gateway
User-Service → DynamoDB (or RDS) + Lambda + API Gateway
Chat-Service → AppSync (GraphQL) + WebSockets
AI-Tutoring-Service → S3 (Storage) + Lambda (Processing) + Bedrock (AI Models)
Course-Service → DynamoDB + Lambda
Payment-Service → Stripe + Lambda
Referral-Service → Lambda + SES (Email Service)
Media-Translation-Service → AWS Transcribe + Translate + Lambda
Notification-Service → SNS/SQS + Lambda

GOOS=linux GOARCH=arm64 go build -o main services/auth-service/main.go


langify-backend/
└── langify-auth-service/
    ├── go.mod           // This is the only go.mod file
    ├── services/
    │   └── auth-service/
    │       ├── database/
    │       ├── handlers/
    │       ├── models/
    │       ├── utils/
    │       └── main.go
    └── stacks/
        └── AuthStack.ts
