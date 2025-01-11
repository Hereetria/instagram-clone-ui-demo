import checkNull from "../../utils/nullguard.js";
import { makeOverlayVisible } from "../../utils/overlay.js";
import { makeElementHidden, makeElementVisible, spinner } from "../../utils/ui.js";
const switchAccount = document.getElementById("switchAccount");
const login = document.getElementById("login");
export const handleSwitchButtonClick = () => {
    const switchButton = document.getElementById("switchButton");
    if (!checkNull(switchButton, "switchButton") || !checkNull(switchAccount, "switchAccount)"))
        return;
    switchButton.addEventListener("click", (event) => makeOverlayVisible(event, switchAccount));
};
export const toggleShowHide = () => {
    const showHideLink = document.getElementById("showHideLink");
    const password = document.getElementById("password");
    const showHide = document.getElementById("showHide");
    if (!checkNull(showHideLink, "showHideLink") || !checkNull(password, "password") || !checkNull(showHide, "showHide"))
        return;
    showHideLink.addEventListener("click", (event) => {
        event.preventDefault();
        const isPassword = password.type === "password";
        password.type = isPassword ? "text" : "password";
        showHide.textContent = isPassword ? "Hide" : "Show";
    });
};
export const handleLoginButtonClick = () => {
    const loginButton = document.getElementById("loginButton");
    if (!checkNull(loginButton, "loginButton"))
        return;
    loginButton.addEventListener("click", (event) => {
        event.preventDefault();
        loginButton.innerHTML = spinner;
    });
    setTimeout(() => {
        loginButton.innerHTML = "login";
    }, 2000);
};
export const initializeOpenLoginPage = () => {
    const logExistingAccountLink = document.querySelector("#logExistingAccountLink");
    if (!checkNull(logExistingAccountLink, "logExistingAccountLink") || !checkNull(login, "login"))
        return;
    logExistingAccountLink.addEventListener("click", () => {
        makeElementHidden(switchAccount, "d-flex");
        makeElementVisible(login, "d-flex");
    });
};
