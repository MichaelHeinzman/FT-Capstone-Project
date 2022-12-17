import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Fragment, useState } from "react";
import Background from "../../components/Background";
import { useGetUserEvents } from "../../hooks/useGetUserEvents";
import moment from "moment";
import { useEventsForAgenda } from "../../hooks/useFormatEventsForAgenda";
import Events from "../Dashboard/Components/Events";
import Filter from "./Components/Filter";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { Event } from "../../types";
import { useGetUserSubjects } from "../../hooks/useGetUserSubjects";

type Props = {
  navigation: any;
};

const Agenda = ({ navigation }: Props) => {
  const [currentDate, setCurrentDate] = useState<any>(
    moment().format("YYYY-MM-DD")
  );
  const { events } = useGetUserEvents();
  const { subjects } = useGetUserSubjects();
  const { eventsForAgenda, setFilter, filter } = useEventsForAgenda(events);
  const [filterPopup, setFilterPopup] = useState(true);

  const runThroughDates = (dates: any) => {
    return Object.keys(dates).map((key: string) => {
      const date = dates[key];
      return (
        <View key={key} style={styles.date}>
          <Text style={styles.dateTitle}>
            {moment(key).format("dddd, MMMM DD")}
          </Text>
          <View style={styles.events}>
            <Events
              events={date}
              navigation={navigation}
              currentDay={currentDate}
              time={true}
            />
          </View>
        </View>
      );
    });
  };
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta name="viewport" content ="width=device-width,initial-scale=1,user-scalable=yes" />
      <title>Schedule or Agenda</title>
      <style>
        body {
          padding: 20px;
        }
        .date {
          width: 100%;
          height: 100%;
          padding: 10px;
          background-color: grey;
        }
        .events {
          width: 100%;
          height: 100%;
          padding: 10px;
          background-color: rgb(200,200,200);
        }
        .time {
          flex: 1;
        }
        .title {
          flex: 1
        }
        .eventContent{
          padding: 10px;
          padding-left: 0px;
        }
        .event {
          margin-top: 10px;
        }
        .header {
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      </style>
  </head>
  <body>
      <h1>Schedule</h1>
      ${Object.keys(eventsForAgenda)
        .map((key: string, index: number) => {
          const date = eventsForAgenda[key];

          return `
            <div class="date">${moment(key).format("dddd, MMMM DD")}</div>
            <div class="events">
              ${date
                .map(
                  (event: Event) =>
                    `<div class="event">
                    <div class="header">
                      <div class="time">
                        ${moment(event.dates.start).format("h:mm A")}-${moment(
                      event.dates.end
                    ).format("h:mm A")}
                      </div>
                      <div class="title">${event.title}</div>
                      <div class="title">Subject: ${event.subject}</div>
                    </div>
                    <div class="eventContent">The average time you usually take completing ${
                      event.type
                    } is ${
                      subjects &&
                      subjects[event.subject]?.events[event.type]
                        ?.averageTimeTook
                    }</div>
                    <div class="eventContent">${event.description}</div>
                  </div>`
                )
                .join("")}
            </div>
          `;
        })
        .join("")}
  </body>
  </html>
`;

  console.log(html);

  const createAndSavePDF = async (html: any) => {
    try {
      const { uri } = await Print.printToFileAsync({
        html,
        margins: {
          left: 20,
          top: 50,
          right: 20,
          bottom: 100,
        },
      });
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Fragment>
      <Background />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setFilterPopup(true)}>
          <Text style={styles.headerText}>Filter</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>List of Events</Text>
        <TouchableOpacity onPress={() => createAndSavePDF(html)}>
          <Text style={styles.headerText}>Export</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>{runThroughDates(eventsForAgenda)}</View>
      </ScrollView>
      {filterPopup && (
        <Filter
          setFilter={setFilter}
          filter={filter}
          closeFilter={() => setFilterPopup(false)}
        />
      )}
    </Fragment>
  );
};

export default Agenda;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  date: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  text: {
    color: "white",
  },
  dateTitle: {
    flex: 1,
    color: "white",
    fontSize: 20,
    width: "100%",
    margin: 10,
  },
  events: {
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  time: {
    flex: 1,
    color: "white",
    fontSize: 16,
  },
  header: {
    flex: 0.1,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },
  scroll: {
    flex: 0.8,
  },
  headerText: {
    fontSize: 18,
    color: "white",
  },
  filter: {
    position: "absolute",
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    bottom: 0,
    top: 0,
  },
});
