import { db } from "./firebase.js";

import {
collection,
addDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {

e.preventDefault();


const name = document.querySelector('input[type="text"]').value;

const mobile = document.querySelector('input[type="tel"]').value;

const email = document.querySelector('input[type="email"]').value;

const address = document.querySelector("textarea").value;

const pincode = document.querySelector('input[type="number"]').value;

const payment = document.querySelector("select").value;

const cart = JSON.parse(localStorage.getItem("cart")) || [];

let total = 0;

cart.forEach(item => {
total += Number(item.price);
});

try {

await addDoc(collection(db, "orders"), {


name: name,

mobile: mobile,

email: email,

address: address,

pincode: pincode,

paymentMethod: payment,

products: cart,

totalPrice: total,

createdAt: serverTimestamp()

});

alert("🎉 Order Placed Successfully!");

localStorage.removeItem("cart");

window.location.href = "index.html";

} catch (error) {

alert(error.message);

}

});