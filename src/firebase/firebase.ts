// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCw0BWvXKikzlE7lOKWwFQ_yD5hrX4SjHg",
  authDomain: "traveller-6c8a9.firebaseapp.com",
  projectId: "traveller-6c8a9",
  storageBucket: "traveller-6c8a9.appspot.com",
  messagingSenderId: "611359229606",
  appId: "1:611359229606:web:34070a3885d1d78e92d667",
  measurementId: "G-44QDK56THB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export const db = getFirestore(app);

export const storage = getStorage(app);

export { app, auth };