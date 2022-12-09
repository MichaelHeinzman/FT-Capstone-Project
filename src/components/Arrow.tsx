import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

type Props = {
  direction: String;
  style: any;
  onPressed: React.Dispatch<any>;
};

const Arrow = ({ direction, style, onPressed }: Props) => {
  return (
    <TouchableOpacity onPress={onPressed}>
      <Text style={[styles.arrow, style]}>
        {direction === "left" ? "<" : ">"}
      </Text>
    </TouchableOpacity>
  );
};

export default Arrow;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  arrow: {
    color: "#FFFFFF",
    textAlign: "center",
  },
});
