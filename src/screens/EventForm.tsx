import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Background from "../components/Background";
import Title from "../components/Title";
import StyledButton from "../components/StyledButton";
import { useNavigation } from "@react-navigation/native";
import StyledTextInput from "../components/StyledTextInput";
import { addEvent } from "../firebase";

type Props = {};

const EventForm = (props: Props) => {
  const navigation = useNavigation();
  const [formInfo, setFormInfo] = useState({
    name: "",
    date: "",
  });

  const updateFormInfo = (type: string, data: any) =>
    setFormInfo({ ...formInfo, [type]: data });

  const back = () => navigation.navigate("Dashboard");

  const submitForm = () => {
    addEvent(formInfo);
    back();
  };
  return (
    <View style={styles.container}>
      <Background />
      <StyledButton text="back" buttonStyle={styles.back} onPressEvent={back} />
      <Title title="Event Form" />
      <View style={styles.inputs}>
        <StyledTextInput
          placeholder="Event Name"
          placeholderTextColor="black"
          secureTextEntry={false}
          onChangeEvent={(v: string) => updateFormInfo("name", v)}
          value={formInfo.name}
          error={null}
        />
        <StyledTextInput
          placeholder="Date"
          placeholderTextColor="black"
          secureTextEntry={false}
          onChangeEvent={(v: string) => updateFormInfo("date", v)}
          value={formInfo.date}
          error={null}
        />
      </View>

      <StyledButton
        text="Submit"
        buttonStyle={styles.back}
        onPressEvent={submitForm}
      />
    </View>
  );
};

export default EventForm;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  back: {
    flex: 0.1,
    width: "25%",
  },
  inputs: {
    flex: 0.1,
    width: "100%",
  },
});
