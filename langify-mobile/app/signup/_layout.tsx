import React, { useState } from 'react';
import { Text, Button, Checkbox, Input, Heading } from '../../components';
import { XStack, Image, YStack, ScrollView } from 'tamagui';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigationTypes';
import { useNavigation } from 'expo-router';

export default function SignUpPage() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleSignUp = async () => {
    if (password !== repeatPassword) {
      alert('Passwords do not match!');
      return;
    }

    // if (!isChecked) {
    //   alert('Please agree to the Terms & Conditions.');
    //   return;
    // }

    try {
      const response = await fetch('https://mt18rivcvf.execute-api.us-east-1.amazonaws.com/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ full_name: fullName, email, password })
      });
      
      const data = await response.json();
      if (response.ok) {
        alert('Signup successful!');
        navigation.navigate('login');
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (error) {
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <YStack bg="$white_a700" f={1}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <YStack pt={32} f={1} ai="center" px="44">
          <Heading size="s" tag="h1" ff="$ProductSansBold" fos="$8" fow="700" color="$indigo_a700">
            Langify
          </Heading>
          <Heading color="$gray_800" mt={30} fos="$6" fow="700">Sign Up</Heading>
          <Text color="$gray_600" mt={10} fos="$2" fow="400">Create your account</Text>

          <YStack mt={40} gap="$2" als="stretch" ai="flex-start">
            <Text size="textxs" fos="$1" fow="500">Full Name*</Text>
            <Input variant="fill" shape="round" boc="$blue_a700_02">
              <Input.Field 
                placeholder="Tushar Imra" 
                placeholderTextColor="$indigo_a700" 
                value={fullName} 
                onChangeText={setFullName}
                style={{ color: '#000' }}
              />
            </Input>
          </YStack>

          <YStack mt={24} gap="$2" als="stretch" ai="flex-start">
            <Text size="textxs" fos="$1" fow="500">Email*</Text>
            <Input shape="round">
              <Input.Field 
                placeholder="Enter your email here" 
                inputMode="email" 
                placeholderTextColor="$gray_600" 
                value={email} 
                onChangeText={setEmail} 
                style={{ color: '#000' }}
              />
            </Input>
          </YStack>

          <YStack mt={24} gap="$2" als="stretch" ai="flex-start">
            <Text size="textxs" fos="$1" fow="500">Password*</Text>
            <Input shape="round">
              <Input.Field 
                placeholder="Must be 8 characters or more" 
                secureTextEntry 
                placeholderTextColor="$gray_600" 
                value={password} 
                onChangeText={setPassword} 
                style={{ color: '#000' }}
              />
            </Input>
          </YStack>

          <YStack mt={24} gap="$2" als="stretch" ai="flex-start">
            <Text size="textxs" fos="$1" fow="500">Repeat Password*</Text>
            <Input shape="round">
              <Input.Field 
                placeholder="Repeat the password again" 
                secureTextEntry 
                placeholderTextColor="$gray_600" 
                value={repeatPassword} 
                onChangeText={setRepeatPassword} 
                style={{ color: '#000' }}
              />
            </Input>
          </YStack>

          <XStack mt={24} als="stretch" ai="center">
            <Checkbox>
              <Checkbox.Field id="1:1916:Field" defaultChecked={true}>
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

          <Button shape="round" mt={40} onPress={handleSignUp}>Sign Up</Button>

          <Text size="textmd" color="$blue_a200" mt={28} mb={30} onPress={() => navigation.navigate('login')}>
            Already have an account? <Text color="$indigo_a700" fow="700">Log in</Text>
          </Text>
        </YStack>
      </ScrollView>
    </YStack>
  );
}
