// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKvh-B5YBd-EpMWQq_1MwrRDB8YSredpw",
  authDomain: "sentience-33679.firebaseapp.com",
  projectId: "sentience-33679",
  storageBucket: "sentience-33679.appspot.com",
  messagingSenderId: "85765320511",
  appId: "1:85765320511:web:ec932d13ca02532ea8ad8a",
  measurementId: "G-P744NCDEB8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);