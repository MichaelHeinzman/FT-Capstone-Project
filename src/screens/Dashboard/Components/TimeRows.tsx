import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Event from "./Event";
import moment from "moment";
import { Timestamp } from "firebase/firestore";
import uuid from "react-native-uuid";
import { useTimesInADay } from "../../../hooks/useTimesInADay";
import Events from "./Events";

type Props = {
  navigation: any;
  dayList: any;
  currentDay: any;
};

const TimeRows = ({ navigation, dayList, currentDay }: Props) => {
  const { timesInADay } = useTimesInADay(dayList);
  const renderTimeRows = () =>
    Object.keys(timesInADay).map((key: any) => (
      <View key={uuid.v4().toString()} style={styles.row}>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{moment().hours(key).format("h A")}</Text>
        </View>
        <View style={styles.events}>
          {timesInADay[key].length > 0 && (
            <Events
              events={timesInADay[key]}
              navigation={navigation}
              currentDay={currentDay}
            />
          )}
        </View>
      </View>
    ));

  return (
    <ScrollView contentContainerStyle={styles.scrollViewEventsContainer}>
      {timesInADay && renderTimeRows()}
    </ScrollView>
  );
};

export default TimeRows;

const styles = StyleSheet.create({
  scrollViewEventsContainer: {
    flexGrow: 1,
    margin: 10,
  },
  row: {
    flex: 1,
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    margin: 10,
    backgroundColor: "rgba(244,244,244,.1)",
    padding: 10,
  },
  timeContainer: {
    flex: 0.3,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  time: {
    color: "white",
    fontSize: 20,
  },
  events: {
    flex: 0.7,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
});
