import { ScrollView, StyleSheet, Text, View } from "react-native";
import moment from "moment";
import uuid from "react-native-uuid";
import { useTimesInADay } from "../../../hooks/useTimesInADay";
import Events from "./Events";

type Props = {
  navigation: any;
  dayList: any;
  currentDay: any;
};

const TimeRows = ({ navigation, dayList, currentDay }: Props) => {
  const { timesInADay } = useTimesInADay(dayList);

  // Renders each row with time in hours in a day.
  const renderTimeRows = () =>
    Object.keys(timesInADay).map((key: any) => (
      <View key={uuid.v4().toString()} style={styles.container}>
        <View style={styles.row}>
          <View style={styles.timeContainer}>
            <Text style={styles.time}>{moment().hours(key).format("h A")}</Text>
          </View>
          <View style={styles.divider}></View>
        </View>

        <View style={styles.row}>
          <View style={styles.timeContainer}></View>
          <View style={styles.events}>
            {timesInADay[key].length > 0 && (
              <Events
                events={timesInADay[key]}
                navigation={navigation}
                currentDay={currentDay}
                time={false}
              />
            )}
          </View>
        </View>
      </View>
    ));

  return (
    <ScrollView contentContainerStyle={styles.scrollViewEventsContainer}>
      {timesInADay && renderTimeRows()}
    </ScrollView>
  );
};

export default TimeRows;

const styles = StyleSheet.create({
  scrollViewEventsContainer: {
    flexGrow: 1,
    margin: 10,
  },
  container: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  timeContainer: {
    flex: 0.15,
    height: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    padding: 5,
  },
  time: {
    color: "white",
    fontSize: 16,
  },
  events: {
    flex: 0.8,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  divider: {
    flex: 1,
    backgroundColor: "white",
    height: 1,
  },
});
