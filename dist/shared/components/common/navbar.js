import checkNull from "../../utils/nullguard.js";
const adjustNavbarWidth = () => {
    const navbar = document.querySelector("#navbar");
    const pageWidth = window.innerWidth;
    const hasScrollbar = pageWidth > document.documentElement.clientWidth;
    if (!checkNull(navbar, "navbar"))
        return;
    if (pageWidth > 630) {
        navbar.style.width = `${630 + (pageWidth - 630) / 2}px`;
    }
    else {
        navbar.style.width = hasScrollbar ? "calc(100vw - 17px)" : "100vw";
    }
};
export { adjustNavbarWidth };
