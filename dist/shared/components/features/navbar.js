import checkNull from "../../utils/nullguard.js";
export const adjustNavbarWidth = () => {
    const navbar = document.querySelector("#navbar");
    const navbarPlaceholder = document.querySelector("#navbar-placeholder");
    const pageWidth = window.innerWidth;
    if (!checkNull(navbar, "navbar") || !checkNull(navbarPlaceholder, "navbarPlaceHolder"))
        return;
    if (pageWidth <= 800) {
        navbar.style.width = `${pageWidth}px`;
        navbarPlaceholder.classList.replace("d-none", "d-block");
    }
    else {
        navbarPlaceholder.classList.replace("d-block", "d-none");
    }
};
export const initializaOpenNavbarSearch = () => {
    const navbarSearchExpandableDiv = document.getElementById("navbarSearchExpandableDiv");
    const miniSearchbar = document.querySelector(".miniSearchbar");
    if (!checkNull(navbarSearchExpandableDiv, "navbarSearchExpandableDiv") || !checkNull(miniSearchbar, "miniSearchbar"))
        return;
    miniSearchbar.addEventListener("click", (event) => {
        navbarSearchExpandableDiv.classList.remove("d-none");
        navbarSearchExpandableDiv.classList.add("d-block");
    });
    document.addEventListener("click", (event) => {
        const target = event.target;
        if (!navbarSearchExpandableDiv.contains(target) &&
            target !== miniSearchbar) {
            navbarSearchExpandableDiv.classList.remove("d-block");
            navbarSearchExpandableDiv.classList.add("d-none");
        }
    });
};
