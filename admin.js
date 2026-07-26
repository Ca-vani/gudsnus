import { db } from "./firebase.js";

import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

if(localStorage.getItem("admin") !== "true"){
    window.location.href = "login.html";
}

//=========================
// GUD SNUS ADMIN PANEL
//=========================

let products = [];
let editingIndex = -1;

async function loadProducts() {
    const snapshot = await getDocs(collection(db, "products"));

    products = snapshot.docs.map(doc => ({
        firebaseId: doc.id,
        ...doc.data()
    }));

    renderProducts();
}

//=========================
// CLOUDINARY
//=========================

const CLOUD_NAME = "vignpvhh";
const UPLOAD_PRESET = "iwtle5km";

async function uploadImage(file){

    if(!file) return null;

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
            method:"POST",
            body:formData
        }
    );

    if(!response.ok){
        throw new Error("Upload failed");
    }

    const data = await response.json();

    return data.secure_url;

}

//=========================
// SAVE
//=========================

function saveProducts(){
    localStorage.setItem("products", JSON.stringify(products));
}

//=========================
// DASHBOARD
//=========================

function updateDashboard(){

    document.getElementById("total-products").innerText = products.length;

    const brands = [...new Set(products.map(p => p.brand))];

    document.getElementById("total-brands").innerText = brands.length;

    let value = 0;
    let stock = 0;

    products.forEach(product=>{

        value += Number(product.price);
        stock += Number(product.stock || 0);

    });

    document.getElementById("total-stock").innerText = stock;

    document.getElementById("total-value").innerText =
        value.toLocaleString() + " đ";

}

//=========================
// RENDER PRODUCTS
//=========================

function renderProducts(list = products){

    const container = document.getElementById("admin-products");

    container.innerHTML = "";

    if(list.length===0){

        container.innerHTML=`
        <div class="empty">
            <h2>No Products</h2>
        </div>`;

        updateDashboard();

        return;

    }

    list.forEach((product,index)=>{

        container.innerHTML+=`

<div class="admin-card">

<div class="admin-left">

<img
src="${product.image || ''}"
style="
width:120px;
height:120px;
object-fit:contain;
background:#fff;
padding:8px;
border-radius:12px;
margin-bottom:15px;
">

<h3>${product.name}</h3>

<p><b>Brand:</b> ${product.brand}</p>

<p><b>Strength:</b> ${product.strength}</p>

<p><b>Stock:</b> ${product.stock ?? 0}</p>

<p><b>Price:</b> ${Number(product.price).toLocaleString()} đ</p>

<p>${product.description || ""}</p>

</div>

<div class="admin-right">

<button
class="edit-btn"
onclick="editProduct(${index})">

Edit

</button>

<button
class="delete-btn"
onclick="deleteProduct(${index})">

Delete

</button>

</div>

</div>

`;

    });

    updateDashboard();

}

//=========================
// ADD PRODUCT
//=========================

async function addProduct(){

    const btn=document.getElementById("add-btn");

    btn.disabled=true;
    btn.innerText="Uploading...";

    const name=document.getElementById("name").value.trim();

    const brand=document.getElementById("brand").value.trim();

    const strength=document.getElementById("strength").value.trim();

    const price=Number(document.getElementById("price").value);

    const stock=Number(document.getElementById("stock").value);

    const description=document.getElementById("description").value.trim();

    const file=document.getElementById("image").files[0];

    if(
        name===""||
        brand===""||
        strength===""||
        isNaN(price)||
        price<=0
    ){

        alert("Please complete all information.");

        btn.disabled=false;
        btn.innerText="➕ Add Product";

        return;

    }

    let image = "";

        try{

            if(file){
                image = await uploadImage(file);
            }

        }catch(err){

            alert("Image upload failed.");
            btn.disabled=false;
            btn.innerText="➕ Add Product";
            return;

}

    await addDoc(collection(db, "products"), {

    name,
    brand,
    strength,
    price,
    stock,
    description,
    image

});

await loadProducts();

    document.getElementById("name").value="";
    document.getElementById("brand").value="";
    document.getElementById("strength").value="";
    document.getElementById("price").value="";
    document.getElementById("stock").value="";
    document.getElementById("description").value="";
    document.getElementById("image").value="";

    const preview=document.getElementById("preview");

    preview.src="";
    preview.style.display="none";

    btn.disabled=false;
    btn.innerText="➕ Add Product";

    alert("Product Added Successfully!");

}

//=========================
// DELETE
//=========================

async function deleteProduct(index){

    if(!confirm("Delete this product?")) return;

    await deleteDoc(doc(db, "products", products[index].firebaseId));

    await loadProducts();

}

//=========================
// EDIT
//=========================

function editProduct(index){

    editingIndex = index;

    const product = products[index];

    document.getElementById("edit-name").value = product.name;
    document.getElementById("edit-brand").value = product.brand;
    document.getElementById("edit-strength").value = product.strength;
    document.getElementById("edit-price").value = product.price;
    document.getElementById("edit-stock").value = product.stock;
    document.getElementById("edit-description").value = product.description || "";

    const preview = document.getElementById("edit-preview");

    if(product.image){

        preview.src = product.image;
        preview.style.display = "block";

    }else{

        preview.style.display = "none";

    }

    document.getElementById("editModal").style.display = "flex";

}

function closeEdit(){

    document.getElementById("editModal").style.display="none";

    editingIndex = -1;

}

document.getElementById("edit-image").addEventListener("change",function(){

    const file=this.files[0];

    if(!file) return;

    const preview=document.getElementById("edit-preview");

    preview.src=URL.createObjectURL(file);

    preview.style.display="block";

});

document.getElementById("edit-image").value="";

document.getElementById("edit-preview").style.display="none";

async function saveEdit(){

    if(editingIndex===-1) return;

    const product = products[editingIndex];

    product.name =
    document.getElementById("edit-name").value.trim();

    product.brand =
    document.getElementById("edit-brand").value;

    product.strength =
    document.getElementById("edit-strength").value.trim();

    product.price =
    Number(document.getElementById("edit-price").value);

    product.stock =
    Number(document.getElementById("edit-stock").value);

    product.description =
    document.getElementById("edit-description").value.trim();

    const file =
    document.getElementById("edit-image").files[0];

    if(file){

        try{

            product.image = await uploadImage(file);

        }catch{

            alert("Upload image failed.");

            return;

        }

    }

    await updateDoc(doc(db, "products", product.firebaseId),{

    name: product.name,
    brand: product.brand,
    strength: product.strength,
    price: product.price,
    stock: product.stock,
    description: product.description,
    image: product.image

});

await loadProducts();

closeEdit();

alert("Product Updated!");

}

//=========================
// SEARCH
//=========================

function searchProducts(){

    const keyword =
    document.getElementById("search").value.toLowerCase();

    const result = products.filter(product =>

        product.name.toLowerCase().includes(keyword) ||

        product.brand.toLowerCase().includes(keyword)

    );

    renderProducts(result);

}

//=========================
// LOGOUT
//=========================

function logout(){

    if(confirm("Logout Admin?")){

        localStorage.removeItem("admin");

        window.location.href = "login.html";

    }

}

//=========================
// START
//=========================

loadProducts();

window.onclick = function(e){

    const modal = document.getElementById("editModal");

    if(e.target === modal){

        closeEdit();

    }

}

window.addProduct = addProduct;
window.searchProducts = searchProducts;
window.editProduct = editProduct;
window.deleteProduct = deleteProduct;
window.saveEdit = saveEdit;
window.closeEdit = closeEdit;
