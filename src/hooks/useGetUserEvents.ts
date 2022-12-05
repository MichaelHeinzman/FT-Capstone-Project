import { doc, onSnapshot, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { auth } from "../firebase";

export function useGetUserEvents() {
  const [events, setEvents] = <any[]>useState([]);
  const userId = auth.currentUser?.uid || "";

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "Users", userId, "events"),
      (querySnapshot) => {
        const result: any[] = [];
        querySnapshot.forEach((doc) => {
          result.push(doc);
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
