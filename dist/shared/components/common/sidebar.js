import checkNull from "../../utils/nullguard.js";
import { hideOverlay, isClickInsideActiveDiv } from "../../utils/overlay.js";
import { makeElementHidden, makeElementVisible, changeVisibleElement, isElementOpen, setBackgroundColor } from "../../utils/ui.js";
const sidebar = document.getElementById("sidebar");
const search = document.getElementById("search");
const sidebarOpenable = document.getElementById("sidebarOpenable");
const sidebarContent = document.getElementById("sidebarContent");
const sidebarContentInner = document.getElementById("sidebarContentInner");
const sidebarHideableItems = document.querySelectorAll(".sidebarHideableItem");
const sidebarIcon = document.querySelector("#sidebarIcon");
const sidebarSmallOpenState = () => {
    if (!checkNull(sidebarContent, "sidebarContent") ||
        !checkNull(sidebarContentInner, "sidebarContentInner") ||
        !checkNull(search, "search") ||
        !checkNull(sidebarOpenable, "sidebarOpenable") ||
        !checkNull(sidebarIcon, "sidebarIcon"))
        return;
    sidebarContent.style.width = "68px";
    sidebarContentInner.style.width = "60px";
    makeElementHidden(search, "d-block");
    makeElementHidden(sidebarOpenable, "d-block");
    sidebarHideableItems.forEach((item) => {
        makeElementHidden(item, "d-inline");
    });
    makeElementVisible(sidebarIcon, "d-flex");
};
const sidebarSmallClosedState = () => {
    if (!checkNull(sidebarContent, "sidebarContent") ||
        !checkNull(sidebarContentInner, "sidebarContentInner") ||
        !checkNull(sidebar, "sidebar") ||
        !checkNull(sidebarOpenable, "sidebarOpenable") ||
        !checkNull(sidebarIcon, "sidebarIcon"))
        return;
    sidebar.classList.remove("sidebarBorder", "border-end", "border-secondary");
    sidebarContent.style.width = "68px";
    sidebarContentInner.style.width = "60px";
    makeElementHidden(sidebarOpenable, "d-block");
    sidebarHideableItems.forEach((item) => {
        makeElementHidden(item, "d-inline");
    });
    makeElementVisible(sidebarIcon, "d-flex");
};
const sidebarBigClosedState = () => {
    if (!checkNull(sidebar, "sidebar") ||
        !checkNull(sidebarContent, "sidebarContent") ||
        !checkNull(sidebarContentInner, "sidebarContentInner") ||
        !checkNull(sidebarOpenable, "sidebarOpenable"))
        return;
    sidebar.classList.remove("sidebarBorder", "border-end", "border-secondary");
    sidebarContent.style.width = "235px";
    sidebarContentInner.style.width = "225px";
    makeElementHidden(sidebarOpenable, "d-block");
    sidebarHideableItems.forEach((item) => {
        makeElementVisible(item, "inline");
    });
    makeElementHidden(sidebarIcon);
};
const handleSidebarClosedState = () => {
    if (window.innerWidth > 1340) {
        sidebarBigClosedState();
    }
    else {
        sidebarSmallClosedState();
    }
};
export const initializeAdjustSidebarState = () => {
    if (!checkNull(sidebarOpenable, "sidaberOpenable"))
        return;
    if (!isElementOpen(sidebarOpenable)) {
        handleSidebarClosedState();
    }
};
let previousIconLink = document.querySelector('[data-action="homeAction"]');
let previousWithoutToggleIcons = previousIconLink;
const handleSidebarIconClick = (iconLink) => {
    const notifications = document.getElementById("notifications");
    const sidebarOpenable = document.getElementById("sidebarOpenable");
    const activeIcon = iconLink.querySelector(".sidebarIconActive");
    const passiveIcon = iconLink.querySelector(".sidebarIconPassive");
    const previousActiveIcon = previousIconLink.querySelector(".sidebarIconActive");
    const previousPassiveIcon = previousIconLink.querySelector(".sidebarIconPassive");
    if (!checkNull(sidebar, "sidebar") ||
        !checkNull(search, "search") ||
        !checkNull(notifications, "notifications") ||
        !checkNull(sidebarOpenable, "sidebarOpenable") ||
        !checkNull(activeIcon, "activeIcon") ||
        !checkNull(passiveIcon, "passiveIcon") ||
        !checkNull(previousActiveIcon, "previousActiveIcon") ||
        !checkNull(previousPassiveIcon, "previousPassiveIcon"))
        return;
    const iconAction = iconLink.getAttribute("data-action");
    if (previousIconLink !== iconLink) {
        changeVisibleElement(passiveIcon, activeIcon, "d-block");
        changeVisibleElement(previousActiveIcon, previousPassiveIcon, "d-block");
        previousIconLink = iconLink;
        if (iconAction !== "searchAction" && iconAction !== "notificationsAction") {
            previousWithoutToggleIcons = iconLink;
            handleSidebarClosedState();
        }
        else {
            sidebarSmallOpenState();
        }
        switch (iconAction) {
            case "homeAction":
                break;
            case "searchAction":
                sidebar.classList.remove("border-end", "border-secondary");
                sidebar.classList.add("sidebarBorder");
                makeElementVisible(search, "d-block");
                makeElementVisible(sidebarOpenable, "d-block");
                break;
            case "exploreAction":
                break;
            case "reelsAction":
                break;
            case "messagesAction":
                break;
            case "notificationsAction":
                sidebar.classList.remove("sidebarBorder");
                sidebar.classList.add("border-end", "border-secondary");
                makeElementVisible(notifications, "d-block");
                makeElementVisible(sidebarOpenable, "d-block");
                break;
            case "createAction":
                break;
            default:
                console.log("Unknown Action clicked");
        }
    }
    else {
        if (iconAction === "searchAction" || iconAction === "notificationsAction") {
            handleSidebarClosedState();
            const previousActiveToggleIcon = previousWithoutToggleIcons.querySelector(".sidebarIconActive");
            const previousPassiveToggleIcon = previousWithoutToggleIcons.querySelector(".sidebarIconPassive");
            if (!checkNull(previousActiveToggleIcon, "previousActiveToggleIcon") ||
                !checkNull(previousPassiveToggleIcon, "previousPassiveToggleIcon"))
                return;
            if (passiveIcon && activeIcon)
                changeVisibleElement(activeIcon, passiveIcon, "d-block");
            if (previousActiveToggleIcon && previousPassiveToggleIcon)
                changeVisibleElement(previousPassiveToggleIcon, previousActiveToggleIcon, "d-block");
            previousIconLink = previousWithoutToggleIcons;
        }
    }
};
const handleSidebarSizeWhileClick = (event) => {
    const overlayContainer = document.getElementById("overlayContainer");
    if (!checkNull(overlayContainer, "overlayContainer"))
        return;
    if (overlayContainer.style.visibility === "visible") {
        if (!isClickInsideActiveDiv(event)) {
            const overlay = document.getElementById("overlay");
            if (!checkNull(overlay, "overlay"))
                return;
            hideOverlay(event);
            const processingButton = document.querySelector(".processing");
            if (processingButton) {
                processingButton.classList.remove("processing");
            }
        }
    }
    else {
        const linkAction = previousIconLink.getAttribute("data-action");
        if (!checkNull(sidebar, "sidebar") || !checkNull(linkAction, "linkAction"))
            return;
        if (!sidebar.contains(event.target) &&
            (linkAction === "searchAction" || linkAction === "notificationsAction")) {
            if (!checkNull(previousIconLink, "previousIconLink") ||
                !checkNull(previousWithoutToggleIcons, "previousWithoutToggleIcons"))
                return;
            const activeIcon = previousIconLink.querySelector(".sidebarIconActive");
            const passiveIcon = previousIconLink.querySelector(".sidebarIconPassive");
            const previousActiveIcon = previousWithoutToggleIcons.querySelector(".sidebarIconActive");
            const previousPassiveIcon = previousWithoutToggleIcons.querySelector(".sidebarIconPassive");
            if (!checkNull(activeIcon, "activeIcon") ||
                !checkNull(passiveIcon, "passiveIcon") ||
                !checkNull(previousActiveIcon, "previousActiveIcon") ||
                !checkNull(previousPassiveIcon, "previousPassiveIcon"))
                return;
            changeVisibleElement(activeIcon, passiveIcon, "d-block");
            changeVisibleElement(previousPassiveIcon, previousActiveIcon, "d-block");
            handleSidebarClosedState();
            previousIconLink = previousWithoutToggleIcons;
        }
    }
};
export const initializeSidebarSizeWhileClick = () => {
    document.addEventListener("click", handleSidebarSizeWhileClick);
};
const preventDefaultOnSamePage = (event, link) => {
    const currentPage = window.location.pathname;
    const linkPage = new URL(link.href).pathname;
    if (currentPage === linkPage) {
        event.preventDefault();
    }
};
const handleSidebarIconActions = (event, link) => {
    const handleLinkStyleReset = (link) => {
        link.style.filter = "brightness(1)";
        link.style.opacity = "1";
    };
    switch (event.type) {
        case "mouseover":
            setBackgroundColor(link, "rgb(55, 63, 68)");
            break;
        case "mouseout":
            handleLinkStyleReset(link);
            setBackgroundColor(link, "");
            break;
        case "mouseup":
            handleLinkStyleReset(link);
            break;
        case "mousedown":
            link.style.transition = "filter 0.1s ease, opacity 0.3s ease";
            link.style.filter = "brightness(0.8)";
            link.style.opacity = "0.7";
            break;
        case "click":
            let action = link.getAttribute("data-action");
            if (action === "searchAction" || action === "notificationsAction" || action === "createAction") {
                event.preventDefault();
            }
            preventDefaultOnSamePage(event, link);
            handleSidebarIconClick(link);
            break;
        default:
            console.log("Invalid Action Type");
    }
};
const getMoreElements = () => {
    const dropdownItems = document.querySelectorAll('.dropdownItem');
    dropdownItems.forEach((item) => {
        item.addEventListener("mouseover", (event) => handleSidebarIconActions(event, item));
        item.addEventListener("mouseout", (event) => handleSidebarIconActions(event, item));
        item.addEventListener("mouseup", (event) => handleSidebarIconActions(event, item));
        item.addEventListener("mousedown", (event) => handleSidebarIconActions(event, item));
    });
};
export const initializeSidebarIconEvents = () => {
    const sidebarIconLinks = document.querySelectorAll(".sidebarIconLink");
    const sidebarMainIconLink = document.querySelector("#sidebarMainIconLink");
    if (!checkNull(sidebarIconLinks, "sidebarIconLink"))
        return;
    sidebarIconLinks.forEach((link) => {
        link.addEventListener("mouseover", (event) => handleSidebarIconActions(event, link));
        link.addEventListener("mouseout", (event) => handleSidebarIconActions(event, link));
        link.addEventListener("mouseup", (event) => handleSidebarIconActions(event, link));
        link.addEventListener("mousedown", (event) => handleSidebarIconActions(event, link));
        link.addEventListener("click", (event) => handleSidebarIconActions(event, link));
    });
    sidebarMainIconLink.addEventListener("click", (event) => preventDefaultOnSamePage(event, sidebarMainIconLink));
    getMoreElements();
};
