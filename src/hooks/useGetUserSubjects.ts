import { onSnapshot, collection, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { auth } from "../firebase";

export function useGetUserSubjects() {
  const [subjects, setSubjects] = useState<any>({});
  const [subjectsArray, setSubjectsArray] = useState<any>([]);
  const userId = auth.currentUser?.uid || "";

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "Users", userId, "subjects"),
      (querySnapshot) => {
        const result: any = {};
        const arrayResult: any = [];

        querySnapshot.forEach((doc) => {
          const temp: any = { id: doc.id, ...doc.data() };
          result[temp.id] = temp;
          arrayResult.push({ ...temp, id: temp.id });
        });
        setSubjects(result);
        setSubjectsArray(arrayResult);
      }
    );
    return unsubscribe;
  }, []);
  return {
    subjects,
    subjectsArray,
  };
}
