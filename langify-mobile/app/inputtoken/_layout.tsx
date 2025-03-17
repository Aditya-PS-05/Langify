// Image 2:
import { Text, Button, Heading } from "../../components";
import { Stack } from "expo-router";
import { OtpInput } from "react-native-otp-entry";
import { YStack, Image, XStack } from "tamagui";

export default function InputTokenPage() {
    return (
        <YStack h="100%" pt={56} bg="$white_a700" f={1}>
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
                                    h="36"
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
                    },
                }}
            />
            <YStack h="100%" pt={28} ai="center" f={1} px={22}>
                <Heading tag="h1" color="$gray_800" fos="$6" fow="700">
                    Input Token
                </Heading>
                <Text color="$gray_600" mt={10} ta="center" fos="$2" fow="400" als="stretch" lh={17}>
                    Enter the token you received to reset your password.
                </Text>
                <OtpInput
                    numberOfDigits={6}
                    focusColor="#ffffff"
                    theme={{
                        containerStyle: {
                            // Image 1 (partial code snippet):
                            display: "flex",
                            justifyContent: "center",
                            gap: 4,
                            marginTop: 36,
                            alignSelf: "stretch",
                            padding: 12,
                        },
                        pinCodeTextStyle: { color: "#ffffff", fontFamily: "EpilogueRoman-Bold", textAlign: "center" },
                        filledPinCodeContainerStyle: { backgroundColor: "#254eda", borderRadius: 5 },
                        focusedPinCodeContainerStyle: { backgroundColor: "#254eda", borderRadius: 5 },
                        pinCodeContainerStyle: {
                            borderWidth: 1,
                            borderRadius: 5,
                            borderColor: "#828282",
                            borderStyle: "solid",
                            height: 56,
                            width: 48,
                        }
                    }}
                />
                <Button shape="round" mt={38}>
                    Submit
                </Button>
                <Text size="s" color="$blue_a200" mt={36} ff="$SFProDisplayMedium" ta="center" fos="$3" fow="500" lh="32">
                    <Text size="s" tag="span" color="$gray_600" ff="$Epilogue-Regular" ta="center" fos="$3" fow="400">
                        Didn't receive an email?{"\n"}
                    </Text>
                </Text>
                <Text size="s" tag="span" color="$indigo_a700" ff="$Epilogue-Regular" ta="center" fos="$3" fow="400">
                    &nbsp;
                    Resend
                </Text>
            </YStack>
        </YStack>
    );
}