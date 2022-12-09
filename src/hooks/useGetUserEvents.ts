import { onSnapshot, collection, doc } from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { auth } from "../firebase";
import { Event } from "../types";

export function useGetUserEvents() {
  const [events, setEvents] = useState<any>({});
  const userId = auth.currentUser?.uid || "";

  const setupItemsFromData = (result: any, event: Event) => {
    const eventStartDate = event.dates.start;
    const eventRecurring = event.recurring;

    if (eventRecurring.every !== "never") {
      // Store dates of recurring end and event start date.
      const recurringEndDate = new Date(eventRecurring.end);
      const eventStartDate2 = new Date(eventStartDate);

      // Find Number of Days Apart
      const diffTime = Math.abs(
        eventStartDate2.valueOf() - recurringEndDate.valueOf()
      );
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      // Loop through number of days and place event in result.
      for (let i = 0; i < diffDays; i++) {
        // Add number of days to start date.
        const newDate = new Date(eventStartDate2);
        if (eventRecurring.every === "Day")
          newDate.setDate(newDate.getDate() + i);
        else newDate.setDate(newDate.getDate() + i + 1);
        const newEvent = {
          ...event,
          dates: {
            start: moment(newDate).format("YYYY-MM-DD").toString(),
          },
          recurring: {
            every: "never",
            end: eventRecurring.end,
            frequency: "never",
          },
        };

        // If recurrence is daily, add event to each day.
        if (eventRecurring.every === "Day") {
          if (!result[newEvent.dates.start]) result[newEvent.dates.start] = [];
          result[newEvent.dates.start].push(newEvent);
          result[newEvent.dates.start].push;
        }

        if (eventRecurring.every === "Week") {
          if (i % 7 === 0) {
            if (!result[newEvent.dates.start])
              result[newEvent.dates.start] = [];
            result[newEvent.dates.start].push(newEvent);
          }
        }
        if (eventRecurring.every === "2 Weeks") {
          if (i % 14 === 0) {
            if (!result[newEvent.dates.start])
              result[newEvent.dates.start] = [];
            result[newEvent.dates.start].push(newEvent);
          }
        }
      }
    } else {
      if (!result[event.dates.start]) result[event.dates.start] = [];
      result[event.dates.start].push(event);
      result[event.dates.start].sort((a: any, b: any) => {
        const date1 = new Date(a.times.start);
        const date2 = new Date(b.times.start);
        return date1.valueOf() - date2.valueOf();
      });
    }
    return result;
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "Users", userId, "events"),
      (querySnapshot) => {
        let result: any[] = [];
        querySnapshot.forEach((doc) => {
          const temp: any = { id: doc.id, ...doc.data() };
          result = setupItemsFromData(result, temp);
        });
        setEvents({ ...result });
      }
    );
    return unsubscribe;
  }, []);
  return {
    events,
  };
}
