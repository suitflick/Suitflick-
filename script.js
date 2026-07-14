document.querySelectorAll("button").forEach(button=>{

button.addEventListener("click",()=>{

console.log("Button clicked");

});

});
// SuitFlick JavaScript

console.log("SuitFlick Loaded Successfully");

// Shop Now Button
document.querySelectorAll("button").forEach(button => {
  button.addEventListener("click", function () {
    console.log(button.innerText + " clicked");
  });
});
function searchProducts() {

let input = document.getElementById("searchInput").value.toLowerCase();

let products = document.querySelectorAll(".product-card");

products.forEach(function(product){

let name = product.querySelector("h3").innerText.toLowerCase();

if(name.includes(input)){
product.style.display="block";
}else{
product.style.display="none";
}

});

}
function addToCart(name, price){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

cart.push({
name:name,
price:price
});

localStorage.setItem("cart",JSON.stringify(cart));

alert("Product Added To Cart 🛒");

}