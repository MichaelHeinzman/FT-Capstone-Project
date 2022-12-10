import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Event } from "../../../types";

import StyledTextInput from "../../../components/StyledTextInput";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import ColorPicker from "react-native-wheel-color-picker";
import EventSubjects from "./EventSubjects";
import EventTypes from "./EventTypes";
import { useGetUserSubjects } from "../../../hooks/useGetUserSubjects";

type Props = {
  event: Event;
  oldEvent: Event;
  setEvent: React.Dispatch<any>;
  stylesSent: any;
};

const EventEditAddView = ({ event, stylesSent, setEvent, oldEvent }: Props) => {
  // Handle Recurring Events
  const [isRecurring, setRecurring] = useState(false);
  const [everyOptions, setEveryOptions] = useState(false);
  const showEveryOptions = () => setEveryOptions(true);
  const hideEveryOptions = () => setEveryOptions(false);

  // Handle Date and Time Inputs
  const [isDateTimePickerVisible, setIsDateTimePicker] = useState(false);
  const [currentDateOrTime, setCurrentDateOrTime] = useState("startDate");
  const hideDateTimePicker = () => setIsDateTimePicker(false);
  const handleDateAndTimeButtonPressed = (v: string) => {
    setCurrentDateOrTime(v);
    setIsDateTimePicker(true);
  };

  const handleDateAndTimePicked = (value: any) => {
    const v = moment(value).format("MMMM D YYYY, h:mm A").toString();
    if (currentDateOrTime === "startDate")
      updateEvent("dates", { ...event.dates, start: v });
    if (currentDateOrTime === "endDate")
      updateEvent("dates", { ...event.dates, end: v });
    if (currentDateOrTime === "recurringEnd")
      updateEvent("recurring", { ...event.recurring, end: v });
    setIsDateTimePicker(false);
  };

  // Handle Subject Input
  const { subjects } = useGetUserSubjects();
  const [subjectPopup, setSubjectPopup] = useState(false);

  // Handle Type Input
  const [typePopup, setTypePopup] = useState(false);

  const updateEvent = (type: string, value: any) => {
    setEvent({ ...event, [type]: value });
  };
  const viewSubjectPopup = () => setSubjectPopup(true);
  return (
    <View style={stylesSent.content}>
      <ScrollView style={{ paddingBottom: 100 }}>
        <TouchableOpacity
          activeOpacity={1}
          style={stylesSent.content}
          onPress={() => {
            setTypePopup(false);
            setSubjectPopup(false);
          }}
        >
          {/* Date Picker */}
          <DateTimePicker
            isVisible={isDateTimePickerVisible}
            onConfirm={handleDateAndTimePicked}
            onCancel={hideDateTimePicker}
            mode={"datetime"}
            date={new Date()}
          />

          {/* Title of Event */}
          <View style={stylesSent.row}>
            <StyledTextInput
              placeholderTextColor={event.color}
              value={event.title}
              placeholder={event.title}
              onChangeEvent={(v) => updateEvent("title", v)}
              secureTextEntry={false}
              error={null}
              givenStyles={[
                styles.titleInput,
                event.title === oldEvent?.title && { color: "grey" },
              ]}
            />
          </View>

          {/* Event Subject and Type */}
          <View style={stylesSent.row}>
            {/* Event Subject */}
            <TouchableOpacity
              style={{
                backgroundColor: event.subject
                  ? event.color
                  : "rgba(169,169,169, .5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                padding: 10,
                margin: 5,
                marginLeft: 0,
              }}
              onPress={viewSubjectPopup}
            >
              <Text style={[stylesSent.subjectText]}>
                {event.subject ? event.subject : "Click To Add A New Subject"}
              </Text>
            </TouchableOpacity>
            {/* Event Type */}
            {event.subject !== oldEvent.subject && (
              <TouchableOpacity
                style={{
                  backgroundColor: event.type
                    ? event.color
                    : "rgba(169,169,169, .5)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                  padding: 10,
                  margin: 5,
                  marginLeft: 0,
                }}
                onPress={() => setTypePopup(true)}
              >
                <Text style={stylesSent.typeText}>
                  {event.type ? event.type : "Click To Add A New Type"}
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Description Of Event */}
          <View style={stylesSent.row}>
            <StyledTextInput
              placeholderTextColor={event.color}
              value={
                event.description === "" ? "Description" : event.description
              }
              placeholder={event.description}
              onChangeEvent={(v) => updateEvent("description", v)}
              secureTextEntry={false}
              error={null}
              givenStyles={[
                styles.titleInput,
                event.description === oldEvent?.description && {
                  color: "grey",
                },
              ]}
            />
          </View>

          {/* Length Of Times */}
          <View style={stylesSent.row}></View>

          {/* Start and End Time */}
          <View style={stylesSent.row}>
            <View style={stylesSent.rowItem}>
              <View style={stylesSent.row}>
                <Text style={styles.dateAndTimeLabel}>Starts</Text>
                <TouchableOpacity
                  style={styles.dateAndTimeButton}
                  onPress={() => handleDateAndTimeButtonPressed("startDate")}
                >
                  <Text style={stylesSent.text}>{event.dates.start}</Text>
                </TouchableOpacity>
              </View>
              <View style={stylesSent.row}>
                <Text style={styles.dateAndTimeLabel}>Ends</Text>
                <TouchableOpacity
                  style={styles.dateAndTimeButton}
                  onPress={() => handleDateAndTimeButtonPressed("endDate")}
                >
                  <Text style={stylesSent.text}>{event.dates.end}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Recurring Event Input*/}
          <View
            style={[
              stylesSent.row,
              isRecurring && {
                backgroundColor: "rgba(169,169,169,.5)",
                borderRadius: 10,
              },
            ]}
          >
            <View style={stylesSent.rowItem}>
              <View
                style={[
                  stylesSent.row,
                  isRecurring && { justifyContent: "space-between" },
                ]}
              >
                <Text style={styles.dateAndTimeLabel}>Recurring</Text>
                <Switch value={isRecurring} onValueChange={setRecurring} />
              </View>
              {isRecurring && (
                <>
                  <View style={stylesSent.row}>
                    <Text style={styles.dateAndTimeLabel}>Ends</Text>
                    <TouchableOpacity
                      style={styles.dateAndTimeButton}
                      onPress={() =>
                        handleDateAndTimeButtonPressed("recurringEnd")
                      }
                    >
                      <Text style={stylesSent.text}>{event.recurring.end}</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={stylesSent.row}>
                    <Text style={styles.dateAndTimeLabel}>Occurs Every</Text>
                    <View style={styles.dateAndTimeButton}>
                      {!everyOptions ? (
                        <TouchableOpacity
                          style={stylesSent.rowItem}
                          onPress={showEveryOptions}
                        >
                          <Text style={stylesSent.text}>
                            {event.recurring.every}
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <View style={styles.recurringPopup}>
                          <View style={stylesSent.row}>
                            <TouchableOpacity
                              onPress={() => {
                                hideEveryOptions();
                                updateEvent("recurring", {
                                  ...event.recurring,
                                  every: "Never",
                                });
                              }}
                            >
                              <Text style={stylesSent.text}>NEVER</Text>
                            </TouchableOpacity>
                          </View>
                          <View style={stylesSent.row}>
                            <TouchableOpacity
                              onPress={() => {
                                hideEveryOptions();
                                updateEvent("recurring", {
                                  ...event.recurring,
                                  every: "Day",
                                });
                              }}
                            >
                              <Text style={stylesSent.text}>DAY</Text>
                            </TouchableOpacity>
                          </View>
                          <View style={stylesSent.row}>
                            <TouchableOpacity
                              onPress={() => {
                                hideEveryOptions();
                                updateEvent("recurring", {
                                  ...event.recurring,
                                  every: "Week",
                                });
                              }}
                            >
                              <Text style={stylesSent.text}>WEEK</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      )}
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>

          {/* Pick Color Of Event */}
          <View style={stylesSent.row}>
            <ColorPicker
              color={event.color}
              onColorChange={(color) =>
                color !== "#ffffff" && updateEvent("color", color)
              }
              thumbSize={30}
              sliderSize={30}
              noSnap={true}
              row={false}
            />
          </View>
          {subjectPopup && (
            <EventSubjects
              subjects={subjects}
              newSubject={subjects[event.subject]}
              setSubject={(v: string) => updateEvent("subject", v)}
              event={event}
              styles={styles}
              setPopup={setSubjectPopup}
            />
          )}

          {typePopup && (
            <EventTypes
              newType={event.type}
              setType={(v: string) => updateEvent("type", v)}
              subject={subjects[event?.subject]}
              event={event}
              styles={styles}
              setPopup={setTypePopup}
            />
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default EventEditAddView;

const styles = StyleSheet.create({
  titleInput: {
    backgroundColor: "rgba(169,169,169,.5)",
    color: "white",
    fontSize: 24,
    fontWeight: "700",
  },
  popup: {
    height: "100%",
    position: "absolute",
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.8)",
  },
  popupContainer: {
    flex: 0.5,
    width: "80%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,1)",
    margin: 10,
  },
  popupContent: {
    flex: 0.8,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  popupAdd: {
    flex: 0.3,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dropDown: {
    flex: 0.5,
    width: "100%",
  },
  dateAndTimeButton: {
    flex: 0.6,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    backgroundColor: "rgba(169,169,169,.5)",
    position: "relative",
  },
  dateAndTimeLabel: {
    flex: 0.4,
    color: "white",
    fontSize: 20,
  },
  recurringPopup: {
    width: "100%",
    top: 0,
    right: 0,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
  },
});
