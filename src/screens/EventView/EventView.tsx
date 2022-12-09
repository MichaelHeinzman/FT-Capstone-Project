import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Background from "../../components/Background";
import Title from "../../components/Title";

type Props = {
  navigation: any;
  route: any;
};

const EventView = ({ navigation, route }: Props) => {
  const { currentDayPassed, eventToUpdate: event } = route.params;
  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.actualContainer}>
        <View style={styles.header}>
          {/* Back button. */}
          <TouchableOpacity
            style={styles.backContainer}
            onPress={() => navigation.navigate("Dashboard")}
          >
            <Text style={[styles.backText, { color: event.color }]}>Back</Text>
          </TouchableOpacity>

          {/* Header title explaining what this component is. */}
          <Text style={styles.headerText}>Event Details</Text>

          {/* Edit button. */}
          <TouchableOpacity
            style={styles.backContainer}
            onPress={() =>
              navigation.navigate("EventForm", {
                currentDayPassed: currentDayPassed,
                eventToUpdate: event,
              })
            }
          >
            <Text style={[styles.backText, { color: event.color }]}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Actual details of the Event. */}
        <View style={styles.content}>
          {/* Title of Event */}
          <Text style={[styles.title]}>
            {event.title ? event.title : "No Title"}
          </Text>

          {/* Event Subject and Type */}
          <View style={styles.row}>
            {/* Event Subject */}
            <View
              style={{
                backgroundColor: event.color,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                padding: 10,
                margin: 5,
                marginLeft: 0,
              }}
            >
              <Text style={styles.subjectText}>
                {event.subject ? event.subject : "No Subject"}
              </Text>
            </View>

            {/* Event Type */}
            <View
              style={{
                backgroundColor: event.color,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                padding: 10,
                margin: 5,
              }}
            >
              <Text style={styles.typeText}>
                {event.type ? event.type : "No Type"}
              </Text>
            </View>
          </View>

          <Text style={styles.text}>
            Time Expected To Take: {event.times.timeExpectedToTake}
          </Text>
        </View>

        {/* Finished button. */}
        <TouchableOpacity style={styles.backContainer} onPress={() => {}}>
          <Text style={styles.backText}>Mark As Finished</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EventView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  actualContainer: {
    flex: 1,
    width: "100%",
    padding: 15,
  },
  row: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  header: {
    flex: 0.1,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    flex: 1,
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },

  backText: {
    fontSize: 18,
    fontWeight: "500",
    color: "aqua",
  },
  backContainer: {
    flex: 0.2,
    width: "100%",
  },

  content: {
    flex: 0.9,
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  title: {
    flex: 0.1,
    fontSize: 20,
    color: "white",
    fontWeight: "700",
  },
  subjectText: {
    fontSize: 18,
    color: "white",
    fontWeight: "500",
  },
  typeText: {
    fontSize: 18,
    color: "white",
    fontWeight: "500",
  },
  text: {
    flex: 0.1,
    fontSize: 14,
    color: "white",
  },
});
