import checkNull from "../../utils/nullguard.js";
import { toggleOverlayVisibility } from "../../utils/overlay.js";
export const initializeToggleText = () => {
    const toggleText = document.getElementById("toggleText");
    if (!checkNull(toggleText, "toggleText"))
        return;
    toggleText.addEventListener("click", () => {
        toggleText.textContent =
            toggleText.textContent === "For you" ? "Following" : "For you";
    });
};
export const toggleOverlayWhileLogin = () => {
    const login = document.getElementById("login");
    if (!checkNull(login, "login"))
        return;
    login.addEventListener("click", (event) => {
        event.preventDefault();
        toggleOverlayVisibility();
    });
};
