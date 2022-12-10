import { onSnapshot, collection, doc } from "firebase/firestore";
import moment from "moment";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { auth } from "../firebase";
import { Event } from "../types";

export function useGetUserEvents() {
  const [events, setEvents] = useState<any>({});
  const userId = auth.currentUser?.uid || "";

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "Users", userId, "events"),
      (querySnapshot) => {
        let result: any = {};
        querySnapshot.forEach((doc) => {
          const temp: any = { id: doc.id, ...doc.data() };
          result = { ...result, [temp.id]: temp };
        });
        setEvents(result);
      }
    );
    return unsubscribe;
  }, []);
  return {
    events,
  };
}
