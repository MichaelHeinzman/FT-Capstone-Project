import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";

type Props = {
  buttonStyle?: object;
  textStyle?: object;
  text: string;
  onPressEvent: () => void;
};

const StyledButton = ({
  buttonStyle,
  textStyle,
  text,
  onPressEvent,
}: Props) => {
  return (
    <TouchableOpacity
      style={[styles.button, buttonStyle]}
      onPress={onPressEvent}
    >
      <Text style={[textStyle, styles.text]}>{text}</Text>
    </TouchableOpacity>
  );
};

export default StyledButton;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    width: "100%",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: 5,
    backgroundColor: "#00D1FF",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 34,
    fontWeight: "bold",
  },
});
