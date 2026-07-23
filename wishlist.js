// ==========================
// SuitFlick Final Wishlist.js
// Part 1
// ==========================

const wishlistContainer=document.getElementById("wishlistItems");

let wishlist=JSON.parse(localStorage.getItem("wishlist"))||[];

// ==========================
// Load Wishlist
// ==========================

function loadWishlist(){

wishlistContainer.innerHTML="";

if(wishlist.length===0){

wishlistContainer.innerHTML=`
<h2>Your Wishlist is Empty ❤️</h2>
`;

return;

}

wishlist.forEach((item,index)=>{

wishlistContainer.innerHTML+=`

<div class="wishlist-card">

<img src="${item.image}" alt="${item.name}">

<div class="wishlist-info">

<h3>${item.name}</h3>

<p>₹${item.price}</p>

<button onclick="moveToCart(${index})">

🛒 Move To Cart

</button>

<button onclick="removeWishlist(${index})">

🗑 Remove

</button>

</div>

</div>

`;

});

}

loadWishlist();

// ==========================
// SuitFlick Final Wishlist.js
// Part 2
// ==========================

// Move To Cart

function moveToCart(index){

let cart=JSON.parse(localStorage.getItem("cart"))||[];

cart.push({

name:wishlist[index].name,

price:wishlist[index].price,

image:wishlist[index].image,

qty:1

});

localStorage.setItem("cart",JSON.stringify(cart));

wishlist.splice(index,1);

localStorage.setItem("wishlist",JSON.stringify(wishlist));

showToast("🛒 Added To Cart");

loadWishlist();

updateCartCount();

}

// Remove

function removeWishlist(index){

wishlist.splice(index,1);

localStorage.setItem("wishlist",JSON.stringify(wishlist));

showToast("🗑 Removed From Wishlist");

loadWishlist();

}

// ==========================
// SuitFlick Final Wishlist.js
// Part 3
// ==========================

// Clear Wishlist

function clearWishlist(){

const ok=confirm("Clear Wishlist?");

if(!ok) return;

wishlist=[];

localStorage.removeItem("wishlist");

showToast("❤️ Wishlist Cleared");

loadWishlist();

}

// Global

window.moveToCart=moveToCart;

window.removeWishlist=removeWishlist;

window.clearWishlist=clearWishlist;

// Initialize

document.addEventListener("DOMContentLoaded",()=>{

loadWishlist();

});