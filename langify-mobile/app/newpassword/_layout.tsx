import { Text, Button, Heading, Input } from "../../components";
import { Stack } from "expo-router";
import { YStack, Image, XStack } from "tamagui";

export default function NewPasswordPage() {
    return (
      <XStack h="100%" pt={56} bg="$white_a700" f={1}>
        <Stack.Screen
          options={{
            headerShadowVisible: false,
            // headerBackTitleVisible: false,
            headerTransparent: true,
            header: () => {
              return (
                <XStack dsp="flex" h={56} ai="center">
                  <Image
                    source={require("assets/images/img_icons.png")}
                    h={56}
                    ml={24}
                    als="flex-end"
                    w={24}
                    objectFit="cover"
                    mr="auto"
                    maw="100%"
                  />
                  <Heading size="s" tag="h1" ff="$ProductSansBold" fos="$8" fow="700" f={1} mr={48} ta="center">
                    Langify.
                  </Heading>
                </XStack>
              );
            }
          }}
        />
        <XStack h="100%" pt={26} ai="center" f={1} px="64">
          <Heading tag="h1" color="$gray_800" fos="$6" fow="700">
            New Password
          </Heading>
          <Text color="$gray_600" mt={14} fos="$2" fow="400">
            Enter a new password
          </Text>
          <XStack mt={40} gap="$2" als="stretch" ai="flex-start">
            <Text size="s" fos="$1" fow="500">
              Password
            </Text>
            <Input shape="round">
              <Input.Field
                placeholder="Must be 8 characters or more"
                secureTextEntry
                placeholderTextColor="$gray_600"
              />
            </Input>
          </XStack>
          <XStack mt={24} gap="$2" als="stretch" ai="flex-start">
            <Text size="s" fos="$1" fow="500">
              Repeat Password
            </Text>
            <Input shape="round">
              <Input.Field
                placeholder="Repeat the password again"
                secureTextEntry
                placeholderTextColor="$gray_600"
              />
            </Input>
          </XStack>
          <Button shape="round" mt={40}>
            Save New Password
          </Button>
        </XStack>
      </XStack>
    );
  }
  