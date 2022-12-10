import { useEffect, useState } from "react";
import { uuidv4 } from "@firebase/util";
import moment from "moment";
export function useGetSortedByTimesEvents(events: any, currentDay: any) {
  const [sortedEvents, setSortedEvents] = useState(events);
  useEffect(() => {
    const result = [...events];
    result.sort((a: any, b: any) => {
      const date1 = new Date(a.dates.start);
      const date2 = new Date(b.dates.start);

      return date1.valueOf() - date2.valueOf();
    });

    setSortedEvents(result);
  }, [events]);

  return {
    sortedEvents,
  };
}
