import { db } from "./firebase.js";

import {
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const id = new URLSearchParams(window.location.search).get("id");

async function loadProduct() {

if (!id) {
document.getElementById("productName").innerHTML = "Product Not Found";
return;
}

try {

const docRef = doc(db, "products", id);

const docSnap = await getDoc(docRef);

if (docSnap.exists()) {

const product = docSnap.data();

document.getElementById("productName").innerHTML = product.name;

document.getElementById("productPrice").innerHTML = "₹" + product.price;

document.getElementById("productImage").src = product.image;

document.getElementById("productDescription").innerHTML =
product.description || "Premium Women's Suit";

document.getElementById("cartBtn").onclick = function () {

let qty = Number(document.getElementById("qty").value);

for (let i = 0; i < qty; i++) {
addToCart(product.name, product.price);
}

alert("🛒 Product Added Successfully");

};

} else {

document.getElementById("productName").innerHTML = "Product Not Found";

}

} catch (error) {

console.log(error);

}

}

loadProduct();