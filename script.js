// ==========================
// SuitFlick Final Script
// Part 1
// ==========================

// Cart & Wishlist

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// ==========================
// Mobile Menu
// ==========================

function toggleMenu() {

const nav = document.getElementById("navbar");

if(nav){
nav.classList.toggle("show");
}

}

// ==========================
// Cart Count
// ==========================

function updateCartCount(){

const count=document.getElementById("cartCount");

if(count){
count.innerText=cart.length;
}

}

// ==========================
// Wishlist Count
// ==========================

function updateWishlistCount(){

const count=document.getElementById("wishlistCount");

if(count){
count.innerText=wishlist.length;
}

}

// ==========================
// Add To Cart
// ==========================

function addToCart(name,price,image=""){

cart.push({

name,
price,
image,
qty:1

});

localStorage.setItem("cart",JSON.stringify(cart));

updateCartCount();

alert("🛒 Product Added To Cart");

}

// ==========================
// Remove Cart Item
// ==========================

function removeCart(index){

cart.splice(index,1);

localStorage.setItem("cart",JSON.stringify(cart));

location.reload();

}

// ==========================
// Clear Cart
// ==========================

function clearCart(){

if(confirm("Clear complete cart?")){

localStorage.removeItem("cart");

cart=[];

location.reload();

}

}

// ==========================
// Add Wishlist
// ==========================

function addToWishlist(name,price,image=""){

const exists=wishlist.find(item=>item.name===name);

if(exists){

alert("❤️ Already in Wishlist");

return;

}

wishlist.push({

name,
price,
image

});

localStorage.setItem("wishlist",JSON.stringify(wishlist));

updateWishlistCount();

alert("❤️ Added To Wishlist");

}

// ==========================
// Remove Wishlist
// ==========================

function removeWishlist(index){

wishlist.splice(index,1);

localStorage.setItem("wishlist",JSON.stringify(wishlist));

location.reload();

}

// ==========================
// Load Counts
// ==========================

updateCartCount();

updateWishlistCount();

// ==========================
// SuitFlick Final Script
// Part 2
// ==========================

// ==========================
// Product Search
// ==========================

function searchProducts(){

const input=document.getElementById("searchInput");

if(!input) return;

const filter=input.value.toLowerCase();

const products=document.querySelectorAll(".product-card");

products.forEach(card=>{

const title=card.querySelector("h3").innerText.toLowerCase();

if(title.includes(filter)){

card.style.display="block";

}else{

card.style.display="none";

}

});

}

// ==========================
// Load Cart
// ==========================

function loadCart(){

const container=document.getElementById("cartItems");

const total=document.getElementById("totalPrice");

if(!container) return;

container.innerHTML="";

let totalPrice=0;

if(cart.length===0){

container.innerHTML="<h3>Your Cart is Empty 🛒</h3>";

if(total){

total.innerHTML="Total : ₹0";

}

return;

}

cart.forEach((item,index)=>{

totalPrice+=Number(item.price)*Number(item.qty);

container.innerHTML+=`

<div class="product-card">

<img src="${item.image}" alt="${item.name}">

<h3>${item.name}</h3>

<p>₹${item.price}</p>

<p>Qty : ${item.qty}</p>

<button onclick="removeCart(${index})">

Remove

</button>

</div>

`;

});

if(total){

total.innerHTML=`Total : ₹${totalPrice}`;

}

}

// ==========================
// Load Wishlist
// ==========================

function loadWishlist(){

const container=document.getElementById("wishlistItems");

if(!container) return;

container.innerHTML="";

if(wishlist.length===0){

container.innerHTML="<h3>Your Wishlist is Empty ❤️</h3>";

return;

}

wishlist.forEach((item,index)=>{

container.innerHTML+=`

<div class="product-card">

<img src="${item.image}" alt="${item.name}">

<h3>${item.name}</h3>

<p>₹${item.price}</p>

<button onclick="addToCart('${item.name}','${item.price}','${item.image}')">

Move To Cart

</button>

<button onclick="removeWishlist(${index})">

Remove

</button>

</div>

`;

});

}

// ==========================
// Auto Load
// ==========================

loadCart();

loadWishlist();

// ==========================
// SuitFlick Final Script
// Part 3
// ==========================

// ==========================
// Buy Now
// ==========================

function buyNow(name, price, image = "") {

localStorage.setItem("buyNow", JSON.stringify({
name,
price,
image,
qty:1
}));

window.location.href="checkout.html";

}

// ==========================
// Open Product Details
// ==========================

function openProduct(product){

localStorage.setItem("selectedProduct",JSON.stringify(product));

window.location.href="product.html";

}

// ==========================
// Quantity Update
// ==========================

function updateQty(index,change){

if(!cart[index]) return;

cart[index].qty=(cart[index].qty||1)+change;

if(cart[index].qty<1){

cart[index].qty=1;

}

localStorage.setItem("cart",JSON.stringify(cart));

loadCart();

updateCartCount();

}

// ==========================
// Toast Notification
// ==========================

function showToast(message){

const toast=document.createElement("div");

toast.innerText=message;

toast.style.position="fixed";
toast.style.bottom="20px";
toast.style.right="20px";
toast.style.background="#ff3f6c";
toast.style.color="#fff";
toast.style.padding="14px 22px";
toast.style.borderRadius="10px";
toast.style.boxShadow="0 8px 20px rgba(0,0,0,.2)";
toast.style.zIndex="9999";

document.body.appendChild(toast);

setTimeout(()=>{

toast.remove();

},2500);

}

// ==========================
// Replace Alerts
// ==========================

window.addToCart=(name,price,image="")=>{

cart.push({
name,
price,
image,
qty:1
});

localStorage.setItem("cart",JSON.stringify(cart));

updateCartCount();

showToast("🛒 Added to Cart");

};

window.addToWishlist=(name,price,image="")=>{

const exists=wishlist.find(item=>item.name===name);

if(exists){

showToast("❤️ Already in Wishlist");

return;

}

wishlist.push({
name,
price,
image
});

localStorage.setItem("wishlist",JSON.stringify(wishlist));

updateWishlistCount();

showToast("❤️ Added to Wishlist");

};

// ==========================
// Initialization
// ==========================

document.addEventListener("DOMContentLoaded",()=>{

updateCartCount();

updateWishlistCount();

if(document.getElementById("cartItems")){

loadCart();

}

if(document.getElementById("wishlistItems")){

loadWishlist();

}

});

// ==========================
// Global Functions
// ==========================

window.toggleMenu=toggleMenu;
window.searchProducts=searchProducts;
window.removeCart=removeCart;
window.removeWishlist=removeWishlist;
window.clearCart=clearCart;
window.buyNow=buyNow;
window.openProduct=openProduct;
window.updateQty=updateQty;