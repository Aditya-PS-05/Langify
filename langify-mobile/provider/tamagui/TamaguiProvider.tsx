import { TamaguiProvider as TamaguiProviderOG } from "tamagui";
import { useColorScheme } from "../../hooks/useColorScheme";
import { config } from "@/../tamagui.config";

export const TamaguiProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useColorScheme() || "light";
  return <TamaguiProviderOG config={config} defaultTheme={theme}>{children}</TamaguiProviderOG>;
};
