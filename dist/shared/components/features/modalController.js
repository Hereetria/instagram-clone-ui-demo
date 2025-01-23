import checkNull from "../../utils/nullguard.js";
import { hideOverlay } from "../../utils/overlay.js";
import { blueElementColors, handleTextStyleEvents, whiteElementColors } from "../../utils/ui.js";
export const initializeCloseButtonListeners = () => {
    const share = document.getElementById("share");
    const closeButtons = document.querySelectorAll(".closeButton");
    if (!checkNull(closeButtons, "closeButtons") && !checkNull(share, "share"))
        return;
    closeButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            hideOverlay(event);
        });
    });
};
const handleFollowLinkClickEvent = (event, link) => {
    const spanElement = link.querySelector("span");
    if (!checkNull(spanElement, "spanElement"))
        return;
    if (link.classList.contains("followLink")) {
        link.classList.replace("followLink", "requestedLink");
        link.style.color = "rgb(180, 180, 180)";
        spanElement.innerHTML = "Requested";
    }
    else if (link.classList.contains("requestedLink")) {
        link.classList.replace("requestedLink", "followLink");
        link.style.color = "white";
        spanElement.innerHTML = "Follow";
    }
    else if (link.classList.contains("followingLink")) {
        link.classList.replace("followingLink", "followLink");
        link.style.color = "white";
        spanElement.innerHTML = "Follow";
    }
    const getColors = () => link.classList.contains("requestedLink") ? whiteElementColors : blueElementColors;
    handleTextStyleEvents(link, getColors());
};
export const initializeFollowLinkEvents = () => {
    const followLinks = document.querySelectorAll(".followLink");
    const seeAllLink = document.querySelector("#seeAllLink");
    if (!checkNull(followLinks, "followLink") || !checkNull(seeAllLink, "seeAllLink"))
        return;
    followLinks.forEach((link) => {
        link.addEventListener("click", (event) => handleFollowLinkClickEvent(event, link));
        const getColors = () => link.classList.contains("requestedLink") ? whiteElementColors : blueElementColors;
        handleTextStyleEvents(link, getColors());
    });
    const seeAllText = seeAllLink.querySelector("span");
    handleTextStyleEvents(seeAllText, whiteElementColors);
};
