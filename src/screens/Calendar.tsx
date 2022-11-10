import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { userSignout } from "../firebase";
import Background from "../components/Background";

type Props = {};

const Calendar = (props: Props) => {
  return (
    <View style={styles.container}>
      <Background />
      <Text>Calendar</Text>
      <TouchableOpacity onPress={userSignout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
