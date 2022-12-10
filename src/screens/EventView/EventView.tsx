import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import Background from "../../components/Background";
import Title from "../../components/Title";
import { useGetUserSubjects } from "../../hooks/useGetUserSubjects";
import EventContentView from "./Components/EventContentView";
import EventEditView from "./Components/EventEditAddView";
import {
  updateEvent as updateEventInFirebase,
  addEvent as addEventToFirebase,
} from "../../firebase";
import moment from "moment";

const defaultEvent = {
  title: "Title Of Event",
  description: "Description",
  subject: "Subject of Event",
  type: "Type of Event in Subject",
  color: "rgba(169,169,169, .5)",
  recurring: {
    isRecurring: false,
    frequency: "never",
    every: "never",
    end: "never",
  },
  dates: {
    start: moment().format("MMMM D YYYY, h:mm A").toString().toString(),
    end: moment().format("MMMM D YYYY, h:mm A").toString().toString(),
  },
  times: {
    timeExpectedToSpend: 0,
    timeActuallyTook: 40,
  },
  alarm: {
    time: moment().format("MMMM D YYYY, h:mm A").toString().toString(),
    isOn: false,
  },
};

type Props = {
  navigation: any;
  route: any;
};

const EventView = ({ navigation, route }: Props) => {
  const { subjects } = useGetUserSubjects();
  const [editView, setEditView] = useState(false);
  const { currentDayPassed, eventToUpdate } = route.params;
  const [event, setNewEvent] = useState(eventToUpdate || defaultEvent);
  const submitNewEventToFirebase = () => {
    const newEvent = {
      id: event.id || null,
      title: event.title || "No Title",
      description: event.description || "No Description",
      subject: event.subject || "No Subject",
      type: event.type || "No Type",
      color: event.color || "rgba(0,0,0)",
      recurring: {
        isRecurring: event.recurring.isRecurring || false,
        frequency: event.recurring.frequency || "never",
        every: event.recurring.every || "never",
        end: event.recurring.end || "never",
      },
      dates: {
        start:
          event.dates.start ||
          moment().format("MMMM D YYYY, h:mm A").toString().toString(),
        end:
          event.dates.start ||
          moment().format("MMMM D YYYY, h:mm A").toString().toString(),
      },
      times: {
        timeExpectedToSpend: event.times.timeExpectedToSpend || 0,
        timeActuallyTook:
          event.times.timeActuallyTook || defaultEvent.times.timeActuallyTook,
      },
      alarm: {
        time:
          event.alarm.time ||
          moment().format("MMMM D YYYY, h:mm A").toString().toString(),
        isOn: event.alarm.isOn || false,
      },
    };
    event
      ? addEventToFirebase(newEvent)
      : updateEventInFirebase(newEvent, newEvent.id);

    !eventToUpdate
      ? navigation.navigate("Dashboard")
      : navigation.navigate("EventView", {
          eventToUpdate: newEvent,
          currentDayPassed: currentDayPassed,
        });
  };

  return (
    <View style={styles.container}>
      <Background />
      <View style={styles.actualContainer}>
        <View style={styles.header}>
          {/* Back button. */}
          <TouchableOpacity
            style={styles.backContainer}
            onPress={() => {
              if (editView) {
                setNewEvent(eventToUpdate);
                setEditView(false);
              } else {
                navigation.navigate("Dashboard");
              }
            }}
          >
            <Text style={[styles.backText, { color: event.color }]}>
              {editView ? "Cancel" : "Back"}
            </Text>
          </TouchableOpacity>

          {/* Header title explaining what this component is. */}
          <Text style={styles.headerText}>
            {eventToUpdate
              ? editView
                ? "Event Edit"
                : "Event Details"
              : "Add Event"}
          </Text>

          {/* Edit button. */}
          <TouchableOpacity
            style={styles.backContainer}
            onPress={() => {
              eventToUpdate
                ? editView
                  ? submitNewEventToFirebase()
                  : setEditView(true)
                : submitNewEventToFirebase();
            }}
          >
            <Text style={[styles.backText, { color: event.color }]}>
              {eventToUpdate ? (editView ? "Save" : "Edit") : "Add"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Actual details of the Event. */}
        {eventToUpdate ? (
          editView ? (
            <EventEditView
              event={event}
              oldEvent={eventToUpdate}
              setEvent={setNewEvent}
              stylesSent={styles}
            />
          ) : (
            <EventContentView
              styles={styles}
              event={event}
              subjects={subjects}
              navigation={navigation}
            />
          )
        ) : (
          <EventEditView
            event={event}
            oldEvent={defaultEvent}
            setEvent={setNewEvent}
            stylesSent={styles}
          />
        )}
      </View>
    </View>
  );
};

export default EventView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    position: "relative",
  },
  actualContainer: {
    flex: 1,
    width: "100%",
    padding: 15,
  },
  row: {
    width: "100%",
    maxWidth: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 1,
    padding: 5,
  },
  rowItem: {
    width: "100%",
    display: "flex",
  },
  header: {
    flex: 0.1,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    flex: 1,
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },

  backText: {
    fontSize: 18,
    fontWeight: "500",
    color: "aqua",
  },
  backContainer: {
    flex: 0.3,
    width: "100%",
  },

  content: {
    flex: 0.9,
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 20,
    color: "white",
    fontWeight: "700",
  },
  subjectText: {
    fontSize: 18,
    color: "white",
    fontWeight: "500",
  },
  typeText: {
    fontSize: 18,
    color: "white",
    fontWeight: "500",
  },
  text: {
    fontSize: 14,
    color: "white",
  },
});
