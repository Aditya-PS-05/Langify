import { StackContext, Function, Api } from "sst/constructs";

export function AuthStack({ stack }: StackContext) {
  // Create a single auth function using the common properties.
  const authFunction = new Function(stack, "AuthFunction", {
    handler: "services/auth-service/main.go",
    runtime: "go1.x",
    architecture: "arm_64" as const,
    memorySize: 1024,
    timeout: 600,
    permissions: ["dynamodb", "secretsmanager"],
    bundling: { format: "binary" },
    environment: {
      STAGE: stack.stage,
    },
  });

  // Create the API Gateway with each route using the auth function.
  const api = new Api(stack, "AuthApi", {
    routes: {
      "POST /signup": authFunction,
      "POST /login": authFunction,
      "GET /verify": authFunction,
    },
  });

  // Output the API endpoint URL
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}