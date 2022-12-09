import React, { useState } from "react";
import {
  FlatList,
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
type Props = {
  navigation: any;
  route: any;
};

const NewDashboard = ({ navigation, route }: Props) => {
  const { currentDayPassed, eventToUpdate } = route.params;
  const [dates, setDates] = useState(
    eventToUpdate?.dates || {
      start: currentDayPassed,
      end: "",
    }
  );
  const [times, setTimes] = useState(
    eventToUpdate?.times || {
      start: "",
      end: "",
      timeExpectedToSpend: 0,
    }
  );
  const [subject, setSubject] = useState("SWE5110");
  const [type, setType] = useState("assignment");
  const [taskTitle, setTaskTitle] = useState(eventToUpdate?.title || "");
  const [description, setDescription] = useState(eventToUpdate?.notes || "");
  const [isAlarmSet, setAlarmSet] = useState(
    eventToUpdate?.alarm.isOn || false
  );
  const [alarmTime, setAlarmTime] = useState<any>(
    eventToUpdate?.alarm?.time || moment().format()
  );
  const handleAddTask = () => {
    const color = `rgb(${Math.floor(
      Math.random() * Math.floor(256)
    )},${Math.floor(Math.random() * Math.floor(256))},${Math.floor(
      Math.random() * Math.floor(256)
    )})`;

    const startDate = moment(dates.start).format("YYYY-MM-DD");
    const endDate = moment(dates.start).format("YYYY-MM-DD");

    const newEvent = {
      title: taskTitle,
      description: description,
      subject: subject,
      type: type,
      color: color,
      dates: {
        start: startDate,
        end: endDate,
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

    addEvent(newEvent);
    navigation.navigate("EventView");
  };

  const handleUpdateEvent = () => {
    const color = `rgb(${Math.floor(
      Math.random() * Math.floor(256)
    )},${Math.floor(Math.random() * Math.floor(256))},${Math.floor(
      Math.random() * Math.floor(256)
    )})`;

    const startDate = moment(dates.start).format("YYYY-MM-DD");
    const endDate = moment(dates.start).format("YYYY-MM-DD");
    const newEvent = {
      title: taskTitle,
      description: description,
      subject: subject,
      type: type,
      color: color,
      dates: {
        start: startDate,
        end: endDate,
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
            onPress={() =>
              navigation.navigate("EventView", {
                currentDayPassed: currentDayPassed,
                eventToUpdate: eventToUpdate,
              })
            }
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

          <EventSubjects setSubject={setSubject} />
          <EventTypes setType={setType} subject={subject} />
          <EventScheduleDate setDates={setDates} dates={dates} />
          <EventScheduleTime
            setTimes={setTimes}
            times={times}
            currentDate={dates.start}
          />
          <EventAlarm
            setAlarmSet={setAlarmSet}
            setAlarmTime={setAlarmTime}
            isAlarmSet={isAlarmSet}
            currentDay={dates.start}
            alarmTime={alarmTime}
          />
          {/* Customize */}
        </ScrollView>
      </View>
    </View>
  );
};

export default NewDashboard;

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
