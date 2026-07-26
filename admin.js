if(localStorage.getItem("admin") !== "true"){
    window.location.href = "login.html";
}

//=========================
// GUD SNUS ADMIN PANEL
//=========================

let products = JSON.parse(localStorage.getItem("products")) || [];

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

    products.forEach(product=>{

        value += Number(product.price);

    });

    document.getElementById("total-stock").innerText = products.length;

    document.getElementById("total-value").innerText =
        value.toLocaleString() + " đ";

}

//=========================
// RENDER PRODUCTS
//=========================

function renderProducts(list = products){

    const container = document.getElementById("admin-products");

    container.innerHTML = "";

    if(list.length === 0){

        container.innerHTML = `
            <div class="empty">
                <h2>No Products</h2>
            </div>
        `;

        updateDashboard();

        return;

    }

    list.forEach((product,index)=>{

        container.innerHTML += `

<div class="admin-card">

    <div class="admin-left">

        <h3>${product.name}</h3>

        <p><b>Brand:</b> ${product.brand}</p>

        <p><b>Strength:</b> ${product.strength}</p>

        <p><b>Price:</b> ${Number(product.price).toLocaleString()} đ</p>

    </div>

    <div class="admin-right">

        <button class="edit-btn"
        onclick="editProduct(${index})">

        Edit

        </button>

        <button class="delete-btn"
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

function addProduct(){

    const name = document.getElementById("name").value.trim();

    const brand = document.getElementById("brand").value.trim();

    const price = Number(document.getElementById("price").value);

    const strength = document.getElementById("strength").value.trim();

    if(
        name === "" ||
        brand === "" ||
        strength === "" ||
        isNaN(price) ||
        price <= 0
    ){

        alert("Please complete all information.");

        return;

    }

    products.push({

        id: Date.now(),

        name,

        brand,

        price,

        strength

    });

    saveProducts();

    renderProducts();

    document.getElementById("name").value = "";
    document.getElementById("brand").value = "";
    document.getElementById("price").value = "";
    document.getElementById("strength").value = "";

}

//=========================
// DELETE
//=========================

function deleteProduct(index){

    if(confirm("Delete this product?")){

        products.splice(index,1);

        saveProducts();

        renderProducts();

    }

}

//=========================
// EDIT
//=========================

function editProduct(index){

    const product = products[index];

    const newName = prompt("Product Name", product.name);

    if(newName === null) return;

    const newBrand = prompt("Brand", product.brand);

    if(newBrand === null) return;

    const newStrength = prompt("Strength", product.strength);

    if(newStrength === null) return;

    const newPrice = prompt("Price", product.price);

    if(newPrice === null) return;

    if(
        newName.trim()==="" ||
        newBrand.trim()==="" ||
        newStrength.trim()==="" ||
        isNaN(newPrice)
    ){

        alert("Invalid information.");

        return;

    }

    product.name = newName.trim();

    product.brand = newBrand.trim();

    product.strength = newStrength.trim();

    product.price = Number(newPrice);

    saveProducts();

    renderProducts();

    alert("Product Updated Successfully!");

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

renderProducts();