import checkNull from "../../utils/nullguard.js";
import { hideOverlay } from "../../utils/overlay.js";

export const initializeCloseButtonListeners = (): void => {
  const share = document.getElementById("share") as HTMLElement;
  const closeButtons = document.querySelectorAll(".closeButton") as NodeListOf<HTMLElement>;
  if (!checkNull(closeButtons, "closeButtons") && !checkNull(share, "share")) return;

  closeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      hideOverlay(event);
    });
  });
};