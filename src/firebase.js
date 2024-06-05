// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDQqaTp6yvjgNoiG2Wl9Zlv49D8Z8JweXs",
    authDomain: "skivetracker-d97f7.firebaseapp.com",
    projectId: "skivetracker-d97f7",
    storageBucket: "skivetracker-d97f7.appspot.com",
    messagingSenderId: "1046224209026",
    appId: "1:1046224209026:web:d36564664dbb047c80209b",
    measurementId: "G-HLWYBB3YHG"
};

// Initialize Firebase
//const analytics = getAnalytics(app);

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);