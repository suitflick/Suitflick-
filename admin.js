// ==========================
// SuitFlick Admin.js
// Part 1 - Firebase + Add Product
// ==========================

import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

let currentProductId = null;

const addBtn = document.getElementById("addProductBtn");

if (addBtn) {
  addBtn.addEventListener("click", addProduct);
}

async function addProduct() {

  const sizes = [];

  document.querySelectorAll(".sizes input:checked").forEach(item => {
    sizes.push(item.value);
  });

  const product = {
    name: document.getElementById("productName").value.trim(),
    category: document.getElementById("category").value,
    price: Number(document.getElementById("price").value),
    offerPrice: Number(document.getElementById("offerPrice").value),
    badge: document.getElementById("badge").value,
    color: document.getElementById("color").value,
    fabric: document.getElementById("fabric").value,
    sleeve: document.getElementById("sleeve").value,
    neck: document.getElementById("neck").value,
    stock: Number(document.getElementById("stock").value),
    description: document.getElementById("description").value,
    image1: document.getElementById("image1").value,
    image2: document.getElementById("image2").value,
    image3: document.getElementById("image3").value,
    image4: document.getElementById("image4").value,
    image5: document.getElementById("image5").value,
    image6: document.getElementById("image6").value,
    sizes: sizes,
    createdAt: serverTimestamp()
  };

  try {

    await addDoc(collection(db, "products"), product);

    alert("✅ Product Added Successfully");

    resetForm();

    loadProducts();

  } catch (error) {

    console.error(error);

    alert(error.message);

  }

}

// ==========================
// Part 2 - Load / Delete / Edit
// ==========================

async function loadProducts() {

  const productList = document.getElementById("productList");
  if (!productList) return;

  productList.innerHTML = "Loading...";

  const snapshot = await getDocs(collection(db, "products"));

  productList.innerHTML = "";

  snapshot.forEach((docSnap) => {

    const p = docSnap.data();

    productList.innerHTML += `
    <div class="product-card">
      <img src="${p.image1}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹${p.offerPrice || p.price}</p>

      <button onclick="editProduct('${docSnap.id}')">
      ✏️ Edit
      </button>

      <button onclick="deleteProduct('${docSnap.id}')">
      🗑 Delete
      </button>
    </div>`;
  });

}

async function deleteProduct(id) {

  if (!confirm("Delete Product?")) return;

  await deleteDoc(doc(db, "products", id));

  alert("🗑 Product Deleted");

  loadProducts();

}

async function editProduct(id) {

  currentProductId = id;

  const snapshot = await getDocs(collection(db, "products"));

  snapshot.forEach((docSnap) => {

    if (docSnap.id !== id) return;

    const p = docSnap.data();

    productName.value = p.name;
    category.value = p.category;
    price.value = p.price;
    offerPrice.value = p.offerPrice;
    badge.value = p.badge;
    color.value = p.color;
    fabric.value = p.fabric;
    sleeve.value = p.sleeve;
    neck.value = p.neck;
    stock.value = p.stock;
    description.value = p.description;
    image1.value = p.image1;
    image2.value = p.image2;
    image3.value = p.image3;
    image4.value = p.image4;
    image5.value = p.image5;
    image6.value = p.image6;

  });

}

window.editProduct = editProduct;
window.deleteProduct = deleteProduct;

// ==========================
// Part 3 - Update / Reset
// ==========================

const updateBtn = document.getElementById("updateProductBtn");

if (updateBtn) {
  updateBtn.addEventListener("click", updateProduct);
}

async function updateProduct() {

  if (!currentProductId) {
    alert("Select a Product First");
    return;
  }

  const sizes = [];

  document.querySelectorAll(".sizes input:checked").forEach(s => {
    sizes.push(s.value);
  });

  await updateDoc(doc(db, "products", currentProductId), {

    name: productName.value,
    category: category.value,
    price: Number(price.value),
    offerPrice: Number(offerPrice.value),
    badge: badge.value,
    color: color.value,
    fabric: fabric.value,
    sleeve: sleeve.value,
    neck: neck.value,
    stock: Number(stock.value),
    description: description.value,
    image1: image1.value,
    image2: image2.value,
    image3: image3.value,
    image4: image4.value,
    image5: image5.value,
    image6: image6.value,
    sizes: sizes

  });

  alert("✅ Product Updated");

  resetForm();

  loadProducts();

}

function resetForm() {

  document.querySelector(".admin").reset?.();

  currentProductId = null;

}

window.logoutAdmin = function () {

  localStorage.removeItem("adminLoggedIn");

  location.href = "account.html";

};

loadProducts();
