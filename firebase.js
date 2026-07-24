// ==========================
// SuitFlick Firebase Config
// ==========================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-storage.js";

// ==========================
// Firebase Configuration
// ==========================

const firebaseConfig = {
  apiKey: "AIzaSyAH8-NGz37uSYPuEMYtHXGR2ex5zNEit9k",
  authDomain: "suitflick-4cc66.firebaseapp.com",
  projectId: "suitflick-4cc66",
  storageBucket: "suitflick-4cc66.firebasestorage.app",
  messagingSenderId: "1078879146593",
  appId: "1:1078879146593:web:f96e6531befaa715dc5020"
};

// ==========================
// Initialize Firebase
// ==========================

const app = initializeApp(firebaseConfig);

// ==========================
// Firebase Services
// ==========================

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// ==========================
// Export
// ==========================

export { app, db, auth, storage };