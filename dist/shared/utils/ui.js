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
export const isElementOpen = (element) => {
    if (element.classList.contains("d-none")) {
        return false;
    }
    else {
        return true;
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
export const setClickActionWithSpinner = (postLink) => {
    const originalContent = postLink.innerHTML;
    postLink.innerHTML = spinner;
    setTimeout(() => {
        postLink.innerHTML = originalContent;
    }, 1000);
};
export const handleBlueLinkEvents = (event, targetElement) => {
    switch (event.type) {
        case "mouseover":
            targetElement.style.transition = "color 0.2s ease";
            targetElement.style.color = "white";
            break;
        case "mouseout":
            targetElement.style.transition = "color 0.1s ease";
            targetElement.style.color = "rgb(19, 133, 255)";
            break;
        case "mousedown":
            targetElement.style.transition = "color 0s ease";
            targetElement.style.color = "#555555";
            break;
        case "mouseup":
            targetElement.style.transition = "color 0.2s ease";
            targetElement.style.color = "white";
            break;
    }
};
export const blueElementColors = {
    mousedefault: "rgb(19, 133, 255)",
    mousehover: "white",
    mouseclick: "#555555",
};
export const whiteElementColors = {
    mousedefault: "rgb(255, 255, 255)",
    mousehover: "rgb(180, 180, 180)",
    mouseclick: "rgb(134, 134, 134)",
};
export const grayElementColors = {
    mousedefault: "#555555",
    mousehover: "#444444",
    mouseclick: "#333333",
};
export const grayShinyColors = {
    mousedefault: "rgb(53, 53, 53)",
    mousehover: "",
    mouseclick: "#555555",
};
export const grayShinyWithoutHoverColors = {
    mousedefault: "rgb(53, 53, 53)",
    mousehover: "rgb(53, 53, 53)",
    mouseclick: "#555555",
};
const handleStyleEvents = (element, colors, styleProperty, brightnessValues) => {
    const mouseEvents = ["mouseover", "mouseout", "mousedown", "mouseup"];
    mouseEvents.forEach((eventType) => {
        element.addEventListener(eventType, (event) => {
            let value;
            if (styleProperty === "filter") {
                const brightness = brightnessValues || { mouseover: "brightness(70%)", mouseout: "brightness(100%)", mousedown: "brightness(40%)", mouseup: "brightness(70%)" };
                value = eventType === "mouseover" ? brightness.mouseover :
                    eventType === "mouseout" ? brightness.mouseout :
                        eventType === "mousedown" ? brightness.mousedown :
                            brightness.mouseup;
                element.style.filter = value;
            }
            else {
                value = eventType === "mouseover" ? colors.mousehover :
                    eventType === "mouseout" ? colors.mousedefault :
                        eventType === "mousedown" ? colors.mouseclick :
                            colors.mousehover;
                element.style[styleProperty] = value;
            }
        });
    });
};
export const handleButtonStyleEvents = (element, colors) => {
    handleStyleEvents(element, colors, "backgroundColor");
};
export const handleTextStyleEvents = (element, colors) => {
    handleStyleEvents(element, colors, "color");
};
export const addCursorToElement = (element, cursorName = "pointer") => {
    element.addEventListener("mouseover", () => {
        element.style.cursor = cursorName;
    });
};
export const handleFilterStyleEvents = (element, filterNumbers, willAddCursor = false) => {
    const defaultBrightness = {
        mousedefault: 100,
        mousehover: 70,
        mouseclick: 40
    };
    handleStyleEvents(element, filterNumbers || defaultBrightness, "filter");
};
