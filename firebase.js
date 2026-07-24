// ==========================
// SuitFlick Firebase Config
// ==========================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-storage.js";

// ==========================
// Firebase Configuration
// Replace with your own config
// ==========================

const firebaseConfig = {

apiKey: "YOUR_API_KEY",

authDomain: "YOUR_PROJECT.firebaseapp.com",

projectId: "YOUR_PROJECT_ID",

storageBucket: "YOUR_PROJECT.appspot.com",

messagingSenderId: "YOUR_SENDER_ID",

appId: "YOUR_APP_ID"

};

// ==========================
// Initialize Firebase
// ==========================

const app = initializeApp(firebaseConfig);

// ==========================
// Services
// ==========================

const db = getFirestore(app);

const auth = getAuth(app);

const storage = getStorage(app);

// ==========================
// Export
// ==========================

export { app, db, auth, storage };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAH8-NGz37uSYPuEMYtHXGR2ex5zNEit9k",
  authDomain: "suitflick-4cc66.firebaseapp.com",
  databaseURL: "https://suitflick-4cc66-default-rtdb.firebaseio.com",
  projectId: "suitflick-4cc66",
  storageBucket: "suitflick-4cc66.firebasestorage.app",
  messagingSenderId: "1078879146593",
  appId: "1:1078879146593:web:f96e6531befaa715dc5020",
  measurementId: "G-94B288XNR0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

