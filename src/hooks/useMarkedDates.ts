import { useEffect, useState } from "react";

export function useMarkedDates(events: any) {
  const [markedDates, setMarkedDates] = useState<any>();
  useEffect(() => {
    if (events) {
      const mappedEvents: any[] = [];
      Object.keys(events).forEach((key: string) => {
        mappedEvents.push({
          date: key,
          dots: [
            {
              color: "#2E66E7",
              selectedDotColor: "#2E66E7",
            },
          ],
        });
      });

      setMarkedDates(mappedEvents);
    }
  }, [events]);
  return {
    markedDates,
  };
}
