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