import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

type Props = {
  givenStyles?: object;
  placeholder: string;
  placeholderTextColor: string;
  secureTextEntry: boolean;
  value: string;
  error: null | string;
  keyboardType?: any;
  onChangeEvent: (v: string) => void;
};

const StyledTextInput = ({
  givenStyles,
  placeholder,
  placeholderTextColor,
  secureTextEntry,
  value,
  error,
  keyboardType,
  onChangeEvent,
}: Props) => {
  return (
    <TextInput
      keyboardType={keyboardType}
      style={
        error
          ? [styles.input, givenStyles, styles.error]
          : [styles.input, givenStyles]
      }
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={onChangeEvent}
    />
  );
};

export default StyledTextInput;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    width: "100%",
    borderRadius: 10,
    border: 0,
    backgroundColor: "white",
    padding: 5,
  },
  error: {
    borderColor: "red",
    borderWidth: 3,
  },
});
