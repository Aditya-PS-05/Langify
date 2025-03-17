import { useNavigation } from "expo-router";
import { Button, Text, Heading } from "../../components";
import { ImageBackground } from "react-native";
import { Image, ZStack, YStack } from "tamagui";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "app/navigationTypes";


export default function ForgotPasswordOnePage() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  return (
    <YStack bg="#white_a700" f={1}>
      <YStack jc="center" f={1} p="$4">
        <YStack ai="center">
          <ImageBackground
            style={{ position: "relative", width: "40%", height: 140 }}
            source={require("assets/images/img_group_4.png")}>
            <ZStack pt={32} h="100%">
              <Image source={require("assets/images/img_open_file.png")} h={62} w={62} objectFit="cover" />
            </ZStack>
          </ImageBackground>
          <Heading tag="h1" mt={54} fos="$6" fow="700">
            Code Sent!
          </Heading>
          <Text color="$gray_600" mt={12} ta="center" fos="$2" fow="400" als="stretch" lh={17}>
            <Text tag="span" color="$gray_600" ta="center" fos="$2" fow="400">
              A six digits code has been sent to your email&nbsp;
            </Text>
            <Text tag="span" color="$gray_800" ta="center" fos="$2" fow="600" ff="$EpilogueRoman-SemiBold">
              tusharmirian092@gmail.com
            </Text>
          </Text>
          <Button shape="round" colorScheme="white_A700" mt={42} boc="$indigo_a700" borderWidth={0.5}>
            Change Email
          </Button>
          <Button shape="round" mt={24}>
            Submit Token
          </Button>
        </YStack>
      </YStack>
    </YStack>
  );
}