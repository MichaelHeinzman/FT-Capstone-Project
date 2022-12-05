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
import { getFirestore } from "firebase/firestore";

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

export { auth, db, login, signup, userSignout, resetPassword };
