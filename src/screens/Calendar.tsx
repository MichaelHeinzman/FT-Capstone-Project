import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Background from "../components/Background";

import {
  Calendar as ReactCalendar,
  CalendarList,
  Agenda,
} from "react-native-calendars";
import Arrow from "../components/Arrow";
import Day from "react-native-calendars/src/calendar/day";

type Props = {};

const Calendar = (props: Props) => {
  const currentDate = new Date().toDateString();
  const [current, setCurrent] = useState(currentDate);

  const calendarTheme = {
    backgroundColor: "#B3B3B3",
    calendarBackground: "rgba(0,0,0,.1)",
    textSectionTitleColor: "#ffffff",
    textSectionTitleDisabledColor: "#d9e1e8",
    selectedDayBackgroundColor: "#00adf5",
    selectedDayTextColor: "#B3B3B3",
    todayTextColor: "#00adf5",
    dayTextColor: "#00D1FF",
    textDisabledColor: "#d9e1e8",
    dotColor: "#00adf5",
    selectedDotColor: "#B3B3B3",
    arrowColor: "#ffffff",
    disabledArrowColor: "#d9e1e8",
    monthTextColor: "#ffffff",
    indicatorColor: "#ffffff",
    textDayFontSize: 16,
    textMonthFontSize: 16,
    textDayHeaderFontSize: 16,
  };
  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.content}>
        <CalendarList
          theme={calendarTheme}
          current={current}
          onDayPress={(day) => {
            setCurrent(day.dateString);
          }}
          pastScrollRange={50}
          // Max amount of months allowed to scroll to the future. Default = 50
          futureScrollRange={50}
        />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => {
            setCurrent(currentDate);
          }}
        >
          <Text style={styles.text}>Today</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>Calendars</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.text}>Inbox</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  content: {
    paddingTop: 70,
    flex: 1,
    width: "100%",
    overflow: "hidden",
  },
  footer: {
    flex: 0.25,
    width: "100%",
    padding: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  text: {
    flex: 1,
    width: "100%",
    color: "#00D1FF",
    fontSize: 20,
    textAlign: "center",
  },
});
