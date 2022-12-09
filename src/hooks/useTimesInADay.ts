import moment from "moment";
import { useEffect, useState } from "react";

export function useTimesInADay(dayList: any) {
  const [timesInADay, setTimesInADay] = useState<any>();
  useEffect(() => {
    const newTimesInADay: any = {
      "1": [],
      "2": [],
      "3": [],
      "4": [],
      "5": [],
      "6": [],
      "7": [],
      "8": [],
      "9": [],
      "10": [],
      "11": [],
      "12": [],
      "13": [],
      "14": [],
      "15": [],
      "16": [],
      "17": [],
      "18": [],
      "19": [],
      "20": [],
      "21": [],
      "22": [],
      "23": [],
      "24": [],
    };

    const storeInEachTime = (event: any) => {
      const eventStartTime = moment(event.times.start).hours();
      const eventEndTime = moment(event.times.end).hours();
      Object.keys(newTimesInADay).map((key: any) => {
        if (eventStartTime <= parseInt(key) && eventEndTime >= parseInt(key))
          newTimesInADay[key].push(event);
      });
    };

    dayList?.map((event: any) => storeInEachTime(event));
    setTimesInADay(newTimesInADay);
  }, [dayList]);
  return {
    timesInADay,
  };
}
