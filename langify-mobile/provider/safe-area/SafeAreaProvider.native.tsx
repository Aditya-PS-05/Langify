import { SafeAreaProvider as SafeAreaProviderOG, useSafeAreaInsets } from "react-native-safe-area-context";
import { View, KeyboardAvoidingView, Platform } from "react-native";

export const SafeAreaProvider = ({ children }: { children: React.ReactNode }) => {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaProviderOG>
      <View
        style={{
          flex: 1,
          // Paddings to handle safe area
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}
      >
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
          {children}
        </KeyboardAvoidingView>
      </View>
    </SafeAreaProviderOG>
  );
};
