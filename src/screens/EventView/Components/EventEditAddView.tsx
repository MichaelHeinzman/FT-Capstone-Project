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
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from "react-native-modal-datetime-picker";
import moment from "moment";
import ColorPicker from "react-native-wheel-color-picker";

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
  const [dateMode, setDateMode] = useState("date");
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
  const [subjectPopup, setSubjectPopup] = useState(false);
  const [subjectAddANewSubject, setSubjectAddANewSubject] = useState(false);
  const [newSubject, setNewSubject] = useState("");

  // Handle Type Input
  const [typePopup, setTypePopup] = useState(false);
  const [typeAddNewType, setTypeAddANewType] = useState(false);
  const [newType, setNewType] = useState("");

  const updateEvent = (type: string, value: any) => {
    setEvent({ ...event, [type]: value });
  };

  const viewSubjectPopup = () => setSubjectPopup(true);
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={stylesSent.content}
      onPress={() => {
        setTypePopup(false);
        setSubjectPopup(false);
      }}
    >
      <ScrollView style={{ paddingBottom: 100 }}>
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
              event.title === oldEvent.title && { color: "grey" },
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
            <Text style={stylesSent.subjectText}>
              {event.subject ? event.subject : "Click To Add A New Subject"}
            </Text>
          </TouchableOpacity>

          {/* Event Type */}
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
        </View>

        {/* Description Of Event */}
        <View style={stylesSent.row}>
          <StyledTextInput
            placeholderTextColor={event.color}
            value={event.description === "" ? "Description" : event.description}
            placeholder={event.description}
            onChangeEvent={(v) => updateEvent("description", v)}
            secureTextEntry={false}
            error={null}
            givenStyles={[
              styles.titleInput,
              event.description === oldEvent.description && { color: "grey" },
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
            onColorChange={(color) => updateEvent("color", color)}
            thumbSize={30}
            sliderSize={30}
            noSnap={true}
            row={false}
          />
        </View>
        {subjectPopup && (
          <View style={styles.popup}>
            <View style={styles.popupContainer}>
              <View style={styles.popupContent}>
                {subjectAddANewSubject ? (
                  <>
                    <StyledTextInput
                      placeholderTextColor={event.color}
                      value={newSubject}
                      placeholder={"Type New Subject Name"}
                      onChangeEvent={(v) => setNewSubject(v)}
                      secureTextEntry={false}
                      error={null}
                      givenStyles={[
                        styles.titleInput,
                        newSubject === "" && { color: "grey" },
                      ]}
                    />
                    <TouchableOpacity
                      onPress={() => setSubjectAddANewSubject(false)}
                      style={styles.popupAdd}
                    >
                      <Text style={stylesSent.backText}>Add Subject</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <DropDownPicker
                      searchable
                      itemSeparator
                      open={true}
                      value={""}
                      items={[]}
                      loading={true}
                      setOpen={() => {}}
                      setValue={() => {}}
                      setItems={() => {}}
                      style={styles.dropDown}
                      listMode="SCROLLVIEW"
                      placeholder="Select a Subject"
                      zIndex={3000}
                      zIndexInverse={1000}
                    />
                    <TouchableOpacity
                      onPress={() => setSubjectAddANewSubject(true)}
                      style={styles.popupAdd}
                    >
                      <Text style={stylesSent.backText}>Add a New Subject</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </View>
        )}

        {typePopup && (
          <View style={styles.popup}>
            <View style={styles.popupContainer}>
              <View style={styles.popupContent}>
                {typeAddNewType ? (
                  <>
                    <StyledTextInput
                      placeholderTextColor={event.color}
                      value={newType}
                      placeholder={"Type New Type Name"}
                      onChangeEvent={(v) => setNewType(v)}
                      secureTextEntry={false}
                      error={null}
                      givenStyles={[
                        styles.titleInput,
                        newType === "" && { color: "grey" },
                      ]}
                    />
                    <TouchableOpacity
                      onPress={() => setTypeAddANewType(false)}
                      style={styles.popupAdd}
                    >
                      <Text style={stylesSent.backText}>Add Type</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <DropDownPicker
                      searchable
                      itemSeparator
                      open={true}
                      value={""}
                      items={[]}
                      loading={true}
                      setOpen={() => {}}
                      setValue={() => {}}
                      setItems={() => {}}
                      style={styles.dropDown}
                      listMode="SCROLLVIEW"
                      placeholder="Select a Type"
                      zIndex={3000}
                      zIndexInverse={1000}
                    />
                    <TouchableOpacity
                      onPress={() => setTypeAddANewType(true)}
                      style={styles.popupAdd}
                    >
                      <Text style={stylesSent.backText}>Add a New Type</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </TouchableOpacity>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.8)",
  },
  popupContainer: {
    flex: 1,
    width: "80%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 10,
  },
  popupContent: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,1)",
    padding: 20,
  },
  popupAdd: {
    flex: 0.5,
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
});
