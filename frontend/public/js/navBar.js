const toggleMenu = () => {
    const menu = document.getElementById("mobileMenu");
    const menuIcon = document.getElementById("menu-icon");
    const closeIcon = document.getElementById("close-icon");

    if (menu.style.display === "none" || menu.style.display === "") {
        menu.style.display = "flex";
        menuIcon.style.display = "none";
        closeIcon.style.display = "block";
    } else {
        menu.style.display = "none";
        menuIcon.style.display = "block";
        closeIcon.style.display = "none";
    }
}

export default toggleMenu;