
import { Text, Button, Checkbox, Input, Heading } from "../../components";
import { XStack, Image, YStack } from "tamagui";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigationTypes";
import { useNavigation } from "expo-router";

export default function LogInPage() {
    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    return (
        <YStack h="100%" bg="$white_a700" f={1}>
            <YStack h="100%" pt={32} gap="$5" ai="center" f={1} px="$4">
                <Heading size="s" tag="h1" ff="$ProductSansBold" fos="$8" fow="700">
                    <Heading size="s" tag="span" ff="$ProductSansBold" fos="$8" fow="700" color="$indigo_a700">
                        sova
                    </Heading>
                    <Heading size="s" tag="span" ff="$ProductSansBold" fos="$8" fow="700" color="$deep_orange_a2">
                        .
                    </Heading>
                </Heading>

                <YStack als="stretch" ai="center">
                    <Heading color="$gray_800" fos="$6" fow="700">
                        Log In
                    </Heading>
                    <Text color="$gray_600" mt={10} fos="$2" fow="400">
                        Log in to your account
                    </Text>

                    <Text size="textxs" mt={40} fos="$1" fow="500" als="flex-start">
                        <Text size="textxs" tag="span" fos="$1" fow="500" color="$gray_800">
                            Email
                        </Text>
                        <Text size="textxs" tag="span" fos="$1" fow="500" color="$red_700_01">
                            *
                        </Text>
                    </Text>

                    <Input shape="round" variant="fill" mt={8} boc="$blue_a700_02">
                        <Input.Field
                            placeholder="tusharimran092@gmail.com"
                            inputMode="email"
                            placeholderTextColor="$indigo_a700"
                        />
                    </Input>



                    <Text size="textxs" mt={24} fos="$1" fow="500" als="flex-start">
                        <Text size="textxs" tag="span" fos="$1" fow="500" color="$gray_800">
                            Password
                        </Text>
                        <Text size="textxs" tag="span" fos="$1" fow="500" color="$red_700_01">
                            *
                        </Text>
                    </Text>

                    <Input shape="round" mt={8}>
                        <Input.Field placeholder="********" secureTextEntry placeholderTextColor="$gray_600" />
                        <Input.RightIcon>
                            <Image
                                source={require("assets/images/img_eyeoff.png")}
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
                            <Checkbox.Field id="1:1839:Field" defaultChecked={false}>
                                <Checkbox.Indicator>
                                    <Checkbox.Icon size="$5" />
                                </Checkbox.Indicator>
                            </Checkbox.Field>
                            <Checkbox.Label htmlFor="1:1839:Field" size="$2" color="$gray_600">
                                Remember Me
                            </Checkbox.Label>
                        </Checkbox>
                        <Text color="$indigo_a700" fos="$2" fow="400" als="flex-end" onPress={() => navigation.navigate("forgotpassword")}>
                            Forgot Password?
                        </Text>
                    </XStack>

                    <Button shape="round" mt={40}>
                        Log In
                    </Button>

                    <Text size="textmd" color="$blue_a200" mt={28} ff="$SFProDisplayMedium" fos="$3" fow="500">
                        <Text size="textmd" tag="span" color="$gray_600" ff="$Epilogue-Regular" fos="$3" fow="400">
                            Don’t have an account?
                        </Text>
                        <Text size="textmd" tag="span" color="$indigo_a700" ff="$Epilogue-Regular" fos="$3" fow="400">
                            &nbsp;
                        </Text>
                        <Text size="textmd" tag="span" color="$indigo_a700" ff="$Epilogue-Bold" fos="$3" fow="700" onPress={() => navigation.navigate("signup")}>
                            Sign Up
                        </Text>
                    </Text>
                </YStack>
            </YStack>
        </YStack>
    );
}