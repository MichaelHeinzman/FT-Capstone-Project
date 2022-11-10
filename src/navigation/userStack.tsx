import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Calendar from "../screens/Calendar";
import { RootStackParamList } from "../types";
import NavigationBar from "./NavigationBar";
import Dashboard from "../screens/Dashboard";
import Settings from "../screens/Settings";

const Stack = createStackNavigator<RootStackParamList>();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Calendar"
          component={Calendar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <NavigationBar />
    </NavigationContainer>
  );
}
