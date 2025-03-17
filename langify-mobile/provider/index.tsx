import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "../hooks/useColorScheme";
import { SafeAreaProvider } from "./safe-area";
import { TamaguiProvider } from "./tamagui";

export function Provider({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <TamaguiProvider>{children}</TamaguiProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
