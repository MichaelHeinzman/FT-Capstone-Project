import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Background from "../components/Background";
import Title from "../components/Title";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <View style={styles.container}>
      <Background />
      <Title title="Dashboard" />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
