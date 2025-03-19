import { Button, Text, Heading } from "../../components";
import { Image, YStack, ScrollView } from "tamagui";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigationTypes"; // Import the types

export default function OnboardingPage() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <YStack bg="$white_a700" f={1}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <YStack pt={50} f={1} ai="center" px="64">
          <Heading size="md" tag="h1" color="$blue_a700_02" mt={28} ff="$ProductSansBold" fos="$10" fow="700">
            <Heading size="md" tag="span" color="$blue_a700_02" ff="$ProductSansBold" fos="$10" fow="700">
            Langify
            </Heading>
            <Heading size="md" tag="span" color="$deep_orange_a200" ff="$ProductSansBold" fos="$10" fow="700">
              .
            </Heading>
          </Heading>

          <Image
            source={require("assets/images/img_frame.png")}
            h={232}
            mt={44}
            w="100%"
            objectFit="contain"
            mx={42}
          />

          <Heading mt={52} fos="$6" fow="700">
            Welcome to Langify
          </Heading>

          <Text color="$gray_600" mt={12} mr={6} ta="center" fos="$2" fow="400" als="flex-end" lh={17}>
            Get comparative estimation on what’s the industry norm of the real states.
          </Text>

          {/* Sign Up Button */}
          <Button
            shape="round"
            colorScheme="white_A700"
            mt={66}
            boc="$indigo_a700"
            borderWidth={0.5}
            onPress={() => navigation.navigate("signup")}
          >
            Sign Up
          </Button>

          {/* Log In Button */}
          <Button
            shape="round"
            mt={16}
            onPress={() => navigation.navigate("home")}
          >
            Log in
          </Button>
        </YStack>
      </ScrollView>
    </YStack>
  );
}
