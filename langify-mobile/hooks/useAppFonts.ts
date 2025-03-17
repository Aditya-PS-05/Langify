import {useFonts} from 'expo-font';

export default function useAppFonts() {
  const [loaded] = useFonts({
    'EpilogueRegular': require('assets/fonts/EpilogueRegular.ttf'),
    'EpilogueBold': require('assets/fonts/EpilogueBold.ttf'),
    'EpilogueMedium': require('assets/fonts/EpilogueMedium.ttf'),
    'EpilogueRomanBold': require('assets/fonts/EpilogueRomanBold.ttf'),
    'EpilogueRomanMedium': require('assets/fonts/EpilogueRomanMedium.ttf'),
    'EpilogueRomanSemiBold': require('assets/fonts/EpilogueRomanSemiBold.ttf'),

  });
  return loaded;
}

