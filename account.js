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