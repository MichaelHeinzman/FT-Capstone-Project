import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import StyledButton from "../components/StyledButton";
import StyledTextInput from "../components/StyledTextInput";
import Title from "../components/Title";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { resetPassword } from "../firebase";
import Background from "../components/Background";

type Props = {};

const ForgotPassword = (props: Props) => {
  const [email, setEmail] = useState<string>("");
  const [sent, setSent] = useState<boolean>(false);
  const [error, setError] = useState(null);

  const navigation = useNavigation();
  const handleLoginPressed = () => navigation.navigate("Login");

  // Firebase Calls
  const handleResetPasswordPressed = () => {
    resetPassword(email);
    setSent(true);
  };

  return (
    <View style={styles.login}>
      <Background auth />
      <View style={styles.content}>
        <View style={styles.title}>
          <Title />
        </View>
        <View style={styles.inputs}>
          <View style={styles.input}>
            <StyledTextInput
              placeholder="Email"
              placeholderTextColor="black"
              secureTextEntry={false}
              onChangeEvent={(v: string) => setEmail(v)}
              value={email}
              error={error}
            />
          </View>
        </View>
        <View style={styles.buttons}>
          <View style={styles.button}>
            <StyledButton
              text="Reset Password"
              onPressEvent={handleResetPasswordPressed}
            />
          </View>
          <TouchableOpacity
            onPress={handleLoginPressed}
            style={styles.loginNow}
          >
            <Text style={styles.text}>
              Remember your password? <Text style={styles.bold}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  login: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  content: {
    flex: 1,
    width: "100%",
    padding: 40,
    paddingTop: 60,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    flex: 0.2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  inputs: {
    flex: 0.2,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 0.5,
    width: "100%",
    marginTop: 10,
  },
  forgotPassword: {
    flex: 0.4,
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    fontWeight: "bold",
  },
  buttons: {
    flex: 0.4,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flex: 0.4,
    width: "100%",
  },
  loginNow: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    flex: 1,
    width: "100%",
    margin: 20,
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
  bold: {
    fontWeight: "bold",
  },

  verificationContainer: {
    flex: 1,
    width: "100%",
  },
});
