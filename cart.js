// ==========================
// SuitFlick Final Cart.js
// Part 1
// ==========================

const cartContainer = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ==========================
// Load Cart
// ==========================

function loadCart() {

cartContainer.innerHTML = "";

if(cart.length === 0){

cartContainer.innerHTML = `
<h2>Your Cart is Empty 🛒</h2>
`;

totalPrice.innerHTML = "₹0";

return;

}

let total = 0;

cart.forEach((item,index)=>{

const qty = Number(item.qty || 1);

const subtotal = Number(item.price) * qty;

total += subtotal;

cartContainer.innerHTML += `

<div class="cart-card">

<img src="${item.image}" alt="${item.name}">

<div class="cart-info">

<h3>${item.name}</h3>

<p>₹${item.price}</p>

<p>Size : ${item.size || "M"}</p>

<p>Color : ${item.color || "-"}</p>

<div class="qty-box">

<button onclick="decreaseQty(${index})">−</button>

<span>${qty}</span>

<button onclick="increaseQty(${index})">+</button>

</div>

<p><b>Subtotal :</b> ₹${subtotal}</p>

<button onclick="removeItem(${index})">

🗑 Remove

</button>

</div>

</div>

`;

});

totalPrice.innerHTML = "₹" + total;

}

// ==========================
// Initial Load
// ==========================

loadCart();

// ==========================
// SuitFlick Final Cart.js
// Part 2
// ==========================

// ==========================
// Increase Quantity
// ==========================

function increaseQty(index){

cart[index].qty = Number(cart[index].qty || 1) + 1;

localStorage.setItem("cart",JSON.stringify(cart));

loadCart();

}

// ==========================
// Decrease Quantity
// ==========================

function decreaseQty(index){

if(Number(cart[index].qty)>1){

cart[index].qty--;

}

localStorage.setItem("cart",JSON.stringify(cart));

loadCart();

}

// ==========================
// Remove Item
// ==========================

function removeItem(index){

cart.splice(index,1);

localStorage.setItem("cart",JSON.stringify(cart));

showToast("🗑 Product Removed");

loadCart();

updateCartCount();

}

// ==========================
// Clear Cart
// ==========================

function clearCart(){

const ok=confirm("Clear your cart?");

if(!ok) return;

cart=[];

localStorage.removeItem("cart");

showToast("🛒 Cart Cleared");

loadCart();

updateCartCount();

}

// ==========================
// Checkout
// ==========================

function goToCheckout(){

if(cart.length===0){

showToast("Your Cart is Empty");

return;

}

window.location.href="checkout.html";

}

// ==========================
// Global Functions
// ==========================

window.increaseQty=increaseQty;

window.decreaseQty=decreaseQty;

window.removeItem=removeItem;

window.clearCart=clearCart;

window.goToCheckout=goToCheckout;

// ==========================
// SuitFlick Final Cart.js
// Part 3
// ==========================

// ==========================
// Move To Wishlist
// ==========================

function moveToWishlist(index){

let wishlist=JSON.parse(localStorage.getItem("wishlist"))||[];

wishlist.push(cart[index]);

localStorage.setItem("wishlist",JSON.stringify(wishlist));

cart.splice(index,1);

localStorage.setItem("cart",JSON.stringify(cart));

showToast("❤️ Moved To Wishlist");

loadCart();

updateCartCount();

}

// ==========================
// Free Delivery
// ==========================

function updateFreeDelivery(){

const progress=document.getElementById("freeDelivery");

if(!progress) return;

let total=0;

cart.forEach(item=>{

total+=Number(item.price)*(Number(item.qty)||1);

});

if(total>=999){

progress.innerHTML="🎉 Congratulations! You got FREE Delivery.";

}else{

const left=999-total;

progress.innerHTML=`Add ₹${left} more to get FREE Delivery`;

}

}

// ==========================
// Cart Savings
// ==========================

function updateSavings(){

const saving=document.getElementById("cartSavings");

if(!saving) return;

let saved=0;

cart.forEach(item=>{

if(item.offerPrice){

saved+=(Number(item.price)-Number(item.offerPrice))*(Number(item.qty)||1);

}

});

saving.innerHTML="You Saved ₹"+saved;

}

// ==========================
// Initialize
// ==========================

document.addEventListener("DOMContentLoaded",()=>{

loadCart();

updateFreeDelivery();

updateSavings();

});

// ==========================
// Global Functions
// ==========================

window.moveToWishlist=moveToWishlist;