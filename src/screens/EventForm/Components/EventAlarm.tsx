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
    <View>
      <DateTimePicker
        isVisible={isDateTimePickerVisible}
        onConfirm={handleDatePicked}
        onCancel={hideDateTimePicker}
        mode="time"
        date={new Date()}
        isDarkModeEnabled
      />
      <View>
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
  );
};

export default EventAlarm;

const styles = StyleSheet.create({
  separator: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#979797",
    alignSelf: "center",
    marginVertical: 20,
  },
});
