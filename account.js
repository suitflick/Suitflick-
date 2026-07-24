// ==========================
// SuitFlick Final Account.js
// Part 1 - Imports + Login
// ==========================

import { app } from "./firebase.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const auth = getAuth(app);

// ==========================
// Login
// ==========================

const loginForm = document.getElementById("adminLoginForm");

if (loginForm) {
  loginForm.addEventListener("submit", loginAdmin);
}

async function loginAdmin(e) {
  e.preventDefault();

  const email = document.getElementById("adminEmail").value.trim();
  const password = document.getElementById("adminPassword").value;

  if (!email || !password) {
    alert("Please enter Email and Password");
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);

    localStorage.setItem("adminLoggedIn", "true");

    alert("✅ Login Successful");

    window.location.href = "admin.html";

  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

// ==========================
// Part 2 - Forgot Password + Logout
// ==========================

// Forgot Password
const forgotBtn = document.getElementById("forgotPasswordBtn");

if (forgotBtn) {
  forgotBtn.addEventListener("click", resetPassword);
}

async function resetPassword() {
  const email = document.getElementById("adminEmail").value.trim();

  if (!email) {
    alert("Please enter your email first.");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    alert("📧 Password reset email sent.");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

// Logout
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", logoutAdmin);
}

async function logoutAdmin() {
  try {
    await signOut(auth);

    localStorage.removeItem("adminLoggedIn");

    alert("👋 Logged Out Successfully");

    window.location.href = "account.html";

  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

// ==========================
// Part 3 - Session Check
// ==========================

// Firebase Auth State
onAuthStateChanged(auth, (user) => {

  if (user) {
    localStorage.setItem("adminLoggedIn", "true");
  } else {
    localStorage.removeItem("adminLoggedIn");
  }

});

// ==========================
// Check Session
// ==========================

function checkSession() {

  const loginBox = document.getElementById("loginBox");

  if (
    localStorage.getItem("adminLoggedIn") === "true" &&
    loginBox
  ) {
    loginBox.style.display = "none";
  }

}

document.addEventListener("DOMContentLoaded", checkSession);

// ==========================
// End of account.js
// ==========================