import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import NewPostScreen from './screens/NewPostScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';

const Stack = createNativeStackNavigator();

const screenOptions = {
    headerShown: false
}

export const SignedInStack = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="NewPost" component={NewPostScreen} />
        </Stack.Navigator>
    </NavigationContainer>
)

export const SignedOutStack = () =>(
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={screenOptions}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
    </NavigationContainer>
)

