import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Event } from "../../../types";
import StyledTextInput from "../../../components/StyledTextInput";
import Background from "../../../components/Background";
import StyledButton from "../../../components/StyledButton";
import { updateEvent } from "../../../firebase";
import { Timestamp } from "firebase/firestore";

type Props = {
  styles: any;
  event: Event;
  subjects: any;
  navigation: any;
};

const EventContentView = ({ styles, event, subjects, navigation }: Props) => {
  const [completeTaskPopup, setCompleteTaskPopup] = useState(false);
  const [timeActuallyTook, setTimeActuallyTook] = useState<any>();
  return (
    <View style={styles.content}>
      <ScrollView
        style={{ padding: 0, margin: 0, height: "100%", width: "100%" }}
      >
        <TouchableOpacity
          style={[
            {
              justifyContent: "space-between",
              display: "flex",
              alignItems: "center",
              margin: 0,
            },
          ]}
          onPress={() => setCompleteTaskPopup(false)}
        >
          {/* Title, Back, Edit, Event Type, Event Subject, Description */}
          <View style={styles.rowItem}>
            {/* Title of Event */}
            <View style={styles.row}>
              <Text style={styles.title}>
                {event.title ? event.title : "No Title"}
              </Text>
            </View>
            {/* Event Subject and Type */}
            <View style={styles.row}>
              {/* Event Subject */}
              <View
                style={{
                  backgroundColor: event.color,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                  padding: 10,
                  margin: 5,
                  marginLeft: 0,
                }}
              >
                <Text style={styles.subjectText}>
                  {event.subject ? event.subject : "No Subject"}
                </Text>
              </View>
            </View>
            {/* Event Type */}
            <View
              style={{
                backgroundColor: event.color,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                padding: 10,
                margin: 5,
              }}
            >
              <Text style={styles.typeText}>
                {event.type ? event.type : "No Type"}
              </Text>
            </View>
            {/* Description */}
            <View style={styles.row}>
              <View style={styles.rowItem}>
                <Text style={styles.text}>{event.description}</Text>
              </View>
            </View>
          </View>

          {/* Contains Time Data */}
          <View style={styles.rowItem}>
            <View style={styles.row}>
              <View
                style={[
                  styles.rowItem,
                  { justifyContent: "center", alignItems: "center" },
                ]}
              >
                <Text
                  style={[styles.title, { width: "100%", textAlign: "left" }]}
                >
                  Time Estimated Time To Finish
                </Text>
                <Text style={[styles.title, { fontSize: 100 }]}>
                  {event.times.timeExpectedToSpend}{" "}
                  <Text style={{ fontSize: 40 }}>minutes</Text>
                </Text>
              </View>
              <View
                style={[
                  styles.rowItem,
                  { justifyContent: "center", alignItems: "center" },
                ]}
              >
                <Text
                  style={[styles.title, { width: "100%", textAlign: "left" }]}
                >
                  Your Average Time To Finish
                </Text>
                <Text style={[styles.title, { fontSize: 100 }]}>
                  {parseInt(
                    subjects[event?.subject]?.events[event.type].averageTimeTook
                  )}
                  <Text style={{ fontSize: 40 }}>minutes</Text>
                </Text>
              </View>
            </View>
          </View>

          {/* Finished Event button. */}
          <TouchableOpacity
            style={[
              {
                flex: 0.2,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
                borderRadius: 10,
                margin: 10,
              },
              { backgroundColor: event.color },
            ]}
            onPress={() => setCompleteTaskPopup(true)}
          >
            <Text style={[styles.text, { fontSize: 20 }]}>Complete Task</Text>
          </TouchableOpacity>

          {completeTaskPopup && (
            <View
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                top: 0,
                left: 0,
                backgroundColor: "rgba(0,0,0,.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  height: "50%",
                  width: "80%",
                  top: 0,
                  margin: 50,
                  position: "absolute",
                  backgroundColor: "rgb(100,100,100)",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  borderRadius: 10,
                  padding: 20,
                }}
              >
                <StyledTextInput
                  placeholderTextColor={"black"}
                  value={timeActuallyTook}
                  keyboardType="numeric"
                  placeholder={"Time actually took (in minutes)"}
                  onChangeEvent={(v) => setTimeActuallyTook(parseInt(v))}
                  secureTextEntry={false}
                  error={null}
                  givenStyles={[
                    styles.titleInput,
                    { flex: 0.3, color: "black" },
                  ]}
                />
                {/* Finish and Store Event Information. */}
                <StyledButton
                  text="Finish and Store Event Information"
                  onPressEvent={() => {
                    updateEvent(
                      {
                        ...event,
                        times: {
                          ...event.times,
                          timeActuallyTook: parseInt(timeActuallyTook),
                        },
                        completed: true,
                      },
                      event.id
                    );
                    navigation.navigate("Dashboard");
                  }}
                  textStyle={{ fontSize: 18 }}
                  buttonStyle={[
                    {
                      flex: 0.3,
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    },
                  ]}
                />
              </View>
            </View>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default EventContentView;
