import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import EventComponent from "./Event";
import moment from "moment";
import { Timestamp } from "firebase/firestore";
import uuid from "react-native-uuid";
import { useTimesInADay } from "../../../hooks/useTimesInADay";
import { Event as EventType } from "../../../types";

type Props = {
  navigation: any;
  events: EventType[];
  currentDay: any;
};

const Events = ({ navigation, events, currentDay }: Props) => {
  return (
    <>
      {events.map((event: EventType) => {
        return (
          <EventComponent
            key={event.id}
            event={event}
            navigation={navigation}
          />
        );
      })}
    </>
  );
};

export default Events;

const styles = StyleSheet.create({});
