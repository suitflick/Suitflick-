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
const paymentMode = document.getElementById("paymentMode");
const paymentMessage = document.getElementById("paymentMessage");

paymentMode.addEventListener("change", () => {

if (paymentMode.value === "cod") {

paymentMessage.innerHTML =
"🚚 Cash on Delivery selected.<br><b>₹200 advance payment is required to confirm your COD order.</b>";

}

else if (paymentMode.value === "prepaid") {

paymentMessage.innerHTML =
"💳 Full Online Payment selected.<br><b>You will get faster order processing.</b>";

}

else{

paymentMessage.innerHTML="";

}

});

let total = 0;

cart.forEach(item => {
total += Number(item.price);
});

try {

await addDoc(collection(db, "orders"), {

name,
mobile,
email,
address,
pincode,
paymentMethod: payment,
products: cart,
totalPrice: total,
orderStatus: "Pending",
createdAt: serverTimestamp()

});

alert("🎉 Order Placed Successfully!");

localStorage.removeItem("cart");

window.location.href="success.html";

} catch (error) {

alert(error.message);

}

});