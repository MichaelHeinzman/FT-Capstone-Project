import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
type Props = {
  setTimes: React.Dispatch<any>;
  times: any;
  currentDate: string;
};

const EventTimes = ({ setTimes, times, currentDate }: Props) => {
  const [startTime, setStartTime] = useState(times.start || "");
  const [endTime, setEndTime] = useState(times.end || "");
  const [isDateTimePickerVisible, setDateTimePickerVisible] = useState(false);
  const [type, setType] = useState(true);

  useEffect(() => {
    const time1 = new Date(startTime);
    const time2 = new Date(endTime);
    let diff = (time1.getTime() - time2.getTime()) / (60 * 1000);
    const timeExpectedToSpend = Math.abs(Math.round(diff));

    setTimes({
      end: endTime,
      start: startTime,
      timeExpectedToSpend: timeExpectedToSpend,
    });
  }, [startTime, endTime]);

  // Methods
  const showDateTimePicker = (type: boolean) => {
    setType(type);
    setDateTimePickerVisible(true);
  };
  const hideDateTimePicker = () => setDateTimePickerVisible(false);
  const handleDatePicked = (date: any) => {
    const hour = moment(date).hour();
    const minutes = moment(date).minutes();
    const newDate = moment(currentDate).hour(hour).minutes(minutes);
    type ? setStartTime(newDate.toString()) : setEndTime(newDate.toString());
    hideDateTimePicker();
  };
  return (
    <View style={styles.container}>
      <DateTimePicker
        isVisible={isDateTimePickerVisible}
        onConfirm={handleDatePicked}
        onCancel={hideDateTimePicker}
        mode="time"
        date={new Date()}
        isDarkModeEnabled
      />
      <View style={styles.row}>
        <Text style={styles.text}>Start Time</Text>
        <TouchableOpacity
          onPress={() => showDateTimePicker(true)}
          style={styles.timeButton}
        >
          <Text style={styles.timeText}>
            {moment(startTime).format("h:mm A")}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>End Time</Text>
        <TouchableOpacity
          onPress={() => showDateTimePicker(false)}
          style={styles.timeButton}
        >
          <Text style={styles.timeText}>
            {moment(endTime).format("h:mm A")}
          </Text>
        </TouchableOpacity>
      </View>
      {startTime && (
        <View style={styles.row}>
          <Text style={styles.text}>Length of Time</Text>
          <View style={styles.timeExpectedContainer}>
            <Text style={styles.timeText}>
              {times.timeExpectedToSpend} Minutes
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default EventTimes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    display: "flex",
    borderRadius: 10,
  },
  content: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flex: 0.2,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    flex: 0.3,
    width: "100%",
    color: "white",
    fontSize: 20,
  },
  timeButton: {
    flex: 0.7,
    width: "100%",
  },
  timeText: {
    color: "aqua",
    fontSize: 20,
    textAlign: "center",
  },
  timeExpectedContainer: {
    flex: 0.7,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
