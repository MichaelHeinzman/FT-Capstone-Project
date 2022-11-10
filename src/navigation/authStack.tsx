import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// import WelcomeScreen from "../screens/Welcome";
import SignInScreen from "../screens/Login";
import SignOutScreen from "../screens/Signup";
import { RootStackParamList } from "../types";
import ForgotPassword from "../screens/ForgotPassword";

const Stack = createStackNavigator<RootStackParamList>();

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={SignOutScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
