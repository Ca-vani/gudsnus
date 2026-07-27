let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cart-items");

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {

    // Luôn đọc dữ liệu mới nhất
    cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;
    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
        <div class="empty">
            <h2>🛒 Your cart is empty</h2>
            <p>Add some products to start shopping.</p>
        </div>
        `;

        document.getElementById("total").innerText = "0 đ";
        document.getElementById("grand-total").innerText = "0 đ";
        return;
    }

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        cartItems.innerHTML += `
        <div class="cart-item">

            <div class="item-left">
                <h3>${item.name}</h3>
                <p>${item.price.toLocaleString()} đ</p>
            </div>

            <div class="item-right">

    <div class="quantity">

        <button class="qty-btn minus" onclick="decrease(${index})">
            <i class="fa-solid fa-minus"></i>
        </button>

        <span class="qty">${item.quantity}</span>

        <button class="qty-btn plus" onclick="increase(${index})">
            <i class="fa-solid fa-plus"></i>
        </button>

    </div>

    <button class="remove-btn" onclick="removeItem(${index})">

        <i class="fa-solid fa-trash"></i>

        Remove

    </button>

</div>

</div>

            </div>
        `;
    });

    document.getElementById("total").innerText =
        total.toLocaleString() + " đ";

    document.getElementById("grand-total").innerText =
        total.toLocaleString() + " đ";

    saveCart();
}

function increase(index) {

    cart[index].quantity++;

    saveCart();

    renderCart();
}

function decrease(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    saveCart();

    renderCart();
}

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    renderCart();
}

function clearCart() {

    if (confirm("Clear your shopping cart?")) {

        cart = [];

        saveCart();

        renderCart();
    }
}

function goCheckout(){

    if(cart.length === 0){

        alert("Your cart is empty!");

        return;

    }

    window.location.href = "checkout.html";

}

renderCart();
