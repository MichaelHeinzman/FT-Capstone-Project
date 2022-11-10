import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import Title from "../components/Title";
import { signup } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import StyledButton from "../components/StyledButton";
import StyledTextInput from "../components/StyledTextInput";

type Props = {};

const Login = (props: Props) => {
  const navigation = useNavigation();
  const [error, setError] = useState(null);
  const [signupInfo, setSignupInfo] = useState({
    email: "",
    password: "",
  });

  const updateSignupInfo = (index: string, value: string) =>
    setSignupInfo({ ...signupInfo, [index]: value });

  const handleSignupPressed = () => {
    signup(signupInfo.email, signupInfo.password, setError);
  };
  const handleLoginPressed = () => navigation.navigate("Login");
  return (
    <View style={styles.login}>
      <LinearGradient
        colors={["#505050", "#00D1FF"]}
        start={{ x: 0, y: 0.65 }}
        end={{ x: 1, y: 0.45 }}
        locations={[0.5, 0.5]}
        style={styles.background}
      ></LinearGradient>
      <LinearGradient
        colors={["#000000", "rgba(0, 0, 0, 0.9)", "#3E3C3C"]}
        style={styles.background}
      ></LinearGradient>
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
              onChangeEvent={(v: string) => updateSignupInfo("email", v)}
              value={signupInfo.password}
              error={error}
            />
          </View>
          <View style={styles.input}>
            <StyledTextInput
              placeholder="Password"
              placeholderTextColor="black"
              secureTextEntry={true}
              onChangeEvent={(v: string) => updateSignupInfo("password", v)}
              value={signupInfo.password}
              error={error}
            />
          </View>
        </View>
        <View style={styles.buttons}>
          <View style={styles.button}>
            <StyledButton text="Signup" onPressEvent={handleSignupPressed} />
          </View>
          <TouchableOpacity
            onPress={handleLoginPressed}
            style={styles.loginNow}
          >
            <Text style={styles.text}>
              Already have an account? <Text style={styles.bold}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
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
});
