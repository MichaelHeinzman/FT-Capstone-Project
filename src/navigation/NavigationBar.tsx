import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const DASHBOARD_IMG = "../assets/images/dashboard.png";
const SETTINGS_IMG = "../assets/images/settings.png";
const CALENDAR_IMG = "../assets/images/calendar.png";

type Props = {};

const NavigationBar = (props: Props) => {
  const navigation = useNavigation();
  const handleNavButtonClicked = (page: any) => navigation.navigate(page);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleNavButtonClicked("Dashboard")}>
        <Image
          style={styles.image}
          source={require("../assets/images/dashboard.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleNavButtonClicked("Settings")}>
        <Image
          style={styles.image}
          source={require("../assets/images/settings.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

export default NavigationBar;

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: "100%",
    backgroundColor: "rgba(0,0,10,1)",
    bottom: 0,
    padding: 10,
    paddingBottom: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    flex: 0.5,
    resizeMode: "contain",
  },
});
