import { Stack } from "expo-router";
import "react-native-reanimated";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { View } from "react-native";
import { Provider } from "../provider";
import useAppFonts from "../hooks/useAppFonts";
import "../styles/font.css";

/** @see https://docs.expo.dev/router/advanced/router-settings/#initialroutename */
export const unstable_settings = {
  initialRouteName: "home",
};

export default function RootLayout() {
  useAppFonts();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      
      <View style={{ flex: 1 }}>
        <Provider>
          <Stack>
          <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="signup" options={{ headerShown: false }} />
            <Stack.Screen name="forgotpassword" />
            <Stack.Screen name="inputtoken" />
            <Stack.Screen name="forgotpasswordone" options={{ headerShown: false }} />
            <Stack.Screen name="newpassword" />
            <Stack.Screen name="wrongpasswordlogin" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            {/* <Stack.Screen name="home" options={{ headerShown: false }} /> */}
            <Stack.Screen name="not-found" />
          </Stack>
        </Provider>
      </View>
    </GestureHandlerRootView>
  );
}
