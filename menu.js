const menu = document.getElementById("menu-toggle");
const nav = document.getElementById("nav-menu");

if (menu && nav) {
    menu.addEventListener("click", () => {
        nav.classList.toggle("active");
    });

    document.querySelectorAll("#nav-menu a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
        });
    });
}