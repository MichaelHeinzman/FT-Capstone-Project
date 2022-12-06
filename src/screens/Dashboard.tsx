import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Background from "../components/Background";
import Title from "../components/Title";
import { useGetUserEvents } from "../hooks/useGetUserEvents";
import StyledButton from "../components/StyledButton";
import { addEvent } from "../firebase";

type Props = {};
const Dashboard = (props: Props) => {
  const { events } = useGetUserEvents();

  const event = () => {
    addEvent({ date: "12/01/2022" });
  };
  return (
    <View style={styles.container}>
      <Background />
      <Title title="Dashboard" />
      {events.map((item: any) => {
        let data = item.data();
        return <Title key={item.id} title={data.date} />;
      })}
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
  text: {
    color: "white",
  },
});
