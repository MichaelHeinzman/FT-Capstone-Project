import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";

type Props = {
  setStartTime: React.Dispatch<any>;
  setTimeExpectedToSpend: React.Dispatch<any>;
  timeExpectedToSpend: string;
  startTime: string;
  currentDay: any;
};

const EventTimes = ({
  setStartTime,
  startTime,
  currentDay,
  timeExpectedToSpend,
  setTimeExpectedToSpend,
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
    setStartTime(newModifiedDay.toString());

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
      <View style={styles.timeContainer}>
        <View>
          <Text
            style={{
              color: "#9CAAC4",
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            Start Time
          </Text>
          <TouchableOpacity
            onPress={() => showDateTimePicker()}
            style={{
              height: 25,
              marginTop: 3,
            }}
          >
            <Text style={{ fontSize: 19 }}>
              {moment(startTime).format("h:mm A")}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.lengthOfTimeContainer}>
          <Text
            style={{
              color: "#9CAAC4",
              fontSize: 16,
              fontWeight: "600",
            }}
          >
            Length of Time (Minutes)
          </Text>
          <TextInput
            style={styles.title}
            keyboardType="numeric"
            value={timeExpectedToSpend}
            onChangeText={setTimeExpectedToSpend}
          />
        </View>
      </View>
    </View>
  );
};

export default EventTimes;

const styles = StyleSheet.create({
  title: {
    flex: 1,
    width: "100%",
    fontSize: 19,
  },
  timeContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  container: {
    flex: 1,
    display: "flex",
    paddingBottom: 20,
  },
  lengthOfTimeContainer: {
    width: "100%",
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
});
