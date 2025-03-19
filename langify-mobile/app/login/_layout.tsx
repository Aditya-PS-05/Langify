import React, { useState } from 'react';
import { Text, Button, Checkbox, Input, Heading } from '../../components';
import { XStack, Image, YStack } from 'tamagui';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigationTypes';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LogInPage() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch('https://mt18rivcvf.execute-api.us-east-1.amazonaws.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('access_token', data.access_token);
        await AsyncStorage.setItem('refresh_token', data.refresh_token);
        await AsyncStorage.setItem('user_id', data.user_id);
        await AsyncStorage.setItem('email', data.email);
        alert('Login successful!');
        navigation.navigate('home');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <YStack h="100%" bg="$white_a700" f={1}>
      <YStack h="100%" pt={32} gap="$5" ai="center" f={1} px="$4">
        <Heading size="s" tag="h1" ff="$ProductSansBold" fos="$8" fow="700">
          <Heading size="s" tag="span" ff="$ProductSansBold" fos="$8" fow="700" color="$indigo_a700">
            Langify
          </Heading>
          <Heading size="s" tag="span" ff="$ProductSansBold" fos="$8" fow="700" color="$deep_orange_a2">.</Heading>
        </Heading>

        <YStack als="stretch" ai="center">
          <Heading color="$gray_800" fos="$6" fow="700">Log In</Heading>
          <Text color="$gray_600" mt={10} fos="$2" fow="400">Log in to your account</Text>

          <Input shape="round" variant="fill" mt={8} boc="$blue_a700_02">
            <Input.Field
              placeholder="Enter your email"
              inputMode="email"
              placeholderTextColor="$indigo_a700"
              value={email}
              onChangeText={setEmail}
              style={{ color: '#000' }}
            />
          </Input>

          <Input shape="round" mt={24}>
            <Input.Field
              placeholder="Enter your password"
              secureTextEntry
              placeholderTextColor="$gray_600"
              value={password}
              onChangeText={setPassword}
              style={{ color: '#000' }}
            />
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

          <Button shape="round" mt={40} onPress={handleLogin}>Log In</Button>

          <Text size="s" color="$blue_a200" mt={28} ff="$SFProDisplayMedium" fos="$3" fow="500">
            <Text size="s" color="$gray_600">Don’t have an account?</Text>
            <Text size="s" color="$indigo_a700" onPress={() => navigation.navigate('signup')}> Sign Up</Text>
          </Text>
        </YStack>
      </YStack>
    </YStack>
  );
}
