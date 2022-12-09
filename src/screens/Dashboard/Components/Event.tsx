import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useGetUserSubjects } from "../../../hooks/useGetUserSubjects";
import moment from "moment";
import { Event as EventType } from "../../../types";

type Props = {
  event: EventType;
  navigation: any;
};

const getTime = (event: EventType) => {
  const start: any = moment(event.times.start).format("h:mm A");
  const end: any = moment(event.times.end).format("h:mm A");
  return (
    <View style={styles.timeView}>
      <Text style={styles.time}>{start}</Text>
      <Text style={styles.time}>TO</Text>
      <Text style={styles.time}>{end}</Text>
    </View>
  );
};

const Event = ({ event, navigation }: Props) => {
  const { subjects } = useGetUserSubjects();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("EventView", {
          currentDayPassed: event.dates.start,
          eventToUpdate: event,
        })
      }
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>{event.title}</Text>
        <Text style={styles.subjectTitle}>
          {subjects[event.subject]?.name || event?.subject}
        </Text>
        <Text style={styles.typeTitle}>{event.type}</Text>
        <Text style={styles.text}>
          Average Time:{" "}
          {subjects[event.subject]?.events[event.type]?.averageTimeTook} min
        </Text>
        <Text style={styles.text}>
          Time Set : {event.times.timeExpectedToSpend} min
        </Text>
      </View>
      <View
        style={{
          height: "80%",
          width: "1%",
          backgroundColor: event.color,
          borderRadius: 5,
        }}
      />
    </TouchableOpacity>
  );
};

export default Event;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    borderRadius: 10,
    shadowColor: "#2E66E7",
    backgroundColor: "#ffffff",
    paddingLeft: 10,
    shadowOffset: {
      width: 3,
      height: 3,
    },
    margin: 5,
  },

  content: {
    flex: 1,
    width: "100%",
  },
  title: {
    color: "#554A4C",
    fontSize: 20,
    fontWeight: "800",
  },
  subjectTitle: {
    fontSize: 18,
    fontWeight: "500",
  },
  typeTitle: {
    fontSize: 16,
    fontWeight: "500",
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
  },
  time: {
    flex: 1,
    color: "aqua",
    fontSize: 12,
    fontWeight: "700",
    padding: 10,
  },
  timeContainer: {
    flex: 0.3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  timeView: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
