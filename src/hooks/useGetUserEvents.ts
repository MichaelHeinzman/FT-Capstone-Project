import { onSnapshot, collection, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { auth } from "../firebase";

export function useGetUserEvents() {
  const [events, setEvents] = useState<any>({});
  const userId = auth.currentUser?.uid || "";

  const setupItemsFromData = (result: any[], item: any) => {
    if (!result[item.dates.start]) result[item.dates.start] = [];
    result[item.dates.start].push(item);
    result[item.dates.start].sort((a: any, b: any) => {
      const date1 = new Date(a.times.start);
      const date2 = new Date(b.times.start);
      return date1.valueOf() - date2.valueOf();
    });
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
