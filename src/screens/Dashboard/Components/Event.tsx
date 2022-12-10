import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useGetUserSubjects } from "../../../hooks/useGetUserSubjects";
import moment from "moment";
import { Event as EventType } from "../../../types";

type Props = {
  event: EventType;
  navigation: any;
};

const Event = ({ event, navigation }: Props) => {
  const { subjects } = useGetUserSubjects();
  const time = parseInt(moment(event.dates.start).format("mm")) / 60;
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("EventView", {
          currentDayPassed: event.dates.start,
          eventToUpdate: event,
        })
      }
      style={[styles.container]}
    >
      <View style={[styles.content]}>
        <Text style={[styles.title]}>{event.title}</Text>
      </View>
      <View
        style={{
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          position: "absolute",
          backgroundColor: event.color,
          opacity: 0.4,
        }}
      ></View>
    </TouchableOpacity>
  );
};

export default Event;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    margin: 5,
    position: "relative",
  },

  content: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 12,
    fontWeight: "800",
    width: "100%",
    color: "white",
    textAlign: "center",
  },
  subjectTitle: {
    fontSize: 16,
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
