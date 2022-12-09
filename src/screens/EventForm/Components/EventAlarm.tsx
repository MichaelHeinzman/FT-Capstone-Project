import { StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import moment from "moment";
import DateTimePicker from "react-native-modal-datetime-picker";

type Props = {
  setAlarmTime: React.Dispatch<any>;
  setAlarmSet: React.Dispatch<any>;
  isAlarmSet: boolean;
  alarmTime: string;
  currentDay: any;
};

const EventAlarm = ({
  setAlarmTime,
  setAlarmSet,
  isAlarmSet,
  alarmTime,
  currentDay,
}: Props) => {
  const [isDateTimePickerVisible, setDateTimePickerVisible] = useState(false);
  const showDateTimePicker = () => {
    setDateTimePickerVisible(true);
  };
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
      <View style={styles.content}>
        <View style={styles.row}>
          <Text
            style={{
              color: "#9CAAC4",
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            Alarm Times
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
        <View style={styles.row}>
          <View>
            <Text style={styles.text}>Alarm</Text>
            <View
              style={{
                height: 25,
                marginTop: 3,
              }}
            >
              <Text style={styles.timeText}>
                {moment(alarmTime).format("h:mm A")}
              </Text>
            </View>
          </View>
          <Switch value={isAlarmSet} onValueChange={handleAlarmSet} />
        </View>
      </View>
    </View>
  );
};

export default EventAlarm;

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
  separator: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#979797",
    alignSelf: "center",
    marginVertical: 20,
  },
  timeText: {
    color: "aqua",
    fontSize: 20,
    textAlign: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
  },
});
