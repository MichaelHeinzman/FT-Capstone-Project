import moment from "moment";
import { useEffect, useState } from "react";
import { Event } from "../types";

export function useFormatEventsForCalendar(events: any, currentDay: any) {
  const [eventsForCalendar, setEventsForCalendar] = useState<any>({});
  const [dayList, setDayList] = useState<any>([]);

  const getDiffOfTwoDatesInDays = (date1: Date, date2: Date) => {
    const diffTime = Math.abs(date1.valueOf() - date2.valueOf());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleNonRecurring = (result: any, event: Event) => {
    const diffBetweenStartAndEnd = moment(event.dates.end).diff(
      moment(event.dates.start),
      "days"
    );
    let final = "";
    for (let i = 0; i < diffBetweenStartAndEnd; i++) {
      const date = moment(event.dates.start).format("YYYY-MM-DD").toString();
      if (i === diffBetweenStartAndEnd - 1) {
        event.dates.end = final;
      }
      if (!result[date]) result[date] = [];
      result[date].push(event);
      result[date].sort((a: any, b: any) => {
        const date1 = new Date(a.dates.start);
        const date2 = new Date(b.dates.start);
        return date1.valueOf() - date2.valueOf();
      });
      let start = event.dates.start;
      let end = event.dates.end;

      if (i === 0) {
        final = event.dates.end;
        const date = moment(start).format("YYYY-MM-DD").toString();
        start = date + " 00:00:00";
        end = date + " 23:59:59";
      }

      event = {
        ...event,
        dates: {
          start: moment(start).add(1, "days").toString(),
          end: moment(end).add(1, "days").toString(),
        },
      };
    }
  };
  const setUpEventsForCalendar = (result: any, event: Event): any => {
    // Store necessary dates and values in constants from event as Dates.
    const eventStartDate = moment(event.dates.start);
    const eventEndDate = moment(event.dates.end);
    const recurringEnd = moment(event.recurring.end);
    const recurringEvery = event.recurring.every;
    const recurringFrequency = event.recurring.frequency;
    const recurringOn = event.recurring.isRecurring;

    // Check if a date is recurring
    if (recurringOn) {
      let newEvent = event;
      let numberOf = 0;
      let typeOfSkip: any = "";

      // Store Date Every Day until date ends.
      if (recurringEvery === "Day") {
        numberOf = 1;
        typeOfSkip = "days";
      }

      // Set Date Every Week.
      if (recurringEvery === "Week") {
        numberOf = 1;
        typeOfSkip = "weeks";
      }

      // Set Date Every Month.
      if (recurringEvery === "Month") {
        numberOf = 1;
        typeOfSkip = "months";
      }

      // Set Date Every Year.
      if (recurringEvery === "Year") {
        numberOf = 1;
        typeOfSkip = "years";
      }

      const diff = recurringEnd.diff(eventStartDate, typeOfSkip);
      if (diff <= 0) {
        handleNonRecurring(result, event);
      } else {
        for (let i = 0; i < diff; i++) {
          const date = moment(newEvent.dates.start)
            .format("YYYY-MM-DD")
            .toString();
          if (!result[date]) result[date] = [];
          result[date].push(newEvent);
          result[date].sort((a: any, b: any) => {
            const date1 = new Date(a.dates.start);
            const date2 = new Date(b.dates.start);
            return date1.valueOf() - date2.valueOf();
          });
          // Check if current date is after recurring end. If So turn off recurring.
          newEvent = {
            ...event,
            dates: {
              start: moment(newEvent.dates.start)
                .add(numberOf, typeOfSkip)
                .toString(),
              end: moment(newEvent.dates.end)
                .add(numberOf, typeOfSkip)
                .toString(),
            },
          };
        }
      }
    } else {
      handleNonRecurring(result, event);
    }
    return result;
  };

  console.log(eventsForCalendar);
  useEffect(() => {
    let result: any = {};
    Object.keys(events).forEach((key: string) => {
      result = setUpEventsForCalendar(result, events[key]);
    });

    setEventsForCalendar(result);
  }, [events]);

  useEffect(() => {
    setDayList(eventsForCalendar[currentDay]);
  }, [eventsForCalendar, currentDay]);

  return {
    eventsForCalendar,
    dayList,
  };
}
