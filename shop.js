import { db } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

async function loadProducts() {

const productsContainer = document.querySelector(".product-grid");

productsContainer.innerHTML = "";

try {

const querySnapshot = await getDocs(collection(db,"products"));

if(querySnapshot.empty){

productsContainer.innerHTML=`
<h2 style="text-align:center;">
No Products Available
</h2>
`;

return;

}

querySnapshot.forEach((doc)=>{

const product=doc.data();

productsContainer.innerHTML += `

<div class="product-card">

<img src="${product.image}" alt="${product.name}">

<h3>${product.name}</h3>

<p>₹${product.price}</p>

<p>${product.description || ""}</p>

<button onclick="addToWishlist('${product.name}',${product.price})">
♡ Wishlist
</button>

<button onclick="addToCart('${product.name}',${product.price})">
Add To Cart
</button>

<button onclick="location.href='product.html?id=${doc.id}'">
View Details
</button>

</div>

`;

});

}catch(error){

console.error(error);

productsContainer.innerHTML=`
<h2 style="text-align:center;color:red;">
Unable to load products.
</h2>
`;

}

}

loadProducts();