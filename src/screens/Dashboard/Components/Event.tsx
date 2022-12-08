import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useGetUserSubjects } from "../../../hooks/useGetUserSubjects";

type Props = {
  event: any;
  navigation: any;
};

const getTime = (time: string) => {
  var options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const date: any = new Date(time);
  const time2 = date.toLocaleString("en-US", options);
  return <Text>{time2}</Text>;
};

const getTimeEnd = (time: string, timeExpected: number) => {
  var options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const date: any = new Date(time);
  date.setMinutes(date.getMinutes() + timeExpected);
  time = date.toLocaleTimeString("en-US", options);
  return <Text>{time}</Text>;
};

const Event = ({ event, navigation }: Props) => {
  const { subjects } = useGetUserSubjects();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("EventForm", {
          currentDayPassed: event.date,
          eventToUpdate: event,
        })
      }
      key={event.id}
      style={styles.event}
    >
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{getTime(event.start)}</Text>
        <Text style={styles.time}>to</Text>
        <Text style={styles.time}>
          {getTimeEnd(event.start, parseInt(event.timeExpectedToSpend))}
        </Text>
      </View>

      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.subjectTitle}>
            {subjects[event.subject]?.name || event?.subject}
          </Text>
          <Text style={styles.subjectTitle}>
            Average Time:{" "}
            {subjects[event.subject]?.events[event.type]?.averageTimeTook} min
          </Text>
          <Text style={styles.subjectTitle}>
            Time Set : {event.timeExpectedToSpend} min
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
      </View>
    </TouchableOpacity>
  );
};

export default Event;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "#2E66E7",
    backgroundColor: "#ffffff",
    paddingLeft: 10,
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
  event: {
    flex: 1,
    width: "90%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
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
    fontSize: 14,
    fontWeight: "500",
  },
  time: {
    flex: 0.5,
    color: "#FFFFFF",
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
});
