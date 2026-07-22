// ==========================
// SuitFlick Final Shop.js
// Part 1
// ==========================

import { db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const productsContainer = document.querySelector(".product-grid");

let allProducts = [];

// ==========================
// Load Products
// ==========================

async function loadProducts(){

if(!productsContainer) return;

productsContainer.innerHTML="<h2>Loading Products...</h2>";

try{

const querySnapshot=await getDocs(collection(db,"products"));

allProducts=[];

querySnapshot.forEach(doc=>{

allProducts.push({
id:doc.id,
...doc.data()
});

});

displayProducts(allProducts);

}catch(error){

console.error(error);

productsContainer.innerHTML="<h2>❌ Failed to Load Products</h2>";

}

}

// ==========================
// Display Products
// ==========================

function displayProducts(products){

productsContainer.innerHTML="";

if(products.length===0){

productsContainer.innerHTML="<h2>No Products Found</h2>";

return;

}

products.forEach(product=>{

productsContainer.innerHTML+=`

<div class="product-card">

<div class="badge">
${product.badge || "NEW"}
</div>

<img
src="${product.image1}"
alt="${product.name}"
onclick="openProduct('${product.id}')">

<h3>${product.name}</h3>

<p>₹${product.price}</p>

<button onclick="addToWishlist(
'${product.name}',
${product.price},
'${product.image1}'
)">
♡ Wishlist
</button>

<button onclick="addToCart(
'${product.name}',
${product.price},
'${product.image1}'
)">
Add To Cart
</button>

</div>

`;

});

}

// ==========================
// Initial Load
// ==========================

loadProducts();

// ==========================
// SuitFlick Final Shop.js
// Part 2
// ==========================

// ==========================
// Search Products
// ==========================

function searchProducts(){

const input=document.getElementById("searchInput");

if(!input) return;

const keyword=input.value.toLowerCase();

const filtered=allProducts.filter(product=>{

return(

product.name.toLowerCase().includes(keyword) ||

(product.category||"").toLowerCase().includes(keyword)

);

});

displayProducts(filtered);

}

// ==========================
// Category Filter
// ==========================

function filterCategory(category){

if(category==="All"){

displayProducts(allProducts);

return;

}

const filtered=allProducts.filter(product=>{

return product.category===category;

});

displayProducts(filtered);

}

// ==========================
// Price Filter
// ==========================

function filterPrice(maxPrice){

const filtered=allProducts.filter(product=>{

return Number(product.price)<=Number(maxPrice);

});

displayProducts(filtered);

}

// ==========================
// Best Seller Filter
// ==========================

function bestSeller(){

const filtered=allProducts.filter(product=>{

return product.bestSeller===true;

});

displayProducts(filtered);

}

// ==========================
// New Arrival Filter
// ==========================

function newArrival(){

const filtered=allProducts.filter(product=>{

return product.newArrival===true;

});

displayProducts(filtered);

}

// ==========================
// Sale Products
// ==========================

function saleProducts(){

const filtered=allProducts.filter(product=>{

return product.sale===true;

});

displayProducts(filtered);

}

// ==========================
// Stock Filter
// ==========================

function availableProducts(){

const filtered=allProducts.filter(product=>{

return product.stock>0;

});

displayProducts(filtered);

}

// ==========================
// Global Functions
// ==========================

window.searchProducts=searchProducts;

window.filterCategory=filterCategory;

window.filterPrice=filterPrice;

window.bestSeller=bestSeller;

window.newArrival=newArrival;

window.saleProducts=saleProducts;

window.availableProducts=availableProducts;

// ==========================
// SuitFlick Final Shop.js
// Part 3
// ==========================

// ==========================
// Color Filter
// ==========================

function filterColor(color){

if(color==="All"){

displayProducts(allProducts);

return;

}

const filtered=allProducts.filter(product=>{

return (product.color || "").toLowerCase()===color.toLowerCase();

});

displayProducts(filtered);

}

// ==========================
// Open Product Details
// ==========================

function openProduct(productId){

const product=allProducts.find(item=>item.id===productId);

if(!product) return;

localStorage.setItem("selectedProduct",JSON.stringify(product));

window.location.href="product.html";

}

// ==========================
// Product Badges
// ==========================

function getBadge(product){

if(product.stock===0){

return `<span class="badge out-stock">Out Of Stock</span>`;

}

if(product.sale){

return `<span class="badge sale">SALE</span>`;

}

if(product.bestSeller){

return `<span class="badge bestseller">BEST SELLER</span>`;

}

if(product.newArrival){

return `<span class="badge new">NEW</span>`;

}

return "";

}

// ==========================
// Refresh Product Cards
// ==========================

const oldDisplayProducts=displayProducts;

displayProducts=function(products){

productsContainer.innerHTML="";

if(products.length===0){

productsContainer.innerHTML="<h2>No Products Found</h2>";

return;

}

products.forEach(product=>{

productsContainer.innerHTML+=`

<div class="product-card">

${getBadge(product)}

<img
src="${product.image1}"
alt="${product.name}"
onclick="openProduct('${product.id}')">

<h3>${product.name}</h3>

<p>₹${product.price}</p>

<p><strong>Color:</strong> ${product.color || "-"}</p>

<button
onclick="addToWishlist('${product.name}',${product.price},'${product.image1}')">

♡ Wishlist

</button>

<button
${product.stock===0 ? "disabled" : ""}
onclick="addToCart('${product.name}',${product.price},'${product.image1}')">

${product.stock===0 ? "Out Of Stock" : "Add To Cart"}

</button>

</div>

`;

});

};

// ==========================
// Global Functions
// ==========================

window.filterColor=filterColor;
window.openProduct=openProduct;