import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import moment from "moment";
import { addEvent, updateEvent } from "../../firebase";
import Background from "../../components/Background";
import EventTitle from "./Components/EventTitle";
import EventScheduleTime from "./Components/EventScheduleTime";
import EventSubjects from "./Components/EventSubjects";
import EventTypes from "./Components/EventType";
import Title from "../../components/Title";
import EventScheduleDate from "./Components/EventScheduleDate";
import EventAlarm from "./Components/EventAlarm";
import { Event } from "../../types";
import { useGetUserSubjects } from "../../hooks/useGetUserSubjects";
import EventScheduleRecurring from "./Components/EventScheduleRecurring";
type Props = {
  navigation: any;
  route: { params: { currentDayPassed: any; eventToUpdate: Event } };
};

const EventForm = ({ navigation, route }: Props) => {
  const { currentDayPassed, eventToUpdate } = route.params;
  const [dates, setDates] = useState(eventToUpdate?.dates);
  const [recurring, setRecurring] = useState(eventToUpdate?.recurring);
  const [times, setTimes] = useState(eventToUpdate?.times);
  const [subject, setSubject] = useState<any>();
  const [type, setType] = useState(eventToUpdate?.type);
  const [taskTitle, setTaskTitle] = useState(eventToUpdate?.title);
  const [description, setDescription] = useState(eventToUpdate?.description);
  const [isAlarmSet, setAlarmSet] = useState(eventToUpdate?.alarm.isOn);
  const [alarmTime, setAlarmTime] = useState<any>(eventToUpdate?.alarm?.time);
  const handleAddTask = () => {
    const color = `rgb(${Math.floor(
      Math.random() * Math.floor(256)
    )},${Math.floor(Math.random() * Math.floor(256))},${Math.floor(
      Math.random() * Math.floor(256)
    )})`;

    const startDate = moment(dates.start).format("YYYY-MM-DD");

    const newEvent: Event = {
      title: taskTitle,
      description: description || "",
      subject: eventToUpdate?.subject || subject?.name || "",
      type: type || "",
      color: color,
      recurring: recurring,
      dates: {
        start: startDate,
      },
      times: {
        start: times.start,
        end: times.end,
        timeExpectedToSpend: times.timeExpectedToSpend,
      },
      alarm: {
        time: alarmTime || "",
        isOn: isAlarmSet || false,
      },
    };

    addEvent(newEvent);
    navigation.navigate("Dashboard");
  };

  const handleUpdateEvent = () => {
    const color = `rgb(${Math.floor(
      Math.random() * Math.floor(256)
    )},${Math.floor(Math.random() * Math.floor(256))},${Math.floor(
      Math.random() * Math.floor(256)
    )})`;

    const startDate = moment(dates.start).format("YYYY-MM-DD");
    const newEvent: Event = {
      title: taskTitle,
      description: description,
      subject: subject,
      type: type,
      color: color,
      recurring: { frequency: "never", every: "never", end: "never" },
      dates: {
        start: startDate,
      },
      times: {
        start: times.start,
        end: times.end,
        timeExpectedToSpend: times.timeExpectedToSpend,
      },
      alarm: {
        time: alarmTime,
        isOn: isAlarmSet,
      },
    };

    updateEvent(newEvent, eventToUpdate.id);
    navigation.navigate("EventView", {
      currentDayPassed: currentDayPassed,
      eventToUpdate: newEvent,
    });
  };

  return (
    <View style={styles.container}>
      <Background />

      <View style={styles.content}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              eventToUpdate
                ? navigation.navigate("EventView", {
                    currentDayPassed: currentDayPassed,
                    eventToUpdate: eventToUpdate,
                  })
                : navigation.navigate("Dashboard");
            }}
          >
            <Text style={styles.text}>Cancel</Text>
          </TouchableOpacity>
          <Title title="Event Form" />
          {eventToUpdate ? (
            <TouchableOpacity onPress={handleUpdateEvent}>
              <Text style={styles.text}>Update</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleAddTask}>
              <Text style={styles.text}>Add</Text>
            </TouchableOpacity>
          )}
        </View>
        <ScrollView style={styles.form} centerContent>
          <EventTitle title={taskTitle} setTitle={setTaskTitle} />
          {/* Description Goes Here */}
          <EventSubjects setSubject={setSubject} />
          <EventTypes setType={setType} subject={subject} />
          <EventScheduleDate setDates={setDates} dates={dates} />
          <EventScheduleTime
            setTimes={setTimes}
            times={times}
            currentDate={dates?.start}
          />
          <EventScheduleRecurring
            setRecurring={setRecurring}
            recurring={recurring}
          />
          <EventAlarm
            setAlarmSet={setAlarmSet}
            setAlarmTime={setAlarmTime}
            isAlarmSet={isAlarmSet}
            currentDay={dates?.start}
            alarmTime={alarmTime}
          />
          {/* Customize */}
        </ScrollView>
      </View>
    </View>
  );
};

export default EventForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  content: {
    flex: 1,
    width: "100%",
    padding: 15,
  },
  form: {
    flex: 1,
    width: "100%",
  },
  text: {
    color: "aqua",
    fontSize: 18,
  },
});
