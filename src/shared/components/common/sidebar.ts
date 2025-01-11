import checkNull from "../../utils/nullguard.js";
import { hideOverlay, isClickInsideActiveDiv } from "../../utils/overlay.js";
import { makeElementHidden, makeElementVisible, changeVisibleElement } from "../../utils/ui.js";

const sidebar = document.getElementById("sidebar") as HTMLElement;
const search = document.getElementById("search") as HTMLElement;
const sidebarOpenable = document.getElementById("sidebarOpenable") as HTMLElement;
const sidebarContent = document.getElementById("sidebarContent") as HTMLElement;
const sidebarContentInner = document.getElementById("sidebarContentInner") as HTMLElement;
const sidebarHideableItems = document.querySelectorAll(".sidebarHideableItem") as NodeListOf<HTMLElement>;

const sidebarSmallOpenState = (): void => {
  if (
    !checkNull(sidebarContent, "sidebarContent") ||
    !checkNull(sidebarContentInner, "sidebarContentInner") ||
    !checkNull(search, "search") ||
    !checkNull(sidebarOpenable, "sidebarOpenable")
  )
    return;

  sidebarContent.style.width = "68px";
  sidebarContentInner.style.width = "60px";

  makeElementHidden(search, "d-block");
  makeElementHidden(sidebarOpenable, "d-block");

  sidebarHideableItems.forEach((item) => {
    makeElementHidden(item, "d-inline");
  });
};

const sidebarSmallClosedState = (): void => {
  if (
    !checkNull(sidebarContent, "sidebarContent") ||
    !checkNull(sidebarContentInner, "sidebarContentInner") ||
    !checkNull(sidebar, "sidebar") ||
    !checkNull(sidebarOpenable, "sidebarOpenable")
  )
    return;

  sidebar.classList.remove("sidebarBorder", "border-end", "border-secondary");
  sidebarContent.style.width = "68px";
  sidebarContentInner.style.width = "60px";

  makeElementHidden(sidebarOpenable, "d-block");
  sidebarHideableItems.forEach((item) => {
    makeElementHidden(item, "d-inline");
  });
};

const sidebarBigClosedState = (): void => {
  if (
    !checkNull(sidebar, "sidebar") ||
    !checkNull(sidebarContent, "sidebarContent") ||
    !checkNull(sidebarContentInner, "sidebarContentInner") ||
    !checkNull(sidebarOpenable, "sidebarOpenable")
  )
    return;

  sidebar.classList.remove("sidebarBorder", "border-end", "border-secondary");
  sidebarContent.style.width = "235px";
  sidebarContentInner.style.width = "225px";

  makeElementHidden(sidebarOpenable, "d-block");
  sidebarHideableItems.forEach((item) => {
    makeElementVisible(item, "inline");
  });
};

const handleSidebarClosedState = (): void => {
  if (window.innerWidth > 1340) {
    sidebarBigClosedState();
  } else {
    sidebarSmallClosedState();
  }
};

let previousIconLink = document.querySelector('[data-action="homeAction"]') as HTMLElement;
let previousWithoutToggleIcons = previousIconLink as HTMLElement;

