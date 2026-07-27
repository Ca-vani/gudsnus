//==========================
// TELEGRAM
//==========================

const BOT_TOKEN = "8803988901:AAGgCQpppGWdNI8WpuV0HIh91ZJQy2QpQNY";
const CHAT_ID = "8696880113";

//==========================
// CART
//==========================

const cart = JSON.parse(localStorage.getItem("cart")) || [];

const checkoutItems = document.getElementById("checkout-items");

let total = 0;

//==========================
// HIỂN THỊ ĐƠN HÀNG
//==========================

cart.forEach(item=>{

    total += item.price * item.quantity;

    checkoutItems.innerHTML += `

    <div class="checkout-item">

        <div>

            <h4>${item.name}</h4>

            <p>${item.quantity} × ${item.price.toLocaleString()} đ</p>

        </div>

        <div class="checkout-price">

            ${(item.price * item.quantity).toLocaleString()} đ

        </div>

    </div>

    `;

});

document.getElementById("checkout-total").innerText =
total.toLocaleString() + " đ";

//==========================
// SEND TELEGRAM
//==========================

async function sendTelegram(customer){

    let products = "";

    cart.forEach(item=>{

        products += `• ${item.name} x${item.quantity}\n`;

    });

    const message = `🛒 NEW ORDER - GUD SNUS

👤 Name:
${customer.name}

📞 Phone:
${customer.phone}

📧 Email:
${customer.email}

📍 Address:
${customer.address}

━━━━━━━━━━━━━━

📦 Products

${products}

━━━━━━━━━━━━━━

💰 Total:
${total.toLocaleString()} đ

🕒 ${new Date().toLocaleString()}
`;

    try{

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

    }catch(error){

        console.log(error);

    }

}

//==========================
// PLACE ORDER
//==========================

function placeOrder(){

    const name =
    document.getElementById("name").value.trim();

    const phone =
    document.getElementById("phone").value.trim();

    const email =
    document.getElementById("email").value.trim();

    const address =
    document.getElementById("address").value.trim();

    document.getElementById("name").style.border="";
    document.getElementById("phone").style.border="";
    document.getElementById("email").style.border="";
    document.getElementById("address").style.border="";

    if(name===""){

        alert("Please enter your full name.");

        document.getElementById("name").focus();

        document.getElementById("name").style.border="2px solid #ff3b3b";

        return;

    }

    if(name.split(" ").length<2){

        alert("Please enter your full name.");

        document.getElementById("name").focus();

        document.getElementById("name").style.border="2px solid #ff3b3b";

        return;

    }

    if(/\d/.test(name)){

        alert("Name cannot contain numbers.");

        document.getElementById("name").focus();

        document.getElementById("name").style.border="2px solid #ff3b3b";

        return;

    }

    const phoneRegex=/^[0-9]{9,12}$/;

    if(!phoneRegex.test(phone)){

        alert("Please enter a valid phone number.");

        document.getElementById("phone").focus();

        document.getElementById("phone").style.border="2px solid #ff3b3b";

        return;

    }

    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email)){

        alert("Please enter a valid email.");

        document.getElementById("email").focus();

        document.getElementById("email").style.border="2px solid #ff3b3b";

        return;

    }

    if(address.length<10){

        alert("Please enter your full delivery address.");

        document.getElementById("address").focus();

        document.getElementById("address").style.border="2px solid #ff3b3b";

        return;

    }

    const customer={

        name,
        phone,
        email,
        address,
        total

    };

    localStorage.setItem("customer", JSON.stringify(customer));

    // KHÔNG GỬI TELEGRAM Ở ĐÂY

    window.location.href="payment.html";

}
