import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Event } from "../../../types";

type Props = {
  styles: any;
  event: Event;
  subjects: any;
};

const EventContentView = ({ styles, event, subjects }: Props) => {
  return (
    <View style={styles.content}>
      {/* Title of Event */}
      <View style={styles.row}>
        <Text style={styles.title}>
          {event.title ? event.title : "No Title"}
        </Text>
      </View>

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

      {/* Description */}
      <View style={styles.row}>
        <View style={styles.rowItem}>
          <Text style={styles.text}>{event.description}</Text>
        </View>
      </View>

      {/* Length Of Times */}
      <View style={styles.row}>
        <View style={styles.rowItem}>
          {/* Time Expected To Take */}
          <Text style={styles.text}>
            Time Expected To Take: {event.times.timeExpectedToSpend}
          </Text>

          {/* Average time it takes usually. */}
          <Text style={styles.text}>
            Average Time Recorded:{" "}
            {subjects[event.subject]?.events[event.type]?.averageTimeTook}
          </Text>
        </View>
      </View>

      {/* Start and End Time */}
      <View style={styles.row}>
        <View style={styles.rowItem}>
          <Text style={styles.text}>Starts: {event.dates.start}</Text>
          <Text style={styles.text}>Ends: {event.dates.end}</Text>
        </View>
      </View>

      {/* Finished Event button. */}
      <TouchableOpacity
        style={[
          {
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            borderRadius: 10,
            margin: 10,
          },
          { backgroundColor: event.color },
        ]}
        onPress={() => {}}
      >
        <Text style={[styles.text, { fontSize: 20 }]}>Complete Task</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EventContentView;
