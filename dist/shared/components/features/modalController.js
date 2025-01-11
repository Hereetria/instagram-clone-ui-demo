import checkNull from "../../utils/nullguard.js";
import { hideOverlay } from "../../utils/overlay.js";
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
