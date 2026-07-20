import { db } from "./firebase.js";

import {
collection,
addDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

async function addProduct(){

let name=document.getElementById("name").value;

let price=parseInt(document.getElementById("price").value);

let image=document.getElementById("image").value;

let description=document.getElementById("description").value;

try{

await addDoc(collection(db,"products"),{

name:name,

price:price,

image:image,

description:description,

createdAt:new Date()

});

alert("✅ Product Added Successfully");

}catch(error){

alert(error.message);

}

}

window.addProduct=addProduct;