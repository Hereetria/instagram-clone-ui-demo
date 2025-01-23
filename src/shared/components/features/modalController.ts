import checkNull from "../../utils/nullguard.js";
import { hideOverlay } from "../../utils/overlay.js";
import { blueElementColors, ButtonEventColors, handleBlueLinkEvents, handleButtonStyleEvents, handleTextStyleEvents, toggleElementClass, whiteElementColors } from "../../utils/ui.js";

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

const handleFollowLinkClickEvent = (event: MouseEvent, link: HTMLAnchorElement) => {
  const spanElement = link.querySelector("span") as HTMLSpanElement;
  if (!checkNull(spanElement, "spanElement")) return;

    if (link.classList.contains("followLink")) {
      link.classList.replace("followLink", "requestedLink")
      link.style.color = "rgb(180, 180, 180)";
      spanElement.innerHTML = "Requested";
    } else if (link.classList.contains("requestedLink")) {
      link.classList.replace("requestedLink", "followLink")
      link.style.color = "white";
      spanElement.innerHTML = "Follow";
    } else if (link.classList.contains("followingLink")) {
      link.classList.replace("followingLink", "followLink")
      link.style.color = "white";
      spanElement.innerHTML = "Follow";
    }

    const getColors = () => link.classList.contains("requestedLink") ? whiteElementColors : blueElementColors;
      
    handleTextStyleEvents(link, getColors());

}


export const initializeFollowLinkEvents = () => {
  const followLinks = document.querySelectorAll<HTMLAnchorElement>(".followLink");
  const seeAllLink = document.querySelector("#seeAllLink") as HTMLAnchorElement;
  if (!checkNull(followLinks, "followLink") || !checkNull(seeAllLink, "seeAllLink")) return;

  followLinks.forEach((link: HTMLAnchorElement) => {
    link.addEventListener("click", (event: MouseEvent) => handleFollowLinkClickEvent(event, link));

    const getColors = () => link.classList.contains("requestedLink") ? whiteElementColors : blueElementColors;
    handleTextStyleEvents(link, getColors());
  });
  
  const seeAllText = seeAllLink.querySelector("span") as HTMLSpanElement
  handleTextStyleEvents(seeAllText, whiteElementColors);
  

};