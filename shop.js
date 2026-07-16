import { db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

async function loadProducts(){

const productsContainer = document.querySelector(".product-grid");

productsContainer.innerHTML = "";

const querySnapshot = await getDocs(collection(db,"products"));

querySnapshot.forEach((doc)=>{

const product = doc.data();

productsContainer.innerHTML += `

<div class="product-card">

<img src="${product.image}" alt="${product.name}">

<h3>${product.name}</h3>

<p>₹${product.price}</p>

<button onclick="addToWishlist('${product.name}',${product.price})">
♡ Wishlist
</button>

<button onclick="addToCart('${product.name}',${product.price})">
Add To Cart
</button>

</div>

`;

});

}

loadProducts();