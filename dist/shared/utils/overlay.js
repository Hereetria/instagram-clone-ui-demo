import checkNull from "./nullguard.js";
import { makeElementHidden, makeElementVisible } from "./ui.js";
const overlayContainer = document.getElementById("overlayContainer");
const overlay = document.getElementById("overlay");
const getCurrentDivsInOverlay = () => {
    return Array.from(overlayContainer.children).filter((div) => div.tagName === 'DIV' && div.classList.contains('d-flex'));
};
const getMaxZIndexDiv = (currentDivs) => {
    if (currentDivs.length === 0)
        return null;
    return currentDivs.reduce((highestDiv, currentDiv) => {
        const currentZIndex = parseInt(window.getComputedStyle(currentDiv).zIndex, 10) || 0;
        const highestZIndex = parseInt(window.getComputedStyle(highestDiv).zIndex, 10) || 0;
        return currentZIndex > highestZIndex ? currentDiv : highestDiv;
    }, currentDivs[0]);
};
export const hideOverlay = (event) => {
    if (!checkNull(overlayContainer, "overlayContainer"))
        return;
    event.preventDefault();
    const currentDivs = getCurrentDivsInOverlay();
    const activeDiv = getMaxZIndexDiv(currentDivs);
    if (activeDiv) {
        makeElementHidden(activeDiv, "d-flex");
        overlay.style.zIndex = "999";
    }
    else {
        console.log('Current div was not found in overlayContainer.');
    }
    if (currentDivs.length === 1) {
        overlayContainer.style.visibility = "hidden";
    }
};
export const makeOverlayVisible = (event, elementToShow) => {
    if (!checkNull(overlayContainer, "overlayContainer"))
        return;
    if (overlayContainer.style.visibility === "hidden") {
        if (elementToShow) {
            event.stopPropagation();
            makeElementVisible(elementToShow, "d-flex");
            overlayContainer.style.visibility = "visible";
        }
    }
    else {
        if (elementToShow) {
            event.stopPropagation();
            makeElementVisible(elementToShow, "d-flex");
            const currentDivs = getCurrentDivsInOverlay();
            currentDivs.forEach((div) => {
                const divZIndex = parseInt(window.getComputedStyle(div).zIndex, 10) || 0;
                overlay.style.zIndex = (divZIndex + 1).toString();
            });
        }
    }
};
export const toggleOverlayVisibility = () => {
    if (!checkNull(overlayContainer, "overlayContainer"))
        return;
    Array.from(overlayContainer.children).forEach((containerChildDiv) => {
        if (containerChildDiv.tagName === "DIV") {
            containerChildDiv.classList.toggle("d-flex");
            containerChildDiv.classList.toggle("d-none");
        }
    });
};
export const isClickInsideDiv = (event, targetDiv) => {
    if (!checkNull(overlayContainer, "overlayContainer"))
        return false;
    const { top, bottom, left, right } = targetDiv.getBoundingClientRect();
    const { clientX: x, clientY: y } = event;
    return x >= left && x <= right && y >= top && y <= bottom;
};
export const isClickInsideActiveDiv = (event) => {
    if (!checkNull(overlayContainer, "overlayContainer"))
        return false;
    const currentDivs = getCurrentDivsInOverlay();
    const activeDiv = getMaxZIndexDiv(currentDivs);
    if (!activeDiv)
        return false;
    return isClickInsideDiv(event, activeDiv);
};
