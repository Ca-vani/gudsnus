const adminLink = document.getElementById("admin-link");
const logoutBtn = document.getElementById("logout-btn");

if (adminLink && logoutBtn) {

    if (localStorage.getItem("admin") === "true") {

        adminLink.innerHTML =
        '<i class="fa-solid fa-gear"></i>';

        adminLink.href = "admin.html";

        logoutBtn.innerHTML =
        '<i class="fa-solid fa-right-from-bracket"></i>';

        logoutBtn.style.display = "inline-flex";

    } else {

        adminLink.innerHTML =
        '<i class="fa-solid fa-user"></i> Login';

        adminLink.href = "login.html";

        logoutBtn.style.display = "none";

    }

    logoutBtn.onclick = () => {

        if (confirm("Logout Admin?")) {

            localStorage.removeItem("admin");

            window.location.href = "index.html";

        }

    };

}
