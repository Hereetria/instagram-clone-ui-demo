import checkNull from "../../utils/nullguard.js";
import { makeOverlayVisible } from "../../utils/overlay.js";
import { getFileName, getFunctionName } from "../../utils/test.js";
import { ButtonEventColors, handleBlueLinkEvents, handleTextStyleEvents, makeElementHidden, makeElementVisible, spinner } from "../../utils/ui.js";

const switchAccount = document.getElementById("switchAccount") as HTMLElement;
const switchLink = document.querySelector("#switchLink") as HTMLAnchorElement;
const login = document.getElementById("login") as HTMLElement;


export const initializeSwitchLinkEvents = () => {
  if (!checkNull(switchLink, "switchLink")) return;

  const colors: ButtonEventColors = {
    mousedefault: "rgb(19, 133, 255)",
    mousehover: "white",
    mouseclick: "#555555", 
  };
    handleTextStyleEvents(switchLink, colors)
    switchLink.addEventListener("click", (event: MouseEvent) => {
      event.stopPropagation();
      makeOverlayVisible(event, switchAccount)
    });
}


export const toggleShowHide = () => { 
  const showHideLink = document.getElementById("showHideLink") as HTMLElement;
  const password = document.getElementById("password") as HTMLInputElement;
  const showHide = document.getElementById("showHide") as HTMLElement;

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
  const loginButton = document.getElementById("loginButton") as HTMLButtonElement;
  if (!checkNull(loginButton, "loginButton")) return;

  loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    loginButton.innerHTML = spinner;
  });

  setTimeout(() => {
    loginButton.innerHTML = "Log in";
  }, 2000);
};

export const initializeOpenLoginPage = () => {
  const logExistingAccountLink = document.querySelector("#logExistingAccountLink") as HTMLAnchorElement;
  if (!checkNull(logExistingAccountLink, "logExistingAccountLink") || !checkNull(login, "login")) return;

  logExistingAccountLink.addEventListener("click", () => {
    makeElementHidden(switchAccount, "d-flex")
    makeElementVisible(login, "d-flex");
  })
}