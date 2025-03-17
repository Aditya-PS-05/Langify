import { Text, Button, Checkbox, Input, Heading } from '../../components';
import { XStack, Image, YStack } from "tamagui";

export default function WrongPasswordLogInPage() {
  return (
    <YStack h="100%" bg="$white_a700">
      <YStack h="100%" pt={32} gap="$5" ai="center" f={1} pl="$4">
        <Heading size="s" tag="h1" ff="$ProductSansBold" fos="$8" fow="700" color="$indigo_a700">
        Langify
        </Heading>
        <Heading size="s" tag="span" ff="$ProductSansBold" fos="$8" fow="700" color="$deep_orange_a200">
        </Heading>
      </YStack>

      <YStack als="stretch" ai="center">
        <Heading color="$gray_800" fos="$6" fow="700">
          Log In
        </Heading>
        <Text color="$gray_600" mt={10} fos="$2" fow="400">
          Log in to your account
        </Text>

        <Text size="s" mt={40} fos="$1" fow="500" als="flex-start">
          <Text size="s" tag="span" fos="$1" fow="500" color="$gray_800">
            Email
          </Text>
          <Text size="s" tag="span" fos="$1" fow="500" color="$red_700_01">
            *
          </Text>
        </Text>

        <Input variant="fill" shape="round" mt={8} boc="$blue_a700_02">
          <Input.Field
            placeholder={"tusharimran092@gmail.com"}
            inputMode="email"
            placeholderTextColor="indigo_a700"
          />
        </Input>

        <Text size="s" color="$red_700" mt={24} fos="$1" fow="500" als="flex-start">
          <Text size="s" tag="span" color="$red_700" fos="$1" fow="500">
            Wrong Password
          </Text>
          <Text size="s" tag="span" color="$red_700_01" fos="$1" fow="500">
            *
          </Text>
        </Text>

        <Input shape="round" mt={8}>
          <Input.Field placeholder={"amirkhan123"} secureTextEntry placeholderTextColor="red_700" />
          <Input.RightIcon>
            <Image
              source={require("assets/images/img_error.png")}
              h="56"
              ml={16}
              w={24}
              bg=""
              objectFit="contain"
            />
          </Input.RightIcon>
        </Input>

        <XStack mt={24} als="stretch" jc="space-between" ai="center">
          <Checkbox>
            <Checkbox.Field id="1:1872:Field" defaultChecked={false}>
              <Checkbox.Indicator>
                <Checkbox.Icon size="$5" />
              </Checkbox.Indicator>
            </Checkbox.Field>
            <Checkbox.Label htmlFor="1:1872:Field" size="$2" color="$gray_600">
              Remember Me
            </Checkbox.Label>
          </Checkbox>
          <Text color="$indigo_a700" fos="$2" fow="400" als="flex-end">
            Forgot Password?
          </Text>
        </XStack>
        <Button shape="round" colorScheme="gray_400" mt={40}>
          Log In
        </Button>

        <Text size="s" color="blue_a200" mt={28} ff="$SFProDisplayMedium" fos="$3" fow="500">
          <Text size="s" tag="span" color="$gray_600" ff="$Epilogue-Regular" fos="$3" fow="400">
            Don’t have an account?
          </Text>
          <Text size="s" tag="span" color="$indigo_a700" ff="$Epilogue-Regular" fos="$3" fow="400">
            &nbsp;
          </Text>
          <Text size="s" tag="span" color="$indigo_a700" ff="$Epilogue-Bold" fos="$3" fow="700">
            Sign Up
          </Text>
        </Text>
      </YStack>
    </YStack>
  );
}
