// ==========================
// SuitFlick JavaScript
// ==========================

console.log("SuitFlick Loaded");

// --------------------------
// Search Products
// --------------------------
function searchProducts() {

    let searchBox = document.getElementById("searchInput");

    if (!searchBox) return;

    let input = searchBox.value.toLowerCase();
function clearCart() {

localStorage.removeItem("cart");

loadCart();

}

function loadCart() {

let cartItems = document.getElementById("cartItems");

if (!cartItems) return;

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cartItems.innerHTML = "";

let total = 0;

if (cart.length === 0) {

cartItems.innerHTML = "<h3>Your Cart is Empty 🛒</h3>";

document.getElementById("totalPrice").innerHTML = "Total : ₹0";

return;

}

cart.forEach(function(item,index){

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

document.getElementById("totalPrice").innerHTML =
"Total : ₹"+total;

}

function removeItem(index){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.splice(index,1);

localStorage.setItem("cart",JSON.stringify(cart));

loadCart();

}

window.onload = loadCart;
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
        price: price
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

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = "<h3>Your Cart is Empty</h3>";
        return;

    }

    cart.forEach(function(item) {

        total += item.price;

        cartItems.innerHTML += `
        <div class="product-card">
            <h3>${item.name}</h3>
            <p>₹${item.price}</p>
        </div>
        `;

    });

    let totalBox = document.getElementById("totalPrice");

    if (totalBox) {
        totalBox.innerHTML = "Total : ₹" + total;
    }

}

window.onload = loadCart;