import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Background from "../components/Background";
import { useGetUserEvents } from "../hooks/useGetUserEvents";
import { Agenda } from "react-native-calendars";
import StyledButton from "../components/StyledButton";
import { useNavigation } from "@react-navigation/native";

type Props = {};
const Dashboard = (props: Props) => {
  const { events } = useGetUserEvents();
  const currentDate = formatDate(new Date()).toString();
  const [current, setCurrent] = useState(currentDate);
  const navigation = useNavigation();

  function formatDate(date: Date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const renderEventScreen = () => navigation.navigate("EventForm");
  const renderEmptyDate = () => {
    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemContainer}>No Events on this Day.</Text>
      </View>
    );
  };
  const renderItem = (item: any) => {
    return (
      <View style={styles.itemContainer}>
        <Text>{item.title}</Text>
        <Text>Starts {item.start}</Text>
        <Text>End {item.end}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.safe}>
        <Agenda
          items={events}
          renderItem={renderItem}
          renderEmptyData={renderEmptyDate}
          onDayChange={(day) => setCurrent(day)}
          onDayPress={(day) => setCurrent(day.dateString)}
          current={current}
          disabledByDefault={true}
          refreshing={true}
          showClosingKnob={true}
        />
        <View style={styles.footer}>
          <StyledButton
            buttonStyle={styles.addEvent}
            text="Add Event"
            onPressEvent={renderEventScreen}
          />
        </View>
      </View>
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
    position: "relative",
  },
  safe: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
  },
  text: {
    flex: 1,
    width: "100%",
    color: "#00D1FF",
    fontSize: 20,
    textAlign: "center",
  },
  itemContainer: {
    backgroundColor: "white",
    margin: 5,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 0.2,
    width: "100%",
    padding: 10,
  },
  addEvent: {
    flex: 1,
  },
});
