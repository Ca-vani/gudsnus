const BOT_TOKEN = "8803988901:AAGgCQpppGWdNI8WpuV0HIh91ZJQy2QpQNY";
const CHAT_ID = "8696880113";

async function sendTelegram(order){

    let products = "";

    order.items.forEach(item=>{
        products += `• ${item.name} x${item.quantity}\n`;
    });

    const text = `
🛒 <b>NEW ORDER - GUD SNUS</b>

👤 <b>Name:</b> ${order.name}

📞 <b>Phone:</b> ${order.phone}

📧 <b>Email:</b> ${order.email}

📍 <b>Address:</b>
${order.address}

━━━━━━━━━━━━━━

📦 <b>Products</b>

${products}

━━━━━━━━━━━━━━

💰 <b>Total:</b> ${order.total}

🕒 ${new Date().toLocaleString()}
`;

    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            chat_id:CHAT_ID,

            text:text,

            parse_mode:"HTML"

        })

    });

}
