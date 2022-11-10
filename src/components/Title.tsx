import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {};

const Title = (props: Props) => {
  return (
    <View>
      <Text style={styles.title}>FT Capstone Project Title</Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  title: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
  },
});
