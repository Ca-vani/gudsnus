// ===========================
// PRODUCTS
// ===========================

let products = JSON.parse(localStorage.getItem("products")) || [];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const container = document.getElementById("products-container");

//==========================
// CART COUNT
//==========================

function updateCartCount() {

    let count = 0;

    cart.forEach(item => {
        count += item.quantity;
    });

    const badge = document.getElementById("cart-count");

    if (badge) {
        badge.innerText = count;
    }

}

//==========================
// SAVE CART
//==========================

function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

}

//==========================
// ADD TO CART
//==========================

function addToCart(id) {

    const product = products.find(p => p.id == id);

    if (!product) return;

    const exist = cart.find(item => item.id == id);

    if (exist) {

        exist.quantity++;

    } else {

        cart.push({

            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1

        });

    }

    saveCart();

    alert(product.name + " added to cart.");

}

//==========================
// RENDER PRODUCTS
//==========================

function renderProducts(list = products) {

    container.innerHTML = "";

    if (list.length === 0) {

        container.innerHTML = `
            <div class="empty">
                <h2>No Products</h2>
            </div>
        `;

        return;

    }

    list.forEach(product => {

        container.innerHTML += `

<div class="product-card">

    <img src="${product.image || ""}" class="product-image">

    <div class="product-info">

        <h2>${product.name}</h2>

        <h4>${product.brand}</h4>

        <p>${product.strength}</p>

        <h3>${Number(product.price).toLocaleString()} đ</h3>

    </div>

    ${
        (product.stock === undefined || product.stock > 0)

        ?

        `<button class="add-cart-btn"
        onclick="addToCart(${product.id})">
        Add To Cart
        </button>`

        :

        `<button class="soldout">
        Out Of Stock
        </button>`
    }

</div>

`;

    });

}

//==========================
// FILTER BUTTONS
//==========================

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        document.querySelector(".filter-btn.active")?.classList.remove("active");

        button.classList.add("active");

        const brand = button.dataset.brand;

        if (brand === "ALL") {

            renderProducts(products);

        } else {

            const result = products.filter(product => product.brand === brand);

            renderProducts(result);

        }

    });

});

//==========================
// LOAD BRAND FROM URL
//==========================

const params = new URLSearchParams(window.location.search);

const brand = params.get("brand");

if (brand) {

    const result = products.filter(product => product.brand === brand);

    renderProducts(result);

} else {

    renderProducts(products);

}

//==========================
// START
//==========================

updateCartCount();