import { StyleSheet, Text, View } from "react-native";
import React from "react";

type Props = {
  title?: String;
};

const Title = ({ title }: Props) => {
  return (
    <View>
      <Text style={styles.title}>{title || "FT Capstone Project Title"}</Text>
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
