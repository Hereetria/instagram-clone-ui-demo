import checkNull from "../../utils/nullguard.js";
import { hideOverlay, makeOverlayVisible } from "../../utils/overlay.js";
import { grayShinyWithoutHoverColors, handleBlueLinkEvents, handleButtonStyleEvents, makeElementHidden, makeElementVisible } from "../../utils/ui.js";
const handleSearchbarActions = (searchBar, searchBarIcon) => {
    searchBar.addEventListener("focus", () => {
        searchBar.placeholder = "Search";
        if (searchBarIcon)
            makeElementHidden(searchBarIcon);
    });
    searchBar.addEventListener("blur", () => {
        if (searchBarIcon && searchBar.value === "")
            makeElementVisible(searchBarIcon);
        searchBar.placeholder = "     Search";
    });
};
const searchBars = document.querySelectorAll(".searchBar");
const searchBarIcons = document.querySelectorAll(".searchBarIcon");
export const handleSearchbarIconVisibility = () => {
    searchBars.forEach((searchBar, index) => {
        const searchBarIcon = searchBarIcons[index];
        handleSearchbarActions(searchBar, searchBarIcon);
    });
};
const clearSearch = (event) => {
    event.preventDefault();
    searchBars.forEach((searchBar, index) => {
        searchBar.value = "";
        let searchBarIcon = searchBarIcons[index];
        if (searchBarIcon)
            makeElementVisible(searchBarIcon);
    });
};
export const clearSearchOnClick = () => {
    const clearSearchLinks = document.querySelectorAll(".clearSearchLink");
    if (!checkNull(clearSearchLinks, "clearSearchLinks"))
        return;
    clearSearchLinks.forEach((link) => link.addEventListener("click", clearSearch));
};
const handleSearchedProfileContainerClick = (event) => {
    if (!(event.target instanceof HTMLElement) || !event.target.closest("a")) {
        window.location.href = "#";
    }
};
const handleSearchedProfileContainerMouseDown = (container) => {
    container.style.transition = "filter 0.3s ease, opacity 0.3s ease";
    container.style.filter = "brightness(0.8)";
    container.style.opacity = "0.7";
};
const handleSearchedProfileContainerMouseUp = (container) => {
    container.style.filter = "";
    container.style.opacity = "";
};
const handleSearchedProfileContainerMouseLeave = (container) => {
    container.style.filter = "";
    container.style.opacity = "";
};
const handleSearchedProfileContainerMouseOver = (container, event) => {
    if (!(event.target instanceof HTMLElement) || !event.target.closest("a")) {
        container.style.cursor = "pointer";
        container.style.backgroundColor = "rgb(55, 63, 68)";
    }
};
const handleSearchedProfileContainerMouseOut = (container) => {
    container.style.cursor = "default";
    container.style.backgroundColor = "";
};
export const initSearchedProfileEventListeners = () => {
    const searchedProfileContainers = document.querySelectorAll(".searchedProfileContainer");
    if (!checkNull(searchedProfileContainers, "searchedProfileContainers"))
        return;
    searchedProfileContainers.forEach((container) => {
        container.addEventListener("click", handleSearchedProfileContainerClick);
        container.addEventListener("mousedown", () => handleSearchedProfileContainerMouseDown(container));
        container.addEventListener("mouseup", () => handleSearchedProfileContainerMouseUp(container));
        container.addEventListener("mouseleave", () => handleSearchedProfileContainerMouseLeave(container));
        container.addEventListener("mouseover", (event) => handleSearchedProfileContainerMouseOver(container, event));
        container.addEventListener("mouseout", () => handleSearchedProfileContainerMouseOut(container));
    });
};
export const initializeClearAllLinkEvents = () => {
    const clearAllTexts = document.querySelectorAll(".clearAllText");
    const clearSearchHistory = document.getElementById("clearSearchHistory");
    if (!checkNull(clearAllTexts, "clearAllText") || !checkNull(clearSearchHistory, "clearSearchHistory"))
        return;
    clearAllTexts.forEach((element) => {
        element.addEventListener("mouseover", (event) => handleBlueLinkEvents(event, element));
        element.addEventListener("mouseout", (event) => handleBlueLinkEvents(event, element));
        element.addEventListener("mousedown", (event) => handleBlueLinkEvents(event, element));
        element.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            makeOverlayVisible(event, clearSearchHistory);
        });
    });
};
const handleSearchButtonEvents = (event) => {
    let target = null;
    if (event.target instanceof HTMLDivElement) {
        target = event.target;
    }
    if (target) {
        switch (event.type) {
            case "mousedown":
                target.style.backgroundColor = "#555555";
                break;
            case "mouseover":
                target.style.cursor = "pointer";
                target.style.backgroundColor = "rgb(53, 53, 53)";
                break;
            case "mouseleave":
                target.style.cursor = "pointer";
                target.style.backgroundColor = "rgb(53, 53, 53)";
                break;
        }
    }
    ;
};
export const setupClearAllButtonEvents = () => {
    const clearAllButtonDiv = document.getElementById("clearAllButtonDiv");
    const clearAllNotNowButtonDiv = document.getElementById("clearAllNotNowButtonDiv");
    if (!checkNull(clearAllButtonDiv, "clearAllButtonDiv") ||
        !checkNull(clearAllNotNowButtonDiv, "clearAllNotNowButtonDiv"))
        return;
    clearAllButtonDiv.style.cursor = "pointer";
    clearAllNotNowButtonDiv.style.cursor = "pointer";
    clearAllButtonDiv.addEventListener("mouseover", () => handleButtonStyleEvents(clearAllButtonDiv, grayShinyWithoutHoverColors));
    clearAllButtonDiv.addEventListener("mouseout", () => handleButtonStyleEvents(clearAllButtonDiv, grayShinyWithoutHoverColors));
    clearAllButtonDiv.addEventListener("mousedown", () => handleButtonStyleEvents(clearAllButtonDiv, grayShinyWithoutHoverColors));
    clearAllButtonDiv.addEventListener("mouseup", () => handleButtonStyleEvents(clearAllButtonDiv, grayShinyWithoutHoverColors));
    clearAllButtonDiv.addEventListener("click", (event) => {
        event.stopPropagation();
        hideOverlay(event);
    });
    clearAllNotNowButtonDiv.addEventListener("mouseover", () => handleButtonStyleEvents(clearAllNotNowButtonDiv, grayShinyWithoutHoverColors));
    clearAllNotNowButtonDiv.addEventListener("mouseout", () => handleButtonStyleEvents(clearAllNotNowButtonDiv, grayShinyWithoutHoverColors));
    clearAllNotNowButtonDiv.addEventListener("mousedown", () => handleButtonStyleEvents(clearAllNotNowButtonDiv, grayShinyWithoutHoverColors));
    clearAllNotNowButtonDiv.addEventListener("mouseup", () => handleButtonStyleEvents(clearAllNotNowButtonDiv, grayShinyWithoutHoverColors));
    clearAllNotNowButtonDiv.addEventListener("click", (event) => {
        event.stopPropagation();
        hideOverlay(event);
    });
};
