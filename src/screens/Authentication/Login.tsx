import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import Title from "../../components/Title";
import { login } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import StyledTextInput from "../../components/StyledTextInput";
import StyledButton from "../../components/StyledButton";
import Background from "../../components/Background";

type Props = {};

const Login = (props: Props) => {
  // State
  const [error, setError] = useState(null);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  // Used for screen navigation.
  const navigation = useNavigation();

  // Updates LoginInfo State by copying loginInfo and changing a specific value.
  const updateLoginInfo = (index: string, value: string) =>
    setLoginInfo({ ...loginInfo, [index]: value });

  // Calls the login from firebase.ts when user presses login button.
  const handleLoginPressed = () =>
    login(loginInfo.email, loginInfo.password, setError);

  // Calls the navigation stack to navigate to page.
  const handleRegisterNowPressed = () => navigation.navigate("Signup");
  const handleForgotPasswordPressed = () =>
    navigation.navigate("ForgotPassword");

  return (
    <View style={styles.login}>
      <Background auth />
      {/* Content */}
      <View style={styles.content}>
        {/* Title */}
        <View style={styles.title}>
          <Title />
        </View>

        {/* Inputs and Forgot Password */}
        <View style={styles.inputs}>
          <View style={styles.input}>
            <StyledTextInput
              placeholder="Email"
              placeholderTextColor="black"
              secureTextEntry={false}
              onChangeEvent={(v: string) => updateLoginInfo("email", v)}
              value={loginInfo.email}
              error={error}
            />
          </View>
          <View style={styles.input}>
            <StyledTextInput
              placeholder="Password"
              placeholderTextColor="black"
              secureTextEntry={true}
              onChangeEvent={(v: string) => updateLoginInfo("password", v)}
              value={loginInfo.password}
              error={error}
            />
          </View>

          {/* Login Button and Register Now */}
          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={handleForgotPasswordPressed}
          >
            <Text style={[styles.bold, styles.text]}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttons}>
          <View style={styles.button}>
            <StyledButton text="Login" onPressEvent={handleLoginPressed} />
          </View>
          <TouchableOpacity
            onPress={handleRegisterNowPressed}
            style={styles.registerNow}
          >
            <Text style={styles.text}>
              Don't have an account?{" "}
              <Text style={styles.bold}>Register now</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;

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
    flex: 0.4,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 0.3,
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
  registerNow: {
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
});
