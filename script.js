// ===============================
// SuitFlick JavaScript
// ===============================

console.log("SuitFlick Loaded Successfully");

// -------------------------------
// Search Products
// -------------------------------
function searchProducts() {

    let input = document.getElementById("searchInput").value.toLowerCase();

    let products = document.querySelectorAll(".product-card");

    products.forEach(function(product) {

        let name = product.querySelector("h3").innerText.toLowerCase();

        if (name.includes(input)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }

    });

}

// -------------------------------
// Add To Cart
// -------------------------------
function addToCart(name, price) {

    alert("Button is Working!");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({
        name: name,
        price: price
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " Added To Cart 🛒");

}

// -------------------------------
// Button Click Log
// -------------------------------
document.querySelectorAll("button").forEach(function(button) {

    button.addEventListener("click", function() {
        console.log(button.innerText + " clicked");
    });

});