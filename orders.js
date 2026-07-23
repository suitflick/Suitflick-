// ==========================
// SuitFlick Final Orders.js
// Part 1
// ==========================

import { db } from "./firebase.js";

import {
collection,
getDocs,
doc,
updateDoc,
deleteDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const ordersContainer=document.getElementById("ordersContainer");

let totalRevenue=0;
let totalOrders=0;
let pendingOrders=0;
let deliveredOrders=0;

// ==========================
// Load Orders
// ==========================

async function loadOrders(){

ordersContainer.innerHTML="Loading Orders...";

const querySnapshot=await getDocs(collection(db,"orders"));

ordersContainer.innerHTML="";

totalRevenue=0;
totalOrders=0;
pendingOrders=0;
deliveredOrders=0;

querySnapshot.forEach((document)=>{

const order=document.data();

const status=order.status || "Pending";

totalOrders++;

totalRevenue+=Number(order.totalAmount);

if(status==="Delivered"){
deliveredOrders++;
}else{
pendingOrders++;
}

let products="";

order.products.forEach(item=>{

products+=`
<li>
${item.name}
(${item.qty})
- ₹${item.price}
</li>
`;

});

ordersContainer.innerHTML+=`

<div class="order-card">

<h3>${order.customerName}</h3>

<p><b>Mobile:</b> ${order.mobile}</p>

<p><b>Address:</b> ${order.address}</p>

<p><b>Payment:</b> ${order.paymentMethod}</p>

<p><b>Total:</b> ₹${order.totalAmount}</p>

<p><b>Status:</b> ${status}</p>

<ul>

${products}

</ul>

<button
onclick="changeStatus('${document.id}','Packed')">

Packed

</button>

<button
onclick="changeStatus('${document.id}','Shipped')">

Shipped

</button>

<button
onclick="changeStatus('${document.id}','Delivered')">

Delivered

</button>

<button
onclick="deleteOrder('${document.id}')">

Delete

</button>

</div>

`;

});

updateSummary();

}

// ==========================
// SuitFlick Final Orders.js
// Part 2
// ==========================

// Update Status

async function changeStatus(id,status){

try{

await updateDoc(doc(db,"orders",id),{

status:status

});

showToast("Order Updated");

loadOrders();

}catch(error){

console.error(error);

showToast("Update Failed");

}

}

// Delete Order

async function deleteOrder(id){

const ok=confirm("Delete this order?");

if(!ok) return;

try{

await deleteDoc(doc(db,"orders",id));

showToast("Order Deleted");

loadOrders();

}catch(error){

console.error(error);

showToast("Delete Failed");

}

}

// Summary

function updateSummary(){

document.getElementById("totalOrders").innerText=totalOrders;

document.getElementById("pendingOrders").innerText=pendingOrders;

document.getElementById("deliveredOrders").innerText=deliveredOrders;

document.getElementById("totalRevenue").innerText="₹"+totalRevenue;

}

// Search Orders

function searchOrders(){

const input=document
.getElementById("searchOrders")
.value
.toLowerCase();

const cards=document.querySelectorAll(".order-card");

cards.forEach(card=>{

const text=card.innerText.toLowerCase();

card.style.display=text.includes(input)
?"block"
:"none";

});

}

window.searchOrders=searchOrders;

// ==========================
// SuitFlick Final Orders.js
// Part 3
// ==========================

// Auto Refresh

setInterval(()=>{

loadOrders();

},30000);

// Global

window.changeStatus=changeStatus;

window.deleteOrder=deleteOrder;

// Admin Login Check

if(localStorage.getItem("adminLoggedIn")!=="true"){

window.location.href="account.html";

}

// Initialize

document.addEventListener("DOMContentLoaded",()=>{

loadOrders();

});