const handleSidebarIconClick = (iconLink: HTMLElement): void => {
  const notifications = document.getElementById("notifications") as HTMLElement;
  const sidebarOpenable = document.getElementById("sidebarOpenable") as HTMLElement;

  const activeIcon = iconLink.querySelector(".sidebarIconActive") as HTMLElement;
  const passiveIcon = iconLink.querySelector(".sidebarIconPassive") as HTMLElement;

  const previousActiveIcon = previousIconLink.querySelector(".sidebarIconActive") as HTMLElement;
  const previousPassiveIcon = previousIconLink.querySelector(".sidebarIconPassive") as HTMLElement;

  if (
    !checkNull(sidebar, "sidebar") ||
    !checkNull(search, "search") ||
    !checkNull(notifications, "notifications") ||
    !checkNull(sidebarOpenable, "sidebarOpenable") ||
    !checkNull(activeIcon, "activeIcon") ||
    !checkNull(passiveIcon, "passiveIcon") ||
    !checkNull(previousActiveIcon, "previousActiveIcon") ||
    !checkNull(previousPassiveIcon, "previousPassiveIcon")
  )
    return;

  const iconAction: string | null = iconLink.getAttribute("data-action");
  if (previousIconLink !== iconLink) {
    changeVisibleElement(passiveIcon, activeIcon, "d-block");
    changeVisibleElement(previousActiveIcon, previousPassiveIcon, "d-block");

    previousIconLink = iconLink;

    if (iconAction !== "searchAction" && iconAction !== "notificationsAction") {
      previousWithoutToggleIcons = iconLink;
      handleSidebarClosedState();
    } else {
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
  } else {
    if (iconAction === "searchAction" || iconAction === "notificationsAction") {
      handleSidebarClosedState();

      const previousActiveToggleIcon = previousWithoutToggleIcons.querySelector(".sidebarIconActive") as HTMLElement;
      const previousPassiveToggleIcon = previousWithoutToggleIcons.querySelector(".sidebarIconPassive") as HTMLElement;

      if (
        !checkNull(previousActiveToggleIcon, "previousActiveToggleIcon") ||
        !checkNull(previousPassiveToggleIcon, "previousPassiveToggleIcon")
      )
        return;

      if (passiveIcon && activeIcon) changeVisibleElement(activeIcon, passiveIcon, "d-block");

      if (previousActiveToggleIcon && previousPassiveToggleIcon)
        changeVisibleElement(previousPassiveToggleIcon, previousActiveToggleIcon, "d-block");

      previousIconLink = previousWithoutToggleIcons;
    }
  }
};

export const sidebarIconOnClick = () => {
  const sidebarIconLinks = document.querySelectorAll(".nav-item a") as NodeListOf<HTMLAnchorElement>;
  if (!checkNull(sidebarIconLinks, "sidebarIconLinks")) return;

  sidebarIconLinks.forEach((link) => {
    link.addEventListener("click", (event: MouseEvent) => {
      let action = link.getAttribute("data-action");
      if (action === "searchAction" || action === "notificationsAction" || action === "createAction") {
        event.preventDefault();
      }
      handleSidebarIconClick(link);
    });
  });
};

const handleSidebarSizeWhileClick = (event: MouseEvent): void => {
  const overlayContainer = document.getElementById("overlayContainer") as HTMLElement;
  if (!checkNull(overlayContainer, "overlayContainer")) return

  if (overlayContainer.style.visibility === "visible") {
    if (!isClickInsideActiveDiv(event)) {
      console.log(1);
      const overlay = document.getElementById("overlay") as HTMLElement;
      if (!checkNull(overlay, "overlay")) return;

      hideOverlay(event);
      const processingButton = document.querySelector(".processing") as HTMLElement;
      if (processingButton) {
        processingButton.classList.remove("processing");
      }
    }
  } else {
    const linkAction = previousIconLink.getAttribute("data-action");
    if (!checkNull(sidebar, "sidebar") || !checkNull(linkAction, "linkAction")) return
    if (
      !sidebar.contains(event.target as Node) &&
      (linkAction === "searchAction" || linkAction === "notificationsAction")
    ) {
      if (
        !checkNull(previousIconLink, "previousIconLink") ||
        !checkNull(previousWithoutToggleIcons, "previousWithoutToggleIcons")
      ) return;

      const activeIcon = previousIconLink.querySelector(".sidebarIconActive") as HTMLElement;
      const passiveIcon = previousIconLink.querySelector(".sidebarIconPassive") as HTMLElement;
      const previousActiveIcon = previousWithoutToggleIcons.querySelector(".sidebarIconActive") as HTMLElement;
      const previousPassiveIcon = previousWithoutToggleIcons.querySelector(".sidebarIconPassive") as HTMLElement;

      if (
        !checkNull(activeIcon, "activeIcon") ||
        !checkNull(passiveIcon, "passiveIcon") ||
        !checkNull(previousActiveIcon, "previousActiveIcon") ||
        !checkNull(previousPassiveIcon, "previousPassiveIcon")
      ) return;

      changeVisibleElement(activeIcon,passiveIcon, "d-block")
      changeVisibleElement(previousPassiveIcon, previousActiveIcon, "d-block");

      handleSidebarClosedState();
      previousIconLink = previousWithoutToggleIcons;
    }
  }
};

export const initializeSidebarSizeWhileClick = () => {
  document.addEventListener("click", handleSidebarSizeWhileClick);
}
