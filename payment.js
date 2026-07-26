//==========================
// TELEGRAM
//==========================

const BOT_TOKEN = "8803988901:AAGgCQpppGWdNI8WpuV0HIh91ZJQy2QpQNY";
const CHAT_ID = "8696880113";

//==========================
// CART
//==========================

const cart = JSON.parse(localStorage.getItem("cart")) || [];
const customer = JSON.parse(localStorage.getItem("customer")) || {};

let total = 0;

cart.forEach(item => {
    total += item.price * item.quantity;
});

document.getElementById("payment-total").innerText =
total.toLocaleString() + " đ";

//==========================
// PAYMENT
//==========================

const radios = document.querySelectorAll("input[name=pay]");
const info = document.getElementById("payment-info");

function updatePayment(){

    const method =
    document.querySelector("input[name=pay]:checked").value;

    if(method==="Cash"){

        info.innerHTML=`

        <div class="payment-detail">

            <h3>💵 Cash On Delivery</h3>

            <p>You will pay when receiving your order.</p>

        </div>

        `;

    }

    if(method==="Bank"){

        info.innerHTML=`

        <div class="payment-detail">

            <h3>🏦 Bank Transfer</h3>

            <img src="images/QR.png"
            class="bank-qr"
            alt="QR Code">

            <br><br>

            <p>
            <b>Bank:</b> Techcombank
            </p>

            <p>

            <b>Account Number:</b>

            1023430134

            <button onclick="copyAccount()">

            📋 Copy

            </button>

            </p>

            <p>

            <b>Account Name:</b>

            TRUONG NHAT TIN

            </p>

        </div>

        `;

    }

}

radios.forEach(r=>{

    r.addEventListener("change",updatePayment);

});

updatePayment();

//==========================
// COPY
//==========================

function copyAccount(){

    navigator.clipboard.writeText("1023430134");

    alert("Account Number Copied!");

}

function copyAmount(){

    navigator.clipboard.writeText(total);

    alert("Amount Copied!");

}

//==========================
// ORDER ID
//==========================

function generateOrderID(){

    let last =
    Number(localStorage.getItem("lastOrder")||1000);

    last++;

    localStorage.setItem("lastOrder",last);

    return last;

}

//==========================
// SEND TELEGRAM
//==========================

async function sendTelegram(){

    const paymentMethod =
    document.querySelector("input[name=pay]:checked").value;

    const payment =
    paymentMethod==="Cash"
    ?"💵 Cash On Delivery"
    :"🏦 Bank Transfer";

    const orderID=generateOrderID();

    let products="";

    cart.forEach(item=>{

        products +=
`• ${item.name} x${item.quantity}
`;

    });

    const message=

`🛒 GUD SNUS NEW ORDER

━━━━━━━━━━━━━━

🆔 Order ID
#GUD-${orderID}

━━━━━━━━━━━━━━

👤 Customer
${customer.name}

📞 ${customer.phone}

📧 ${customer.email}

📍 ${customer.address}

━━━━━━━━━━━━━━

💳 Payment
${payment}

━━━━━━━━━━━━━━

📦 Products

${products}

━━━━━━━━━━━━━━

💰 Total
${total.toLocaleString()} đ

━━━━━━━━━━━━━━

🕒 ${new Date().toLocaleString()}
`;

    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            chat_id:CHAT_ID,

            text:message

        })

    });

    return orderID;

}

//==========================
// CONFIRM ORDER
//==========================

async function confirmOrder(){

    const btn =
    document.querySelector(".place-order");

    btn.disabled=true;

    btn.innerHTML="⏳ Sending Order...";

    try{

        const orderID =
        await sendTelegram();

        localStorage.removeItem("cart");
        localStorage.removeItem("customer");

        window.location.href=
        `success.html?order=${orderID}`;

    }

    catch(error){

        console.log(error);

        alert("Unable to send order!");

        btn.disabled=false;

        btn.innerHTML="✅ Confirm Order";

    }

}