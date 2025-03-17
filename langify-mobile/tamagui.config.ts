import { createFont, createTamagui, createTokens } from "@tamagui/core";
import { shorthands } from "@tamagui/shorthands";
import { config as defaultConfig } from "@tamagui/config/v3";
import { color, radius, space, size } from "./theme/index";

const fontSizes = { "1": 12, "2": 14, "3": 16, "5": 20, "6": 24, "8": 44.11, "10": 68.57 };

const createAppFont = (familyName: string) => {
  return createFont({
    family: familyName,
    size: fontSizes as any,
  });
};

const EpilogueBold = createAppFont("Epilogue-Bold");
const EpilogueRegular = createAppFont("Epilogue-Regular");
const EpilogueMedium = createAppFont("Epilogue-Medium");
const EpilogueRomanMedium = createAppFont("EpilogueRoman-Medium");
const EpilogueRomanBold = createAppFont("EpilogueRoman-Bold");
const EpilogueRomanSemiBold = createAppFont("EpilogueRoman-SemiBold");

const config = createTamagui({
  ...defaultConfig,
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  shorthands,
  fonts: {
    body: EpilogueMedium,
    heading: EpilogueMedium,
    EpilogueBold,
    EpilogueRegular,
    EpilogueMedium,
    EpilogueRomanMedium,
    EpilogueRomanBold,
    EpilogueRomanSemiBold,
  },
  tokens: createTokens({ ...defaultConfig.tokens, color, radius, space, size }),
});

export type AppConfig = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends AppConfig {}
}

export { config };
