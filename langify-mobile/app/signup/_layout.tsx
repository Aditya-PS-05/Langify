import { Text, Button, Checkbox, Input, Heading } from "../../components";
import { XStack, Image, YStack, ScrollView } from "tamagui";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigationTypes"; // Import the types
import { useNavigation } from "expo-router";

export default function SignUpPage() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  
  return (
    <YStack bg="$white_a700" f={1}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <YStack pt={32} f={1} ai="center" px="$4">
          <Heading size="s" tag="h1" ff="$ProductSansBold" fos="$8" fow="700" color="$indigo_a700">
            sova
          </Heading>
          <Heading size="s" tag="span" ff="$ProductSansBold" fos="$8" fow="700" color="$deep_orange_a200" />
          <Heading color="$gray_800" mt={30} fos="$6" fow="700">
            Sign Up
          </Heading>
          <Text color="$gray_600" mt={10} fos="$2" fow="400">
            Create your account
          </Text>

          <YStack mt={40} gap="$2" als="stretch" ai="flex-start">
            <Text size="textxs" fos="$1" fow="500">
              <Text size="textxs" tag="span" fos="$1" fow="500" color="$gray_800">
                Full Name
              </Text>
              <Text size="textxs" tag="span" fos="$1" fow="500" color="$red_700_01">
                *
              </Text>
            </Text>
            <Input variant="fill" shape="round" boc="$blue_a700_02">
              <Input.Field placeholder={"Tushar Imra"} placeholderTextColor="$indigo_a700" />
            </Input>
          </YStack>

          <YStack mt={24} gap="$2" als="stretch" ai="flex-start">
            <Text size="textxs" fos="$1" fow="500">
              <Text size="textxs" tag="span" fos="$1" fow="500" color="$gray_800">
                Email
              </Text>
              <Text size="textxs" tag="span" fos="$1" fow="500" color="$red_700_01">
                *
              </Text>
            </Text>
            <Input shape="round">
              <Input.Field placeholder={"Enter your email here"} inputMode="email" placeholderTextColor="$gray_600" />
            </Input>
          </YStack>

          <YStack mt={24} gap="$2" als="stretch" ai="flex-start">
            <Text size="textxs" fos="$1" fow="500">
              <Text size="textxs" tag="span" fos="$1" fow="500" color="$gray_800">
                Password
              </Text>
              <Text size="textxs" tag="span" fos="$1" fow="500" color="$red_700_01">
                *
              </Text>
            </Text>
            <Input shape="round">
              <Input.Field placeholder={"Must be 8 characters or more"} secureTextEntry placeholderTextColor="$gray_600" />
              <Input.RightIcon>
                <Image source={require("assets/images/img_eyeoff.png")} h="$6" ml={16} w={24} bg="" objectFit="contain" />
              </Input.RightIcon>
            </Input>
          </YStack>

          <YStack mt={24} gap="$2" als="stretch" ai="flex-start">
            <Text size="textxs" fos="$1" fow="500">
              <Text size="textxs" tag="span" fos="$1" fow="500" color="$gray_800">
                Repeat Password
              </Text>
              <Text size="textxs" tag="span" fos="$1" fow="500" color="$red_700_01">
                *
              </Text>
            </Text>
            <Input shape="round">
              <Input.Field placeholder={"Repeat the password again"} secureTextEntry placeholderTextColor="$gray_600" />
              <Input.RightIcon>
                <Image source={require("assets/images/img_eyeoff.png")} h="$6" ml={16} w={24} bg="" objectFit="contain" />
              </Input.RightIcon>
            </Input>
          </YStack>

          <XStack mt={24} als="stretch" ai="center">
            <Checkbox>
              <Checkbox.Field id="1:1916:Field" defaultChecked={false}>
                <Checkbox.Indicator>
                  <Checkbox.Icon size="$5" />
                </Checkbox.Indicator>
              </Checkbox.Field>
              <Checkbox.Label htmlFor="1:1916:Field" size="$2" color="$gray_600">
                I agree to the
              </Checkbox.Label>
            </Checkbox>
            <Text color="$indigo_a700" ml={2} ff="$EpilogueRomanMedium" fos="$2" fow="500">
              Terms & Conditions
            </Text>
          </XStack>

          <Button shape="round" mt={40}>
            Sign Up
          </Button>

          <Text size="textmd" color="$blue_a200" mt={28} mb={30} ff="$SFProDisplayMedium" fos="$3" fow="500">
            <Text size="textmd" tag="span" color="$gray_600" ff="$Epilogue-Regular" fos="$3" fow="400">
              Already have an account?
            </Text>
            <Text size="textmd" tag="span" color="$indigo_a700" ff="$Epilogue-Regular" fos="$3" fow="400">
              &nbsp;
            </Text>
            <Text size="textmd" tag="span" color="$indigo_a700" ff="$Epilogue-Bold" fos="$3" fow="700" onPress={() => navigation.navigate("login")}>
              Log in
            </Text>
          </Text>
        </YStack>
      </ScrollView>
    </YStack>
  );
}
