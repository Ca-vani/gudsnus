const USERNAME = "admin";

const PASSWORD = "123456";

function login(){

const username =
document.getElementById("username").value.trim();

const password =
document.getElementById("password").value.trim();

if(username===USERNAME && password===PASSWORD){

localStorage.setItem("admin","true");

window.location.href="admin.html";

}

else{

document.getElementById("error").innerHTML =
"Incorrect username or password.";

}

}