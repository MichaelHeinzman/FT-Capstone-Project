import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Event from "./Event";
import moment from "moment";
import { Timestamp } from "firebase/firestore";
import uuid from "react-native-uuid";

type Props = {
  navigation: any;
  dayList: any;
  currentDay: any;
};

const Events = ({ navigation, dayList, currentDay }: Props) => {
  const [timesInADay, setTimesInADay] = useState<any>();
  useEffect(() => {
    const newTimesInADay: any = {
      "1": [],
      "2": [],
      "3": [],
      "4": [],
      "5": [],
      "6": [],
      "7": [],
      "8": [],
      "9": [],
      "10": [],
      "11": [],
      "12": [],
      "13": [],
      "14": [],
      "15": [],
      "16": [],
      "17": [],
      "18": [],
      "19": [],
      "20": [],
      "21": [],
      "22": [],
      "23": [],
      "24": [],
    };

    const storeInEachTime = (event: any) => {
      const eventStartTime = moment(event.times.start).hours();
      const eventEndTime = moment(event.times.end).hours();
      Object.keys(newTimesInADay).map((key: any) => {
        if (eventStartTime <= parseInt(key) && eventEndTime >= parseInt(key))
          newTimesInADay[key].push(event);
      });
    };
    dayList.map((event: any) => storeInEachTime(event));
    setTimesInADay(newTimesInADay);
  }, [dayList]);

  const renderTimes = () =>
    Object.keys(timesInADay).map((key: any) => (
      <View key={uuid.v4().toString()} style={styles.row}>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>{moment().hours(key).format("h A")}</Text>
        </View>
        <View style={styles.events}>
          {timesInADay[key].map((event: any) => {
            if (timesInADay[key].length > 0)
              return (
                <Event key={event.id} event={event} navigation={navigation} />
              );
          })}
        </View>
      </View>
    ));

  return (
    <ScrollView contentContainerStyle={styles.scrollViewEventsContainer}>
      {timesInADay && renderTimes()}
    </ScrollView>
  );
};

export default Events;

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
