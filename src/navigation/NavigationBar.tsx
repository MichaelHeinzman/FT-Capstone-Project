import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { AuthErrorCodes } from "firebase/auth";
import { RootStackParamList } from "../types";

type Props = {};

const NavigationBar = (props: Props) => {
  const navigation = useNavigation();

  const handleNavButtonClicked = (page: any) => navigation.navigate(page);

  return (
    <View style={styles.container}>
      <Text onPress={() => handleNavButtonClicked("Dashboard")}>Dashboard</Text>
      <Text onPress={() => handleNavButtonClicked("Calendar")}>Calendar</Text>
      <Text onPress={() => handleNavButtonClicked("Settings")}>Settings</Text>
    </View>
  );
};

export default NavigationBar;

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
