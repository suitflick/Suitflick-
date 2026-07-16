import { db } from "./firebase.js";

import {
collection,
addDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const addProductBtn = document.getElementById("addProductBtn");

addProductBtn.addEventListener("click", async () => {

const name = document.getElementById("productName").value.trim();

const price = Number(document.getElementById("productPrice").value);

const image = document.getElementById("productImage").value.trim();

const description = document.getElementById("productDescription").value.trim();

if (!name || !price || !image) {
    alert("Please fill all required fields");
    return;
}

try {

    await addDoc(collection(db, "products"), {
        name: name,
        price: price,
        image: image,
        description: description
    });

    document.getElementById("message").innerHTML = "✅ Product Added Successfully";

    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productImage").value = "";
    document.getElementById("productDescription").value = "";

} catch (error) {

    alert("Error: " + error.message);

}

});