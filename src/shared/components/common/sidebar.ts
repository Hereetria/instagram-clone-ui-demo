import checkNull from "../../utils/nullguard.js";
import { hideOverlay, isClickInsideActiveDiv } from "../../utils/overlay.js";
import { makeElementHidden, makeElementVisible, changeVisibleElement, isElementOpen, setBackgroundColor } from "../../utils/ui.js";

const sidebar = document.getElementById("sidebar") as HTMLElement;
const search = document.getElementById("search") as HTMLElement;
const sidebarOpenable = document.getElementById("sidebarOpenable") as HTMLElement;
const sidebarContent = document.getElementById("sidebarContent") as HTMLElement;
const sidebarContentInner = document.getElementById("sidebarContentInner") as HTMLElement;
const sidebarHideableItems = document.querySelectorAll(".sidebarHideableItem") as NodeListOf<HTMLElement>;
const sidebarIcon = document.querySelector("#sidebarIcon") as HTMLElement;

const sidebarSmallOpenState = (): void => {
  if (
    !checkNull(sidebarContent, "sidebarContent") ||
    !checkNull(sidebarContentInner, "sidebarContentInner") ||
    !checkNull(search, "search") ||
    !checkNull(sidebarOpenable, "sidebarOpenable") ||
    !checkNull(sidebarIcon, "sidebarIcon")
  )
    return;

  sidebarContent.style.width = "68px";
  sidebarContentInner.style.width = "60px";

  makeElementHidden(search, "d-block");
  makeElementHidden(sidebarOpenable, "d-block");

  sidebarHideableItems.forEach((item) => {
    makeElementHidden(item, "d-inline");
  });

  makeElementVisible(sidebarIcon, "d-flex");
};

const sidebarSmallClosedState = (): void => {
  if (
    !checkNull(sidebarContent, "sidebarContent") ||
    !checkNull(sidebarContentInner, "sidebarContentInner") ||
    !checkNull(sidebar, "sidebar") ||
    !checkNull(sidebarOpenable, "sidebarOpenable") ||
    !checkNull(sidebarIcon, "sidebarIcon")
  )
    return;

  sidebar.classList.remove("sidebarBorder", "border-end", "border-secondary");
  sidebarContent.style.width = "68px";
  sidebarContentInner.style.width = "60px";

  makeElementHidden(sidebarOpenable, "d-block");
  sidebarHideableItems.forEach((item) => {
    makeElementHidden(item, "d-inline");
  });

  makeElementVisible(sidebarIcon, "d-flex");
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

  makeElementHidden(sidebarIcon)
};

const handleSidebarClosedState = (): void => {
  if (window.innerWidth > 1340) {
    sidebarBigClosedState();
  } else {
    sidebarSmallClosedState();
  }
};

export const initializeAdjustSidebarState = () => {
  if (!checkNull(sidebarOpenable, "sidaberOpenable")) return;

  if (!isElementOpen(sidebarOpenable)) {
    handleSidebarClosedState();
  }
}

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

const handleSidebarSizeWhileClick = (event: MouseEvent): void => {
  const overlayContainer = document.getElementById("overlayContainer") as HTMLElement;
  if (!checkNull(overlayContainer, "overlayContainer")) return

  if (overlayContainer.style.visibility === "visible") {
    if (!isClickInsideActiveDiv(event)) {
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

export const initializeSidebarSizeWhileClick = (): void => {
  document.addEventListener("click", handleSidebarSizeWhileClick);
}

const preventDefaultOnSamePage = (event: MouseEvent, link: HTMLAnchorElement) => {
  const currentPage = window.location.pathname;
  const linkPage = new URL(link.href).pathname;
  if (currentPage === linkPage ) {
    event.preventDefault();
  }
}

const handleSidebarIconActions = (event: MouseEvent, link: HTMLAnchorElement): void => {
  const handleLinkStyleReset = (link: HTMLAnchorElement): void => {
    link.style.filter = "brightness(1)";
    link.style.opacity = "1";
  };

  switch (event.type) {
    case "mouseover":
      setBackgroundColor(link, "rgb(55, 63, 68)");
      break;

    case "mouseout":
      handleLinkStyleReset(link);
      setBackgroundColor(link, "");
      break;

    case "mouseup":
      handleLinkStyleReset(link);
      break;

    case "mousedown":
      link.style.transition = "filter 0.1s ease, opacity 0.3s ease";
      link.style.filter = "brightness(0.8)";
      link.style.opacity = "0.7";
      break;

    case "click":

      let action = link.getAttribute("data-action");
      if (action === "searchAction" || action === "notificationsAction" || action === "createAction") {
        event.preventDefault();
      }
      preventDefaultOnSamePage(event, link);
      handleSidebarIconClick(link);
      break;

    default:
      console.log("Invalid Action Type");
  }
};

const getMoreElements = () => {
  const dropdownItems = document.querySelectorAll<HTMLAnchorElement>('.dropdownItem');
  
  dropdownItems.forEach((item: HTMLAnchorElement) => {
    item.addEventListener("mouseover", (event) => handleSidebarIconActions(event, item));
    item.addEventListener("mouseout", (event) => handleSidebarIconActions(event, item));
    item.addEventListener("mouseup", (event) => handleSidebarIconActions(event, item));
    item.addEventListener("mousedown", (event) => handleSidebarIconActions(event, item));

  });
};

export const initializeSidebarIconEvents = () => {
  const sidebarIconLinks = document.querySelectorAll<HTMLAnchorElement>(".sidebarIconLink");
  const sidebarMainIconLink = document.querySelector("#sidebarMainIconLink") as HTMLAnchorElement;
  if (!checkNull(sidebarIconLinks, "sidebarIconLink")) return;

  sidebarIconLinks.forEach((link: HTMLAnchorElement) => {
    link.addEventListener("mouseover", (event) => handleSidebarIconActions(event, link));
    link.addEventListener("mouseout", (event) => handleSidebarIconActions(event, link));
    link.addEventListener("mouseup", (event) => handleSidebarIconActions(event, link));
    link.addEventListener("mousedown", (event) => handleSidebarIconActions(event, link));
    link.addEventListener("click", (event) => handleSidebarIconActions(event, link));
  });
  sidebarMainIconLink.addEventListener("click", (event) => preventDefaultOnSamePage(event, sidebarMainIconLink));

  getMoreElements();
};
