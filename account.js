import { auth } from "./firebase.js";

import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

window.signup = async function(){

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

try{

await createUserWithEmailAndPassword(auth,email,password);

alert("✅ Account Created Successfully");

}catch(error){

alert(error.message);

}

}

window.login = async function(){

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

try{

await signInWithEmailAndPassword(auth,email,password);

alert("✅ Login Successful");

window.location.href="index.html";

}catch(error){

alert(error.message);

}

}

window.logout = async function(){

await signOut(auth);

alert("Logged Out");

}