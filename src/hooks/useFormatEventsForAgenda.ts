import moment from "moment";
import { useEffect, useState } from "react";
import { Event } from "../types";

export function useEventsForAgenda(events: any) {
  const [eventsForAgenda, setEventsForAgenda] = useState<any>([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    const filteredEvents: any = {};
    Object.keys(events).map((key: string) => {
      // Store event
      const event: Event = events[key];
      // Check if event is accepted by filter.
      if (filter.length > 0 && !filter.includes(event.subject as never)) return;

      // Get start date of event.
      const start: any = moment(event.dates.start).format("YYYY-MM-DD");

      // Get whether it's a recurring date.
      const isRecurring = event.recurring.isRecurring;

      // Get how much it recurrs.
      const every = event.recurring.every;
      const frequency = event.recurring.frequency;

      // Store when the date stops recurring.
      const end = event.recurring.end;

      // Check if array for start date has been created.
      if (!filteredEvents[start]) filteredEvents[start] = [];

      // Store event in start date array.
      filteredEvents[start].push(event);
      filteredEvents[start].sort((a: any, b: any) => {
        const date1 = new Date(a.dates.start);
        const date2 = new Date(b.dates.start);
        return date1.valueOf() - date2.valueOf();
      });
      // Check if date is a recurring date.
      if (isRecurring) {
        // Create a current date variable.
        const current = moment(start);

        // Cycle through the every (days, weeks, months, etc..) until recurring end is achieved.
        while (moment(end).isAfter(current)) {
          // Create string for current date.
          const stringDate: any = current.format("YYYY-MM-DD");
          if (!filteredEvents[stringDate]) filteredEvents[stringDate] = [];
          filteredEvents[stringDate].push(event);
          filteredEvents[stringDate].sort((a: any, b: any) => {
            const date1 = new Date(a.dates.start);
            const date2 = new Date(b.dates.start);
            return date1.valueOf() - date2.valueOf();
          });
          // Add every value to current.
          current.add(1, every);
        }
      }
    });
    const sortedEvents = Object.keys(filteredEvents)
      .sort((a: any, b: any) => {
        return new Date(a).valueOf() - new Date(b).valueOf();
      })
      .reduce(function (result: any, key: string) {
        result[key] = filteredEvents[key];
        return result;
      }, {});
    setEventsForAgenda(sortedEvents);
  }, [events, filter]);

  return {
    eventsForAgenda,
    setFilter,
    filter,
  };
}
