// ==========================
// SuitFlick Final Account.js
// Part 1
// ==========================

import {
getAuth,
signInWithEmailAndPassword,
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

import { app } from "./firebase.js";

const auth=getAuth(app);

const loginForm=document.getElementById("adminLoginForm");

if(loginForm){

loginForm.addEventListener("submit",loginAdmin);

}

// ==========================
// Admin Login
// ==========================

async function loginAdmin(e){

e.preventDefault();

const email=document.getElementById("adminEmail").value.trim();

const password=document.getElementById("adminPassword").value;

try{

await signInWithEmailAndPassword(auth,email,password);

localStorage.setItem("adminLoggedIn","true");

showToast("✅ Login Successful");

setTimeout(()=>{

window.location.href="admin.html";

},1000);

}catch(error){

console.error(error);

showToast("❌ Invalid Email or Password");

}

}

// ==========================
// Check Login
// ==========================

onAuthStateChanged(auth,(user)=>{

if(user){

localStorage.setItem("adminLoggedIn","true");

}

});

// ==========================
// SuitFlick Final Account.js
// Part 2
// ==========================

import {
sendPasswordResetEmail,
signOut
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

// ==========================
// Forgot Password
// ==========================

const forgotBtn=document.getElementById("forgotPasswordBtn");

if(forgotBtn){

forgotBtn.addEventListener("click",resetPassword);

}

async function resetPassword(){

const email=document.getElementById("adminEmail").value.trim();

if(email===""){

showToast("Enter your Email");

return;

}

try{

await sendPasswordResetEmail(auth,email);

showToast("📧 Password Reset Email Sent");

}catch(error){

console.error(error);

showToast("❌ Failed to Send Email");

}

}

// ==========================
// Logout
// ==========================

const logoutBtn=document.getElementById("logoutBtn");

if(logoutBtn){

logoutBtn.addEventListener("click",logoutAdmin);

}

async function logoutAdmin(){

try{

await signOut(auth);

localStorage.removeItem("adminLoggedIn");

showToast("👋 Logged Out");

setTimeout(()=>{

window.location.href="account.html";

},1000);

}catch(error){

console.error(error);

showToast("Logout Failed");

}

}

// ==========================
// Session Check
// ==========================

function checkSession(){

if(localStorage.getItem("adminLoggedIn")==="true"){

const loginBox=document.getElementById("loginBox");

if(loginBox){

loginBox.style.display="none";

}

}

}

document.addEventListener("DOMContentLoaded",checkSession);