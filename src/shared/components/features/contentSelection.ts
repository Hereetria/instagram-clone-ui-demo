import checkNull from "../../utils/nullguard.js";
import { toggleOverlayVisibility } from "../../utils/overlay.js";

export const initializeToggleText = (): void => {
  const toggleText = document.getElementById("toggleText") as HTMLElement;
  if (!checkNull(toggleText, "toggleText")) return;
    toggleText.addEventListener("click", () => {
      toggleText.textContent =
        toggleText.textContent === "For you" ? "Following" : "For you";
    });
};

export const toggleOverlayWhileLogin = (): void => {
  const login = document.getElementById("login") as HTMLElement;
  if (!checkNull(login, "login")) return;
    login.addEventListener("click", (event: MouseEvent) => {
      event.preventDefault();
      toggleOverlayVisibility();
    });
};
