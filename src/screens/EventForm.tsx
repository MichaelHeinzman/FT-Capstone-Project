import React, { Fragment, useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CalendarList } from "react-native-calendars";
import moment from "moment";
import DateTimePicker from "react-native-modal-datetime-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { addEvent, updateEvent } from "../firebase";

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
  const [taskText, setTaskText] = useState(eventToUpdate?.title || "");
  const [notesText, setNotesText] = useState(eventToUpdate?.notes || "");
  const [isDateTimePickerVisible, setDateTimePickerVisible] = useState(false);
  const [visibleHeight, setVisibleHeight] = useState(
    Dimensions.get("window").height
  );
  const [selectedDay, setSelectedDay] = useState({
    [`${moment().format("YYYY")}-${moment().format("MM")}-${moment().format(
      "DD"
    )}`]: {
      selected: true,
      selectedColor: "#2E66E7",
    },
  });

  const showDateTimePicker = () => setDateTimePickerVisible(true);
  const hideDateTimePicker = () => setDateTimePickerVisible(false);
  const handleDatePicked = (date: any) => {
    const selectedDatePicked = currentDay;
    const hour = moment(date).hour();
    const minute = moment(date).minute();
    const newModifiedDay = moment(selectedDatePicked).hour(hour).minute(minute);
    setAlarmTime(newModifiedDay.toString());
    hideDateTimePicker();
  };
  const handleAlarmSet = () => {
    setAlarmSet(!isAlarmSet);
  };

  const handleAddTask = () => {
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
    <Fragment>
      <DateTimePicker
        isVisible={isDateTimePickerVisible}
        onConfirm={handleDatePicked}
        onCancel={hideDateTimePicker}
        mode="time"
        date={new Date()}
        isDarkModeEnabled
      />

      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 100,
          }}
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
            <TextInput
              style={styles.title}
              onChangeText={setTaskText}
              value={taskText}
              placeholder="What do you need to do?"
            />
            <Text
              style={{
                fontSize: 14,
                color: "#BDC6D8",
                marginVertical: 10,
              }}
            >
              Suggestion
            </Text>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.readBook}>
                <Text style={{ textAlign: "center", fontSize: 14 }}>
                  Read book
                </Text>
              </View>
              <View style={styles.design}>
                <Text style={{ textAlign: "center", fontSize: 14 }}>
                  Design
                </Text>
              </View>
              <View style={styles.learn}>
                <Text style={{ textAlign: "center", fontSize: 14 }}>Learn</Text>
              </View>
            </View>
            <View style={styles.notesContent} />
            <View>
              <Text style={styles.notes}>Notes</Text>
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
            <View>
              <Text
                style={{
                  color: "#9CAAC4",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                Times
              </Text>
              <TouchableOpacity
                onPress={() => showDateTimePicker()}
                style={{
                  height: 25,
                  marginTop: 3,
                }}
              >
                <Text style={{ fontSize: 19 }}>
                  {moment(alarmTime).format("h:mm A")}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.separator} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={{
                    color: "#9CAAC4",
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  Alarm
                </Text>
                <View
                  style={{
                    height: 25,
                    marginTop: 3,
                  }}
                >
                  <Text style={{ fontSize: 19 }}>
                    {moment(alarmTime).format("h:mm A")}
                  </Text>
                </View>
              </View>
              <Switch value={isAlarmSet} onValueChange={handleAlarmSet} />
            </View>
          </View>
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
        </ScrollView>
      </View>
    </Fragment>
  );
};

export default NewDashboard;

const styles = StyleSheet.create({
  createTaskButton: {
    width: 252,
    height: 48,
    alignSelf: "center",
    marginTop: 40,
    borderRadius: 5,
    justifyContent: "center",
  },
  separator: {
    height: 0.5,
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
    height: 0.5,
    width: "100%",
    backgroundColor: "#979797",
    alignSelf: "center",
    marginVertical: 20,
  },
  learn: {
    height: 23,
    width: 51,
    backgroundColor: "#F8D557",
    justifyContent: "center",
    borderRadius: 5,
  },
  design: {
    height: 23,
    width: 59,
    backgroundColor: "#62CCFB",
    justifyContent: "center",
    borderRadius: 5,
    marginRight: 7,
  },
  readBook: {
    height: 23,
    width: 83,
    backgroundColor: "#4CD565",
    justifyContent: "center",
    borderRadius: 5,
    marginRight: 7,
  },
  title: {
    height: 25,
    borderColor: "#5DD976",
    borderLeftWidth: 1,
    paddingLeft: 8,
    fontSize: 19,
  },
  taskContainer: {
    flex: 1,
    width: "80%",
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
    marginTop: 30,
    width: "100%",
    flex: 1,
    alignSelf: "center",
  },
  newTask: {
    alignSelf: "center",
    fontSize: 20,
    width: 120,
    height: 25,
    textAlign: "center",
  },
  backButton: {
    flexDirection: "row",
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#eaeef7",
  },
});
