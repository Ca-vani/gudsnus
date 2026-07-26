let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name,price){

let item = cart.find(p=>p.name===name);

if(item){

item.quantity++;

}else{

cart.push({

name:name,

price:price,

quantity:1

});

}

localStorage.setItem("cart",JSON.stringify(cart));

updateCartCount();

alert("Added to cart!");

}

function updateCartCount(){

let total=0;

cart.forEach(item=>{

total+=item.quantity;

});

const badge=document.getElementById("cart-count");

if(badge){

badge.innerText=total;

}

}

updateCartCount();