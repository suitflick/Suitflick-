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

