const adminLink = document.getElementById("admin-link");

const logoutBtn = document.getElementById("logout-btn");

if(localStorage.getItem("admin")==="true"){

    adminLink.innerHTML="⚙ Admin";

    adminLink.href="admin.html";

    logoutBtn.style.display="inline-block";

}

else{

    adminLink.innerHTML="👤 Login";

    adminLink.href="login.html";

    logoutBtn.style.display="none";

}

logoutBtn.onclick=function(){

    if(confirm("Logout Admin?")){

        localStorage.removeItem("admin");

        window.location.href="index.html";

    }

}