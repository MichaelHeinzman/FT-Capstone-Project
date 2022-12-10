import { onSnapshot, collection, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { auth } from "../firebase";

export function useGetUserEvents() {
  const [events, setEvents] = useState<any>({});
  const userId = auth.currentUser?.uid || "";

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "Users", userId, "events"),
      (querySnapshot) => {
        let result: any = {};
        querySnapshot.forEach((doc) => {
          const temp: any = { ...doc.data() };
          if (!temp?.completed) {
            temp.id = doc.id;

            result = { ...result, [doc.id]: temp };
          }
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
