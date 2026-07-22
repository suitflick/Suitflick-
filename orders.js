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