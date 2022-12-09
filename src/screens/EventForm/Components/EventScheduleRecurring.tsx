import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";

type Props = {
  setRecurring: React.Dispatch<any>;
  recurring: any;
};

const EventScheduleRecurring = ({ setRecurring, recurring }: Props) => {
  const [endDate, setEndDate] = useState<string>(recurring?.end);
  const [isDateTimePickerVisible, setIsDateTimePicker] = useState(false);

  const handleDatePicked = (date: any) => {
    const year = moment(date).year();
    const month = moment(date).month();
    const day = moment(date).day();
    const newModifiedDate = moment().year(year).month(month).day(day);

    setEndDate(newModifiedDate.toString());
    hideDateTimePicker();
  };
  const hideDateTimePicker = () => setIsDateTimePicker(false);
  const showDateTimePicker = (type: number) => setIsDateTimePicker(true);
  useEffect(
    () => setRecurring({ every: "Week", end: endDate, frequency: "never" }),
    [endDate]
  );
  return (
    <View style={styles.container}>
      <DateTimePicker
        isVisible={isDateTimePickerVisible}
        onConfirm={handleDatePicked}
        onCancel={hideDateTimePicker}
        mode="date"
        date={new Date()}
        isDarkModeEnabled
      />
      <View style={styles.content}>
        <Text style={styles.text}>Recurring</Text>
        <TouchableOpacity
          onPress={() => showDateTimePicker(1)}
          style={styles.timeButton}
        >
          <Text style={styles.timeText}>
            {moment(endDate).format("MM-DD-YYYY")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EventScheduleRecurring;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
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
});
