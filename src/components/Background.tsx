import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  auth?: boolean;
};

const Background = ({ auth = false }: Props) => {
  return (
    <>
      {/* Background */}
      <LinearGradient
        colors={["#505050", "#00D1FF"]}
        start={{ x: 0, y: 0.65 }}
        end={{ x: 1, y: 0.45 }}
        locations={[0.5, 0.5]}
        style={styles.background}
      ></LinearGradient>
      <LinearGradient
        colors={[
          "#000000",
          "rgba(0, 0, 0, 0.9)",
          `${auth ? "#3E3C3C" : "rgba(0,0,0,.9)"}`,
        ]}
        style={styles.background}
      ></LinearGradient>
    </>
  );
};

export default Background;

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    height: "100%",
    width: "100%",
  },
});
