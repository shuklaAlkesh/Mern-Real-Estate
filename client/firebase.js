// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, // Ensure this environment variable is set and correct
  authDomain: "mern-alkeshestate.firebaseapp.com",
  projectId: "mern-alkeshestate",
  storageBucket: "mern-alkeshestate.appspot.com",
  messagingSenderId: "1012388504151",
  appId: "1:1012388504151:web:2bd5985f00d7e6df593912"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
