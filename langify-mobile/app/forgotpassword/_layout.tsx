import { Button, Input, Text, Heading } from "../../components";
import { Stack } from "expo-router";
import { YStack, Image, XStack } from "tamagui";

export default function ForgotPasswordPage() {
  return (
    <YStack h="100%" pt={50} bg="$white_A700" f={1}>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerBackTitle: "Back",
          //   headerBackTitleVisible: false,
          headerTransparent: true,
          header: () => {
            return (
              <XStack
                display="flex"
                h={56}
                ai="center"
              >
                <Image
                  source={require("assets/images/img_icons.png")}
                  h="$6"
                  mr="auto"
                  ml={24}
                  als="flex-end"
                  w={24}
                  objectFit="cover"
                  maw="100%"
                />

                <Heading size="s" tag="h1" ff="$ProductSansBold" fos="$8" fow="700" f={1} mr={48} ta="center">
                  Langify
                </Heading>
              </XStack>
            );
          },
        }}
      />

      <YStack h="100%" pt={28} ai="center" f={1} px="64">
        <Heading tag="h1" color="$gray_800" fos="$6" fow="700">
          Forgot Password
        </Heading>
        <Text color="$gray_600" mt={10} fos="$2" fow="400">
          Enter your email to receive a token
        </Text>
        <YStack mt={40} gap="$2" als="stretch" ai="flex-start">
          <Text size="s" fos="$1" fow="500">
            <Text size="s" tag="span" fos="$1" fow="500" color="$gray_800">
              Email
            </Text>
            <Text size="s" tag="span" fos="$1" fow="500" color="$red_700_01">
              *
            </Text>
          </Text>

          <Input shape="round">
            <Input.Field placeholder="Enter your email here" inputMode="email" placeholderTextColor="$gray_600" />
          </Input>
        </YStack>
        <Button shape="round" mt={40}>
          Submit
        </Button>
      </YStack>

    </YStack>
  );
}
