import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Background from "../components/Background";
import Title from "../components/Title";
import { userSignout } from "../firebase";
import StyledTextInput from "../components/StyledTextInput";
import StyledButton from "../components/StyledButton";

type Props = {};

const Settings = (props: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [updateInformationPressed, setUpdateInformationPressed] =
    useState(false);

  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.content}>
        <StyledTextInput
          placeholderTextColor="rgb(169,169,169)"
          value={username}
          placeholder={"Change Email Here"}
          onChangeEvent={(v) => setUsername(v)}
          secureTextEntry={false}
          error={null}
          givenStyles={styles.row}
        />
        <StyledTextInput
          placeholderTextColor="rgb(169,169,169)"
          value={password}
          placeholder={"Change Password Here"}
          onChangeEvent={(v) => setPassword(v)}
          secureTextEntry={false}
          error={null}
          givenStyles={styles.row}
        />
        {(username || password) && (
          <StyledButton
            text="Save Changes"
            onPressEvent={() => userSignout()}
            buttonStyle={[styles.row, { backgroundColor: "lime" }]}
          />
        )}

        <StyledButton
          text="Delete All Data"
          onPressEvent={() => userSignout()}
          buttonStyle={[styles.row, { backgroundColor: "red" }]}
        />
        <StyledButton
          text="Delete Account"
          onPressEvent={() => userSignout()}
          buttonStyle={[styles.row, { backgroundColor: "red" }]}
        />
        <StyledButton
          text="Logout"
          onPressEvent={() => userSignout()}
          buttonStyle={styles.row}
        />
      </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  row: {
    flex: 0.2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
});
