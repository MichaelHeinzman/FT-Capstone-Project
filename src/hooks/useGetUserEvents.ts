import { doc, onSnapshot, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { auth } from "../firebase";

export function useGetUserEvents() {
  const [events, setEvents] = useState<{ [key: string]: any[] }>({});
  const userId = auth.currentUser?.uid || "";

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "Users", userId, "events"),
      (querySnapshot) => {
        const result: any[] = [];
        querySnapshot.forEach((doc) => {
          const temp = { id: doc.id, ...doc.data() };
          result.push(temp);
        });

        const reduced = result.reduce(
          (acc: { [key: string]: any[] }, currentEvent: any) => {
            const { date, ...coolEvent } = currentEvent;
            acc[date] = [coolEvent];
            return acc;
          },
          {}
        );
        setEvents(reduced);
      }
    );
    return unsubscribe;
  }, []);

  return {
    events,
  };
}
