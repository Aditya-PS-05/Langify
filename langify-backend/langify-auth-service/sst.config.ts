import { SSTConfig } from "sst";
import { AuthStack } from "./stacks/AuthStack";

export default {
  config(_input: any) {
    return {
      name: "langify-auth-service",
      region: "us-east-1",
    };
  },
  stacks(app: any) {
    app.stack(AuthStack);
  },
} satisfies SSTConfig;
