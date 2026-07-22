// ==========================
// SuitFlick Final Product.js
// Part 1
// ==========================

import { db } from "./firebase.js";

import {
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

// ==========================
// Selected Product
// ==========================

const selectedProduct =
JSON.parse(localStorage.getItem("selectedProduct"));

if(selectedProduct){

loadProduct(selectedProduct.id);

}

// ==========================
// Load Product
// ==========================

async function loadProduct(id){

try{

const productRef = doc(db,"products",id);

const productSnap = await getDoc(productRef);

if(!productSnap.exists()){

document.querySelector(".product-details").innerHTML=
"<h2>Product Not Found</h2>";

return;

}

const product = productSnap.data();

showProduct(product);

}catch(error){

console.error(error);

}

}

// ==========================
// Show Product
// ==========================

function showProduct(product){

document.getElementById("productName").innerText =
product.name;

document.getElementById("productPrice").innerText =
"₹"+product.price;

document.getElementById("productDescription").innerText =
product.description;

// Main Image

document.getElementById("productImage").src =
product.image1;

// Gallery Images

const gallery =
document.getElementById("gallery");

gallery.innerHTML="";

const images=[

product.image1,
product.image2,
product.image3,
product.image4,
product.image5,
product.image6

];

images.forEach(image=>{

if(image){

gallery.innerHTML+=`

<img
src="${image}"
class="thumb"
onclick="changeImage('${image}')">

`;

}

});

}

// ==========================
// Change Image
// ==========================

function changeImage(image){

document.getElementById("productImage").src=image;

}

window.changeImage=changeImage;

// ==========================
// SuitFlick Final Product.js
// Part 2
// ==========================

// ==========================
// Product Details
// ==========================

function loadProductDetails(product){

// Color
document.getElementById("productColor").innerText =
product.color || "N/A";

// Fabric
document.getElementById("productFabric").innerText =
product.fabric || "N/A";

// Sleeve
document.getElementById("productSleeve").innerText =
product.sleeve || "N/A";

// Neck
document.getElementById("productNeck").innerText =
product.neck || "N/A";

// Stock
const stock=document.getElementById("productStock");

if(product.stock>0){

stock.innerHTML="✅ In Stock";

stock.style.color="green";

}else{

stock.innerHTML="❌ Out Of Stock";

stock.style.color="red";

}

}

// ==========================
// Selected Size
// ==========================

let selectedSize="M";

const sizeSelect=document.getElementById("size");

if(sizeSelect){

sizeSelect.addEventListener("change",(e)=>{

selectedSize=e.target.value;

});

}

// ==========================
// Quantity
// ==========================

function increaseQty(){

const qty=document.getElementById("qty");

qty.value=Number(qty.value)+1;

}

function decreaseQty(){

const qty=document.getElementById("qty");

if(Number(qty.value)>1){

qty.value=Number(qty.value)-1;

}

}

// ==========================
// Add To Cart
// ==========================

function addCurrentProduct(){

const qty=Number(document.getElementById("qty").value);

const product=JSON.parse(localStorage.getItem("selectedProduct"));

let cart=JSON.parse(localStorage.getItem("cart"))||[];

cart.push({

name:product.name,

price:product.price,

image:product.image1,

qty:qty,

size:selectedSize,

color:product.color

});

localStorage.setItem("cart",JSON.stringify(cart));

showToast("🛒 Added To Cart");

}

// ==========================
// Buy Now
// ==========================

function buyCurrentProduct(){

addCurrentProduct();

window.location.href="checkout.html";

}

// ==========================
// Buttons
// ==========================

const cartBtn=document.getElementById("cartBtn");

if(cartBtn){

cartBtn.onclick=addCurrentProduct;

}

const buyBtn=document.getElementById("buyBtn");

if(buyBtn){

buyBtn.onclick=buyCurrentProduct;

}

// ==========================
// Global Functions
// ==========================

window.increaseQty=increaseQty;

window.decreaseQty=decreaseQty;

// ==========================
// SuitFlick Final Product.js
// Part 3
// ==========================

// ==========================
// Wishlist
// ==========================

function addCurrentToWishlist(){

const product=JSON.parse(localStorage.getItem("selectedProduct"));

let wishlist=JSON.parse(localStorage.getItem("wishlist"))||[];

const exists=wishlist.find(item=>item.name===product.name);

if(exists){

showToast("❤️ Already in Wishlist");

return;

}

wishlist.push({

name:product.name,
price:product.price,
image:product.image1

});

localStorage.setItem("wishlist",JSON.stringify(wishlist));

showToast("❤️ Added To Wishlist");

}

// ==========================
// Estimated Delivery
// ==========================

function deliveryDate(){

const today=new Date();

today.setDate(today.getDate()+5);

const options={

day:"numeric",
month:"long"

};

const delivery=document.getElementById("deliveryDate");

if(delivery){

delivery.innerHTML=today.toLocaleDateString("en-IN",options);

}

}

// ==========================
// Rating
// ==========================

function loadRating(){

const rating=document.getElementById("rating");

if(rating){

rating.innerHTML="⭐⭐⭐⭐⭐ 4.8 (250+ Reviews)";

}

}

// ==========================
// Related Products
// ==========================

async function loadRelatedProducts(){

const container=document.getElementById("relatedProducts");

if(!container) return;

const querySnapshot=await getDocs(collection(db,"products"));

container.innerHTML="";

let count=0;

querySnapshot.forEach(doc=>{

if(count>=4) return;

const product=doc.data();

container.innerHTML+=`

<div class="product-card">

<img
src="${product.image1}"
onclick="location.href='shop.html'">

<h3>${product.name}</h3>

<p>₹${product.price}</p>

</div>

`;

count++;

});

}

// ==========================
// Size Chart (CM)
// ==========================

function loadSizeChart(){

const chart=document.getElementById("sizeChart");

if(!chart) return;

chart.innerHTML=`

<table>

<tr>

<th>Size</th>
<th>Bust</th>
<th>Waist</th>
<th>Hip</th>

</tr>

<tr>
<td>XS</td>
<td>81</td>
<td>66</td>
<td>89</td>
</tr>

<tr>
<td>S</td>
<td>86</td>
<td>71</td>
<td>94</td>
</tr>

<tr>
<td>M</td>
<td>91</td>
<td>76</td>
<td>99</td>
</tr>

<tr>
<td>L</td>
<td>97</td>
<td>81</td>
<td>104</td>
</tr>

<tr>
<td>XL</td>
<td>102</td>
<td>86</td>
<td>109</td>
</tr>

<tr>
<td>XXL</td>
<td>107</td>
<td>91</td>
<td>114</td>
</tr>

</table>

`;

}

// ==========================
// Initialize
// ==========================

document.addEventListener("DOMContentLoaded",()=>{

deliveryDate();

loadRating();

loadRelatedProducts();

loadSizeChart();

});

// ==========================
// Global Functions
// ==========================

window.addCurrentToWishlist=addCurrentToWishlist;