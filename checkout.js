// ==========================
// SuitFlick Final Checkout.js
// Part 1
// ==========================

import { db } from "./firebase.js";

import {
collection,
addDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const form=document.querySelector("form");

form.addEventListener("submit",placeOrder);

async function placeOrder(e){

e.preventDefault();

const name=document.querySelector('input[type="text"]').value.trim();

const mobile=document.querySelector('input[type="tel"]').value.trim();

const email=document.querySelector('input[type="email"]').value.trim();

const address=document.querySelector("textarea").value.trim();

const pincode=document.querySelector('input[type="number"]').value.trim();

const payment=document.getElementById("paymentMode").value;

const cart=JSON.parse(localStorage.getItem("cart"))||[];

if(cart.length===0){

showToast("🛒 Your cart is empty");

return;

}

let total=0;

cart.forEach(item=>{

total+=Number(item.price)*Number(item.qty||1);

});

const order={

customerName:name,

mobile,

email,

address,

pincode,

paymentMethod:payment,

products:cart,

totalAmount:total,

status:"Paid",

orderDate:serverTimestamp()

};

try{

await addDoc(collection(db,"orders"),order);

localStorage.removeItem("cart");

showToast("🎉 Order Placed Successfully");

setTimeout(()=>{

window.location.href="index.html";

},1500);

}catch(error){

console.error(error);

showToast("❌ Order Failed");

}

}

// ==========================
// SuitFlick Final Checkout.js
// Part 2
// ==========================

// Total Amount

function loadCheckout(){

const cart=JSON.parse(localStorage.getItem("cart"))||[];

const totalElement=document.getElementById("checkoutTotal");

if(!totalElement) return;

let total=0;

cart.forEach(item=>{

total+=Number(item.price)*(item.qty||1);

});

totalElement.innerHTML="₹"+total;

}

// ==========================
// QR Code

function showQR(){

const payment=document.getElementById("paymentMode").value;

const qr=document.getElementById("qrBox");

if(!qr) return;

if(payment==="upi" || payment==="qr"){

qr.style.display="block";

}else{

qr.style.display="none";

}

}

// ==========================
// Mobile Validation

const mobileInput=document.querySelector('input[type="tel"]');

if(mobileInput){

mobileInput.addEventListener("input",()=>{

mobileInput.value=mobileInput.value.replace(/[^0-9]/g,"");

if(mobileInput.value.length>10){

mobileInput.value=mobileInput.value.slice(0,10);

}

});

}

// ==========================
// Pincode Validation

const pinInput=document.querySelector('input[type="number"]');

if(pinInput){

pinInput.addEventListener("input",()=>{

if(pinInput.value.length>6){

pinInput.value=pinInput.value.slice(0,6);

}

});

}

// ==========================
// Global

window.showQR=showQR;

document.addEventListener("DOMContentLoaded",loadCheckout);

// ==========================
// SuitFlick Final Checkout.js
// Part 3
// ==========================

// Success Message

function orderSuccess(){

showToast("🎉 Thank you for shopping with SuitFlick");

}

// Form Validation

function validateForm(){

const name=document.querySelector('input[type="text"]').value.trim();

const mobile=document.querySelector('input[type="tel"]').value.trim();

const address=document.querySelector("textarea").value.trim();

const payment=document.getElementById("paymentMode").value;

if(name===""){

showToast("Enter Full Name");

return false;

}

if(mobile.length!==10){

showToast("Enter Valid Mobile Number");

return false;

}

if(address===""){

showToast("Enter Delivery Address");

return false;

}

if(payment===""){

showToast("Select Payment Method");

return false;

}

return true;

}

// Replace Submit

const checkoutForm=document.querySelector("form");

if(checkoutForm){

checkoutForm.addEventListener("submit",(e)=>{

if(!validateForm()){

e.preventDefault();

return;

}

orderSuccess();

});

}

// ==========================
// Initialize

loadCheckout();

showQR();

<h3>
Total Amount :
<span id="checkoutTotal"></span>
</h3>

<div id="qrBox" style="display:none;">

<img src="images/payment-qr.png" alt="UPI QR Code">

<p>
Scan this QR Code and complete the payment.
</p>

</div>
