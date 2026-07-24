// ==========================
// SuitFlick Final Admin.js
// Part 1
// ==========================

import { db } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

// ==========================
// Add Product
// ==========================

const addBtn=document.getElementById("addProductBtn");

if(addBtn){

addBtn.addEventListener("click",addProduct);

}

async function addProduct(){

const product={

name:document.getElementById("productName").value,

category:document.getElementById("category").value,

price:Number(document.getElementById("price").value),

offerPrice:Number(document.getElementById("offerPrice").value),

badge:document.getElementById("badge").value,

color:document.getElementById("color").value,

fabric:document.getElementById("fabric").value,

sleeve:document.getElementById("sleeve").value,

neck:document.getElementById("neck").value,

stock:Number(document.getElementById("stock").value),

description:document.getElementById("description").value,

image1:document.getElementById("image1").value,

image2:document.getElementById("image2").value,

image3:document.getElementById("image3").value,

image4:document.getElementById("image4").value,

image5:document.getElementById("image5").value,

image6:document.getElementById("image6").value,

createdAt:serverTimestamp()

};

// Sizes

const selectedSizes=[];

document
.querySelectorAll(".sizes input:checked")
.forEach(size=>{

selectedSizes.push(size.value);

});

product.sizes=selectedSizes;

try{

await addDoc(collection(db,"products"),product);

showToast("✅ Product Added Successfully");

document.querySelector(".admin").reset?.();

loadProducts();

}catch(error){

console.error(error);

showToast("❌ Failed To Add Product");

}

}

// ==========================
// SuitFlick Final Admin.js
// Part 2
// ==========================

import {
collection,
getDocs,
doc,
deleteDoc,
updateDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

// ==========================
// Load Products
// ==========================

async function loadProducts(){

const productList=document.getElementById("productList");

if(!productList) return;

productList.innerHTML="Loading Products...";

const querySnapshot=await getDocs(collection(db,"products"));

productList.innerHTML="";

querySnapshot.forEach((document)=>{

const product=document.data();

productList.innerHTML+=`

<div class="product-card">

<img
src="${product.image1}"
alt="${product.name}">

<h3>${product.name}</h3>

<p>₹${product.price}</p>

<p>${product.category}</p>

<p>Stock : ${product.stock}</p>

<button
onclick="editProduct('${document.id}')">

✏️ Edit

</button>

<button
onclick="deleteProduct('${document.id}')">

🗑 Delete

</button>

</div>

`;

});

}

// ==========================
// Delete Product
// ==========================

async function deleteProduct(id){

const confirmDelete=confirm(
"Delete this product?"
);

if(!confirmDelete) return;

try{

await deleteDoc(doc(db,"products",id));

showToast("🗑 Product Deleted");

loadProducts();

}catch(error){

console.error(error);

showToast("❌ Delete Failed");

}

}

// ==========================
// Edit Product
// ==========================

let currentProductId=null;

async function editProduct(id){

currentProductId=id;

const querySnapshot=await getDocs(collection(db,"products"));

querySnapshot.forEach((document)=>{

if(document.id!==id) return;

const product=document.data();

document.getElementById("productName").value=product.name;

document.getElementById("category").value=product.category;

document.getElementById("price").value=product.price;

document.getElementById("offerPrice").value=product.offerPrice||"";

document.getElementById("badge").value=product.badge||"";

document.getElementById("color").value=product.color||"";

document.getElementById("fabric").value=product.fabric||"";

document.getElementById("sleeve").value=product.sleeve||"";

document.getElementById("neck").value=product.neck||"";

document.getElementById("stock").value=product.stock;

document.getElementById("description").value=product.description;

document.getElementById("image1").value=product.image1||"";

document.getElementById("image2").value=product.image2||"";

document.getElementById("image3").value=product.image3||"";

document.getElementById("image4").value=product.image4||"";

document.getElementById("image5").value=product.image5||"";

document.getElementById("image6").value=product.image6||"";

});

}

// ==========================
// Global
// ==========================

window.editProduct=editProduct;

window.deleteProduct=deleteProduct;

loadProducts();

// ==========================
// SuitFlick Final Admin.js
// Part 3
// ==========================

import {
doc,
updateDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

// ==========================
// Update Product
// ==========================

const updateBtn=document.getElementById("updateProductBtn");

if(updateBtn){

updateBtn.addEventListener("click",updateProduct);

}

async function updateProduct(){

if(!currentProductId){

showToast("Select a product first");

return;

}

const selectedSizes=[];

document.querySelectorAll(".sizes input:checked").forEach(size=>{

selectedSizes.push(size.value);

});

try{

await updateDoc(doc(db,"products",currentProductId),{

name:document.getElementById("productName").value,

category:document.getElementById("category").value,

price:Number(document.getElementById("price").value),

offerPrice:Number(document.getElementById("offerPrice").value),

badge:document.getElementById("badge").value,

color:document.getElementById("color").value,

fabric:document.getElementById("fabric").value,

sleeve:document.getElementById("sleeve").value,

neck:document.getElementById("neck").value,

stock:Number(document.getElementById("stock").value),

description:document.getElementById("description").value,

image1:document.getElementById("image1").value,

image2:document.getElementById("image2").value,

image3:document.getElementById("image3").value,

image4:document.getElementById("image4").value,

image5:document.getElementById("image5").value,

image6:document.getElementById("image6").value,

sizes:selectedSizes

});

showToast("✅ Product Updated Successfully");

resetForm();

loadProducts();

}catch(error){

console.error(error);

showToast("❌ Update Failed");

}

}

// ==========================
// Reset Form
// ==========================

const resetBtn=document.getElementById("resetFormBtn");

if(resetBtn){

resetBtn.addEventListener("click",resetForm);

}

function resetForm(){

document.querySelectorAll("input").forEach(input=>{

if(input.type==="checkbox"){

input.checked=false;

}else{

input.value="";

}

});

document.querySelectorAll("textarea").forEach(area=>{

area.value="";

});

document.querySelectorAll("select").forEach(select=>{

select.selectedIndex=0;

});

currentProductId=null;

}

// ==========================
// Admin Logout
// ==========================

function logoutAdmin(){

localStorage.removeItem("adminLoggedIn");

window.location.href="account.html";

}

// ==========================
// Login Check
// ==========================

if(localStorage.getItem("adminLoggedIn")!=="true"){

window.location.href="account.html";

}

// ==========================
// Global Functions
// ==========================

window.logoutAdmin=logoutAdmin;

// ==========================
// Initialize
// ==========================

loadProducts();

function showToast(message) {
  alert(message);
}