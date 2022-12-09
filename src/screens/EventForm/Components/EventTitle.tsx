import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import StyledTextInput from "../../../components/StyledTextInput";
import StyledButton from "../../../components/StyledButton";

type Props = {
  title: string;
  setTitle: React.Dispatch<any>;
};

const EventTitle = ({ title, setTitle }: Props) => {
  return (
    <View style={styles.titleContainer}>
      <View style={styles.titleInput}>
        <StyledTextInput
          value={title}
          placeholder="Event Title Here"
          placeholderTextColor="grey"
          onChangeEvent={(v: string) => setTitle(v)}
          secureTextEntry={false}
          error={null}
          givenStyles={styles.input}
        />
      </View>
    </View>
  );
};

export default EventTitle;

const styles = StyleSheet.create({
  titleContainer: {
    flex: 0.1,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  titleInput: {
    flex: 1,
    width: "100%",
  },
  input: {
    fontSize: 20,
    padding: 5,
  },
  titleButton: {
    flex: 0.3,
    width: "80%",
  },
});
