// ==========================
// SuitFlick JavaScript
// ==========================

console.log("SuitFlick Loaded Successfully");

// --------------------------
// Search Products
// --------------------------
function searchProducts() {

    let searchBox = document.getElementById("searchInput");

    if (!searchBox) return;

    let input = searchBox.value.toLowerCase();

    let products = document.querySelectorAll(".product-card");

    products.forEach(function(product) {

        let title = product.querySelector("h3").innerText.toLowerCase();

        if (title.includes(input)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }

    });

}

// --------------------------
// Add To Cart
// --------------------------
function addToCart(name, price) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
    name: name,
    price: price,
    quantity: 1
});

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart 🛒");

}

// --------------------------
// Load Cart
// --------------------------
function loadCart() {

    let cartItems = document.getElementById("cartItems");

    if (!cartItems) return;

    let totalBox = document.getElementById("totalPrice");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = "<h3>Your Cart is Empty 🛒</h3>";

        if (totalBox) {
            totalBox.innerHTML = "Total : ₹0";
        }

        return;

    }

    cart.forEach(function(item, index) {

        total += item.price;

        cartItems.innerHTML += `
        <div class="product-card">
            <h3>${item.name}</h3>
            <p>₹${item.price}</p>

            <button onclick="removeItem(${index})">
                Remove
            </button>
        </div>
        `;

    });

    if (totalBox) {
        totalBox.innerHTML = "Total : ₹" + total;
    }

}

// --------------------------
// Remove Item
// --------------------------
function removeItem(index) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();

}

// --------------------------
// Clear Cart
// --------------------------
function clearCart() {

    localStorage.removeItem("cart");

    loadCart();

}

// --------------------------
// Auto Load Cart
// --------------------------
window.onload = function () {
    loadCart();
};
// Wishlist

function addToWishlist(name, price){

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

wishlist.push({
name:name,
price:price
});

localStorage.setItem("wishlist",JSON.stringify(wishlist));

alert(name + " added to Wishlist ❤️");

}
function loadWishlist(){

let wishlistItems = document.getElementById("wishlistItems");

if(!wishlistItems) return;

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

wishlistItems.innerHTML="";

if(wishlist.length===0){

wishlistItems.innerHTML="<h3>Your Wishlist is Empty ❤️</h3>";

return;

}

wishlist.forEach(function(item){

wishlistItems.innerHTML += `
<div class="product-card">
<h3>${item.name}</h3>
<p>₹${item.price}</p>
</div>
`;

});

}

window.addEventListener("load", loadWishlist);
function increaseQty(index){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart[index].quantity++;

localStorage.setItem("cart",JSON.stringify(cart));

loadCart();

}

function decreaseQty(index){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

if(cart[index].quantity>1){

cart[index].quantity--;

}else{

cart.splice(index,1);

}

localStorage.setItem("cart",JSON.stringify(cart));

loadCart();

}
// ==========================
// Account Functions
// ==========================

function signup(){

alert("Sign Up feature coming soon");

}

function login(){

alert("Login feature coming soon");

}

function logout(){

alert("Logged Out Successfully");

}
function toggleMenu(){

document.getElementById("navbar").classList.toggle("show");

}