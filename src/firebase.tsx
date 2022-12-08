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

const updateSubject = async (event: any, typeOfUpdate: string) => {
  const userId = auth.currentUser?.uid || "";
  let subject: any = await getSubject(event.subject);
  // Check to see if subject exists. If not create one and post in firebase.
  if (subject) {
    if (!subject.events[event.type]) {
      subject.events[event.type] = {
        averageTimeTook: event.actualTimeTook,
      };
    } else {
      if (typeOfUpdate === "deletion") {
        subject.events[event.type].AverageTimeTook =
          subject.events[event.type].AverageTimeTook * 2 - event.actualTimeTook;
      } else {
        subject.events[event.type].AverageTimeTook =
          (subject.events[event.type].AverageTimeTook + event.actualTimeTook) /
          2;
      }
    }
  } else {
    subject = {
      events: {
        [event.type]: {
          averageTimeTook: event.actualTimeTook,
        },
      },
    };
  }
  await setDoc(doc(db, "Users", userId, "subjects", event.subject), subject);
};

const getSubject = async (subject: string) => {
  const userId = auth.currentUser?.uid || "";
  const subjectRef: any = doc(db, "Users", userId, "subjects", subject);
  const docSnap = await getDoc(subjectRef);
  return docSnap.data();
};

const addEvent = async (event: any) => {
  const userId = auth.currentUser?.uid || "";
  const eventsRef = collection(db, "Users", userId, "events");
  updateSubject(event, "");
  await setDoc(doc(eventsRef), event);
};

const updateEvent = async (event: any, id: any) => {
  const userId = auth.currentUser?.uid || "";
  const eventsRef = collection(db, "Users", userId, "events");
  await updateDoc(doc(eventsRef, id), event);
};

const deleteEvent = async (event: any, id: any) => {
  const userId = auth.currentUser?.uid || "";
  const eventsRef = collection(db, "Users", userId, "events");

  await deleteDoc(doc(eventsRef, id));
  updateSubject(event, "deletion");
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
};
