// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCqEbJypGq7KQ06uTXzIiMrqcaewV50Rg",
  authDomain: "podcast-platform-e9faa.firebaseapp.com",
  projectId: "podcast-platform-e9faa",
  storageBucket: "podcast-platform-e9faa.appspot.com",
  messagingSenderId: "772048168599",
  appId: "1:772048168599:web:4fdf4f09298942dc4febd2",
  measurementId: "G-EV7J8LTEGE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { db, auth, storage };