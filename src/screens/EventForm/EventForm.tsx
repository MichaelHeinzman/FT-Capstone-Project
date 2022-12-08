import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CalendarList } from "react-native-calendars";
import moment from "moment";
import { addEvent, updateEvent } from "../../firebase";
import EventSchedule from "./Components/EventSchedule";
import EventAlarm from "./Components/EventAlarm";
import EventSubjects from "./Components/EventSubjects";

type Props = {
  navigation: any;
  route: any;
};

const NewDashboard = ({ navigation, route }: Props) => {
  const { currentDayPassed, eventToUpdate } = route.params;
  const [currentDay, setCurrentDay] = useState(
    eventToUpdate?.date || currentDayPassed
  );
  const [isAlarmSet, setAlarmSet] = useState(
    eventToUpdate?.alarm.isOn || false
  );
  const [alarmTime, setAlarmTime] = useState<any>(
    eventToUpdate?.alarm?.time || moment().format()
  );
  const [timeActuallySpent, setTimeActuallySpent] = useState(
    eventToUpdate?.timeActuallySpent || 35
  );
  const [timeExpectedToSpend, setTimeExpectedToSpend] = useState(
    eventToUpdate?.timeExpectedToSpend || "30"
  );
  const [startTime, setStartTime] = useState(
    eventToUpdate?.start || moment().format()
  );
  const [subject, setSubject] = useState("SWE5110");
  const [type, setType] = useState("assignment");
  const [taskText, setTaskText] = useState(eventToUpdate?.title || "");
  const [notesText, setNotesText] = useState(eventToUpdate?.notes || "");
  const [selectedDay, setSelectedDay] = useState({
    [`${moment().format("YYYY")}-${moment().format("MM")}-${moment().format(
      "DD"
    )}`]: {
      selected: true,
      selectedColor: "#2E66E7",
    },
  });

  const handleAddTask = () => {
    const newEvent = {
      date: `${moment(currentDay).format("YYYY")}-${moment(currentDay).format(
        "MM"
      )}-${moment(currentDay).format("DD")}`,
      title: taskText,
      description: notesText,

      start: startTime,
      timeExpectedToSpend: timeExpectedToSpend,
      actualTimeTook: timeActuallySpent,
      subject: subject,
      type: type,
      alarm: {
        time: alarmTime,
        isOn: isAlarmSet,
      },
      color: `rgb(${Math.floor(Math.random() * Math.floor(256))},${Math.floor(
        Math.random() * Math.floor(256)
      )},${Math.floor(Math.random() * Math.floor(256))})`,
    };

    addEvent(newEvent);
    navigation.navigate("Dashboard");
  };

  const handleUpdateEvent = () => {
    const newEvent = {
      date: `${moment(currentDay).format("YYYY")}-${moment(currentDay).format(
        "MM"
      )}-${moment(currentDay).format("DD")}`,
      title: taskText,
      notes: notesText,
      alarm: {
        time: alarmTime,
        isOn: isAlarmSet,
      },
      color: `rgb(${Math.floor(Math.random() * Math.floor(256))},${Math.floor(
        Math.random() * Math.floor(256)
      )},${Math.floor(Math.random() * Math.floor(256))})`,
    };

    updateEvent(newEvent, eventToUpdate.id);
    navigation.navigate("Dashboard");
  };

  return (
    <View style={styles.container}>
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={styles.container}
      >
        <View style={styles.calenderContainer}>
          <CalendarList
            style={{
              width: 350,
              height: 350,
            }}
            current={currentDay}
            minDate={moment().format()}
            horizontal
            pastScrollRange={0}
            pagingEnabled
            calendarWidth={350}
            onDayPress={(day) => {
              setSelectedDay({
                [day.dateString]: {
                  selected: true,
                  selectedColor: "#2E66E7",
                },
              });
              setCurrentDay(day.dateString);
              setAlarmTime(day.dateString);
            }}
            monthFormat="yyyy MMMM"
            hideArrows
            markingType="custom"
            theme={{
              selectedDayBackgroundColor: "#2E66E7",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#2E66E7",
              backgroundColor: "#eaeef7",
              calendarBackground: "#eaeef7",
              textDisabledColor: "#d9dbe0",
            }}
            markedDates={selectedDay}
          />
        </View>
        <View style={styles.taskContainer}>
          {/* Title of Event */}
          <TextInput
            style={styles.title}
            onChangeText={setTaskText}
            value={taskText}
            placeholder="What do you need to do?"
          />
          <View style={styles.separator} />
          {/* Choose a Subject */}
          <EventSubjects />
          <View style={styles.notesContent} />
          <View style={styles.separator} />
          {/* Description of Event */}
          <View style={styles.description}>
            <Text style={styles.notes}>Description</Text>
            <TextInput
              style={{
                height: 25,
                fontSize: 19,
                marginTop: 3,
              }}
              onChangeText={setNotesText}
              value={notesText}
              placeholder="Enter notes about the task."
            />
          </View>

          <View style={styles.separator} />

          {/* Time Schedule Settings */}
          <EventSchedule
            setTimeExpectedToSpend={setTimeExpectedToSpend}
            timeExpectedToSpend={timeExpectedToSpend}
            setStartTime={setStartTime}
            startTime={startTime}
            currentDay={currentDay}
          />

          {/* Alarm Settings */}
          <EventAlarm
            setAlarmTime={setAlarmTime}
            setAlarmSet={setAlarmSet}
            isAlarmSet={isAlarmSet}
            alarmTime={alarmTime}
            currentDay={currentDay}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          disabled={taskText === ""}
          style={[
            styles.createTaskButton,
            {
              backgroundColor:
                taskText === "" ? "rgba(46, 102, 231,0.5)" : "#2E66E7",
            },
          ]}
          onPress={eventToUpdate ? handleUpdateEvent : handleAddTask}
        >
          <Text
            style={{
              fontSize: 18,
              textAlign: "center",
              color: "#fff",
            }}
          >
            {eventToUpdate ? "UPDATE TASK" : "ADD YOUR TASK"}
          </Text>
        </TouchableOpacity>
        {eventToUpdate && (
          <TouchableOpacity
            disabled={taskText === ""}
            style={[
              styles.createTaskButton,
              {
                backgroundColor: "#FF1E1E",
              },
            ]}
            onPress={eventToUpdate ? handleUpdateEvent : handleAddTask}
          >
            <Text
              style={{
                fontSize: 18,
                textAlign: "center",
                color: "#fff",
              }}
            >
              DELETE EVENT
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

export default NewDashboard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eaeef7",
    padding: 10,
  },
  scrollContainer: {
    paddingBottom: 100,
    width: "100%",
  },
  createTaskButton: {
    padding: 30,
    borderRadius: 5,
    margin: 20,
  },
  separator: {
    width: "100%",
    backgroundColor: "#979797",
    alignSelf: "center",
    marginVertical: 20,
  },
  notes: {
    color: "#9CAAC4",
    fontSize: 16,
    fontWeight: "600",
  },
  notesContent: {
    width: "100%",
    backgroundColor: "#979797",
    alignSelf: "center",
    marginVertical: 20,
  },
  design: {
    width: "100%",
    backgroundColor: "#62CCFB",
    justifyContent: "center",
    borderRadius: 5,
  },
  title: {
    borderColor: "#5DD976",
    borderLeftWidth: 1,
    fontSize: 19,
  },
  taskContainer: {
    width: "100%",
    alignSelf: "center",
    borderRadius: 20,
    shadowColor: "#2E66E7",
    backgroundColor: "#ffffff",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 20,
    shadowOpacity: 0.2,
    elevation: 5,
    padding: 22,
  },
  calenderContainer: {
    width: "100%",
  },
  newTask: {
    width: "100%",
    textAlign: "center",
    fontSize: 20,
  },
  backButton: {
    flexDirection: "row",
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  description: {
    width: "100%",
  },
});
