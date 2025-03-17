import { createStackNavigator } from "@react-navigation/stack";

export type RootStackParamList = {
  onboarding: undefined;
  signup: undefined;
  login: undefined;
  forgotpassword: undefined;
};

export const Stack = createStackNavigator<RootStackParamList>();
