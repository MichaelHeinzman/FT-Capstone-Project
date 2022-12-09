import React, { Fragment, useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import moment from "moment";
import CalendarStrip from "react-native-calendar-strip";
import { SafeAreaView } from "react-native-safe-area-context";
import Background from "../../components/Background";
import { useGetUserEvents } from "../../hooks/useGetUserEvents";
import Event from "./Components/Event";
import Events from "./Components/Events";

type Props = {
  navigation: any;
};

const Dashboard = ({ navigation }: Props) => {
  const datesWhitelist = [
    {
      start: moment(),
      end: moment().add(365, "days"), // total 4 days enabled
    },
  ];
  const [currentDate, setCurrentDate] = useState<any>(
    moment().format("YYYY-MM-DD").toString()
  );

  const { events } = useGetUserEvents();
  const [dayList, setDayList] = useState<any>(
    events[currentDate.toString()] || []
  );
  const [markedDate, setMarkedDate] = useState<any>([]);

  useEffect(() => {
    setDayList(events[currentDate.toString()] || []);
    const mappedEvents: any[] = [];
    Object.keys(events).forEach((key: string) => {
      mappedEvents.push({
        date: key,
        dots: [
          {
            color: "#2E66E7",
            selectedDotColor: "#2E66E7",
          },
        ],
      });
    });
    setMarkedDate(mappedEvents);
  }, [events, currentDate]);

  return (
    <Fragment>
      <Background />
      <SafeAreaView style={styles.calendarContainer}>
        <CalendarStrip
          calendarAnimation={{ type: "sequence", duration: 30 }}
          style={styles.calendar}
          calendarHeaderStyle={{ color: "#FFFFFF" }}
          dateNumberStyle={{ color: "#FFFFFF", paddingTop: 10 }}
          dateNameStyle={{ color: "#BBBBBB" }}
          highlightDateNumberStyle={{
            color: "#fff",
            backgroundColor: "#2E66E7",
            marginTop: 10,
            height: 35,
            width: 35,
            textAlign: "center",
            borderRadius: 17.5,
            overflow: "hidden",
            paddingTop: 6,
            fontWeight: "400",
            justifyContent: "center",
            alignItems: "center",
          }}
          highlightDateNameStyle={{ color: "#2E66E7" }}
          disabledDateNameStyle={{ color: "grey" }}
          disabledDateNumberStyle={{ color: "grey", paddingTop: 10 }}
          datesWhitelist={datesWhitelist}
          iconLeft={require("../../assets/images/left-arrow.png")}
          iconRight={require("../../assets/images/right-arrow.png")}
          iconContainer={{ flex: 0.1 }}
          // If you get this error => undefined is not an object (evaluating 'datesList[_this.state.numVisibleDays - 1].date')
          // temp: https://github.com/BugiDev/react-native-calendar-strip/issues/303#issuecomment-864510769
          markedDates={markedDate}
          selectedDate={currentDate}
          onDateSelected={(date) => {
            const selectedDate = `${moment(date).format("YYYY")}-${moment(
              date
            ).format("MM")}-${moment(date).format("DD")}`;
            setCurrentDate(selectedDate);
          }}
        />

        {/* Add Event Button */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("EventForm", {
              currentDayPassed: currentDate,
            })
          }
          style={styles.viewTask}
        >
          <Image
            source={require("../../assets/images/plus.png")}
            style={{
              height: 30,
              width: 30,
            }}
          />
        </TouchableOpacity>

        {/* Load Events */}
        <View style={styles.events}>
          <Events
            dayList={dayList}
            navigation={navigation}
            currentDay={currentDate}
          />
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  calendarContainer: {
    flex: 1,
  },
  calendar: {
    flex: 0.3,
  },

  viewTask: {
    position: "absolute",
    bottom: 40,
    right: 17,
    height: 60,
    width: 60,
    backgroundColor: "#2E66E7",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2E66E7",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 30,
    shadowOpacity: 0.5,
    elevation: 5,
    zIndex: 999,
  },
  events: {
    flex: 1,
  },
});
