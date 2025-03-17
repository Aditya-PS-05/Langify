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


npx sst dev

npx sst deploy

 User Opens App
       │
       ▼
  Check Access Token
       │
       ├──✅ Valid → Continue
       │
       ├──❌ Expired
       │       │
       │       ▼
       │   Use Refresh Token
       │       │
       │       ├──✅ Valid → Get New Access Token
       │       │
       │       ├──❌ Expired → Force Login Again
       │
       ▼
  Make API Requests ✅


langify-mobile/
  ├── App.js
  ├── package.json
  ├── src/
  │   ├── screens/
  │   │   ├── LoginScreen.js
  │   │   ├── RegisterScreen.js
  │   │   ├── HomeScreen.js
  │   ├── navigation/
  │   │   ├── AuthStack.js
  │   ├── context/
  │   │   ├── AuthContext.js
  │   ├── utils/
  │   │   ├── api.js
  ├── assets/
  ├── .env

  # 1️⃣ Create a new Expo project
npx create-expo-app langify-mobile

# 2️⃣ Navigate into the project
cd langify-mobile

# 3️⃣ Install required dependencies
npm install @react-navigation/native @react-navigation/native-stack react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context react-native-vector-icons

# 4️⃣ Install AsyncStorage for storing auth tokens
npm install @react-native-async-storage/async-storage

# 5️⃣ Install dotenv for environment variables
npm install react-native-dotenv

# 6️⃣ Start the Expo app
npx expo start
