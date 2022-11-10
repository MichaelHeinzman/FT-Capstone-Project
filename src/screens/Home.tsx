import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { userSignout } from "../firebase";

type Props = {};

const Home = (props: Props) => {
  return (
    <View style={styles.home}>
      <Text>Home</Text>
      <TouchableOpacity onPress={userSignout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  home: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
