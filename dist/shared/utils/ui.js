import checkNull from "./nullguard.js";
export const spinner = '<i class="fa fa-spinner fa-spin"></i>';
export const makeElementHidden = (element, visibleClass = "d-flex") => {
    element.classList.remove(visibleClass);
    element.classList.add("d-none");
};
export const makeElementVisible = (element, visibleClass = "d-flex") => {
    element.classList.remove("d-none");
    element.classList.add(visibleClass);
};
export const changeVisibleElement = (elementToHide, elementToShow, visibleClass = "d-flex") => {
    makeElementHidden(elementToHide, visibleClass);
    makeElementVisible(elementToShow, visibleClass);
};
export const toggleElementVisibility = (element, visibleClass) => {
    if (element.classList.contains("d-none")) {
        makeElementVisible(element, visibleClass);
    }
    else {
        makeElementHidden(element, visibleClass);
    }
};
export const toggleElementClass = (element, className) => {
    if (element.classList.contains(className)) {
        element.classList.remove(className);
    }
    else {
        element.classList.add(className);
    }
};
export const initializePreventDefault = () => {
    const preventDefaultElements = document.querySelectorAll(".preventDefault");
    if (!checkNull(preventDefaultElements, "preventDefaultElements"))
        return;
    preventDefaultElements.forEach((element) => {
        element.addEventListener("click", (event) => {
            event.preventDefault();
        });
    });
};
export const getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.clientWidth;
};
export const setBackgroundColor = (element, color) => {
    element.style.backgroundColor = color;
};
