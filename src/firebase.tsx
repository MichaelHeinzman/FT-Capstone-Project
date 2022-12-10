import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";
import {
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} from "@env";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Event } from "./types";

// Initialize Firebase
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Authentication Methods
const auth = getAuth(app);

const login = (email: string, password: string, setError: Function) =>
  signInWithEmailAndPassword(auth, email, password)
    .then((result) => console.log("Result: ", result))
    .catch((error) => setError(error.code));

const signup = (email: string, password: string, setError: Function) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((result) => console.log("Result of Signup: ", result))
    .catch((err) => setError(err.code));
};

const userSignout = () =>
  signOut(auth)
    .then(() => {})
    .catch((error) => console.log("Signout Error: ", error));

const resetPassword = (email: string) =>
  sendPasswordResetEmail(auth, email)
    .then((res) => res)
    .catch((error) => console.log("Reset Password Email Error", error));

const getSubject = async (subject: string) => {
  const userId = auth.currentUser?.uid || "";
  const subjectRef: any = doc(db, "Users", userId, "subjects", subject);
  const docSnap = await getDoc(subjectRef);
  return docSnap.data() || null;
};

const addSubject = async (subject: any) => {
  const userId = auth.currentUser?.uid || "";
  await setDoc(
    doc(db, "Users", userId, "subjects", subject?.id || subject.name),
    subject
  )
    .then((result) => console.log("Adding Subject", result))
    .catch((error) => console.log("Error Adding Subject", error));
};

const addOrDeleteEventTypeToSubject = async (
  isDelete: boolean,
  type: string,
  times: any,
  subject: string
) => {
  // Get Subject if it exists.
  const subjectFromFirebase: any = await getSubject(subject);
  if (!subjectFromFirebase) {
    const dataSubject = {
      events: {
        [type]: {
          averageTimeTook: times.timeActuallyTook,
          averageEstimatedTimeTook: times.timeExpectedToSpend,
        },
      },
      name: subject,
    };
    addSubject(dataSubject);
  } else {
    // If Type exists udpate values.
    if (subjectFromFirebase.events[type]) {
      const addAverage =
        (subjectFromFirebase.events[type].averageTimeTook +
          times.timeActuallyTook) /
        2;

      const removeAverage =
        (subjectFromFirebase.events[type].averageTimeTook -
          times.timeActuallyTook) *
        2;

      // Create type object with updated values from subject type.
      const typeData = {
        averageTimeTook: isDelete ? removeAverage : addAverage,
        averageEstimatedTimeTook: isDelete ? removeAverage : addAverage,
      };
      subjectFromFirebase.events = {
        ...subjectFromFirebase.events,
        [type]: typeData,
      };
    }

    if (!subjectFromFirebase.events[type] && !isDelete) {
      const typeData = {
        averageTimeTook: times.timeActuallyTook,
        averageEstimatedTimeTook: times.timeExpectedToSpend,
      };
      subjectFromFirebase.events[type] = typeData;
    }
    updateSubject(subjectFromFirebase);
  }
};

const updateSubject = async (subject: any) => {
  const userId = auth.currentUser?.uid || "";

  updateDoc(doc(db, "Users", userId, "subjects", subject.id), subject);
};
const addEvent = async (event: Event) => {
  const userId = auth.currentUser?.uid || "";
  const eventsRef = collection(db, "Users", userId, "events");
  addOrDeleteEventTypeToSubject(false, event.type, event.times, event.subject);
  await setDoc(doc(eventsRef), event)
    .then((result) => console.log("Adding Event"))
    .catch((error) => console.log("Error Adding Event", error));
};

const updateEvent = async (event: Event, id: string | undefined) => {
  const userId = auth.currentUser?.uid || "";
  const eventsRef = collection(db, "Users", userId, "events");
  addOrDeleteEventTypeToSubject(false, event.type, event.times, event.subject);
  await updateDoc(doc(eventsRef, id), event)
    .then((result) => console.log("Updated Event"))
    .catch((error) => console.log("Error Updating Event", error));
};

const deleteEvent = async (event: Event, id: string) => {
  const userId = auth.currentUser?.uid || "";
  const eventsRef = collection(db, "Users", userId, "events");
  addOrDeleteEventTypeToSubject(true, event.type, event.times, event.subject);
  await deleteDoc(doc(eventsRef, id));
};

export {
  auth,
  db,
  login,
  signup,
  userSignout,
  resetPassword,
  addEvent,
  updateEvent,
  getSubject,
  addSubject,
};
