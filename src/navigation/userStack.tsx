import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { RootStackParamList } from "../types";
import NavigationBar from "./NavigationBar";
import Dashboard from "../screens/Dashboard/Dashboard";
import Settings from "../screens/Settings";
import EventForm from "../screens/EventForm/EventForm";

const Stack = createStackNavigator<RootStackParamList>();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
        <Stack.Screen
          name="EventForm"
          component={EventForm}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <NavigationBar />
    </NavigationContainer>
  );
}
