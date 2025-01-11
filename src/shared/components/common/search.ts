import checkNull from "../../utils/nullguard.js";
import { hideOverlay, makeOverlayVisible } from "../../utils/overlay.js";
import { makeElementHidden, makeElementVisible } from "../../utils/ui.js";

const handleSearchbarActions = (searchBar: HTMLInputElement, searchBarIcon: HTMLElement) => {
  searchBar.addEventListener("focus", () => {
    searchBar.placeholder = "Search";
    if (searchBarIcon) makeElementHidden(searchBarIcon);
  });

  searchBar.addEventListener("blur", () => {
    if (searchBarIcon && searchBar.value === "") makeElementVisible(searchBarIcon);
    searchBar.placeholder = "     Search";
  });
};

const searchBars = document.querySelectorAll(".searchBar") as NodeListOf<HTMLInputElement>;
const searchBarIcons = document.querySelectorAll(".searchBarIcon") as NodeListOf<HTMLElement>;

export const handleSearchbarIconVisibility = () => {
  searchBars.forEach((searchBar: HTMLInputElement, index: number) => {
    const searchBarIcon = searchBarIcons[index];
    handleSearchbarActions(searchBar, searchBarIcon);
  });
};

const clearSearch = (event: Event) => {
  event.preventDefault();
  searchBars.forEach((searchBar: HTMLInputElement, index: number) => {
    searchBar.value = "";
    let searchBarIcon = searchBarIcons[index];
    if (searchBarIcon) makeElementVisible(searchBarIcon);
  });
};

export const clearSearchOnClick = () => {
  const clearSearchLinks = document.querySelectorAll(".clearSearchLink") as NodeListOf<HTMLElement>;
  if (!checkNull(clearSearchLinks, "clearSearchLinks")) return;

  clearSearchLinks.forEach((link: HTMLElement) => link.addEventListener("click", clearSearch));
};

const handleSearchedProfileContainerClick = (event: MouseEvent): void => {
  if (!(event.target instanceof HTMLElement) || !event.target.closest("a")) {
    window.location.href = "#";
  }
};

const handleSearchedProfileContainerMouseDown = (container: HTMLElement): void => {
  container.style.transition = "filter 0.3s ease, opacity 0.3s ease";
  container.style.filter = "brightness(0.8)";
  container.style.opacity = "0.7";
};

const handleSearchedProfileContainerMouseUp = (container: HTMLElement): void => {
  container.style.filter = "";
  container.style.opacity = "";
};

const handleSearchedProfileContainerMouseLeave = (container: HTMLElement): void => {
  container.style.filter = "";
  container.style.opacity = "";
};

const handleSearchedProfileContainerMouseOver = (container: HTMLElement, event: MouseEvent): void => {
  if (!(event.target instanceof HTMLElement) || !event.target.closest("a")) {
    container.style.cursor = "pointer";
    container.style.backgroundColor = "rgb(55, 63, 68)";
  }
};

const handleSearchedProfileContainerMouseOut = (container: HTMLElement): void => {
  container.style.cursor = "default";
  container.style.backgroundColor = "";
};

export const initSearchedProfileEventListeners = (): void => {
  const searchedProfileContainers = document.querySelectorAll(".searchedProfileContainer") as NodeListOf<HTMLElement>;
  if (!checkNull(searchedProfileContainers, "searchedProfileContainers")) return;

  searchedProfileContainers.forEach((container) => {
    container.addEventListener("click", handleSearchedProfileContainerClick);
    container.addEventListener("mousedown", () => handleSearchedProfileContainerMouseDown(container));
    container.addEventListener("mouseup", () => handleSearchedProfileContainerMouseUp(container));
    container.addEventListener("mouseleave", () => handleSearchedProfileContainerMouseLeave(container));
    container.addEventListener("mouseover", (event) => handleSearchedProfileContainerMouseOver(container, event));
    container.addEventListener("mouseout", () => handleSearchedProfileContainerMouseOut(container));
  });
};

const handleClearAllLinkEvents = (event: MouseEvent, targetElement: HTMLElement): void => {
  const clearSearchHistory = document.getElementById("clearSearchHistory") as HTMLElement;

  if (!checkNull(clearSearchHistory, "clearSearchHistory")) return;

  switch (event.type) {
    case "mouseover":
      targetElement.style.transition = "color 0.2s ease";
      targetElement.style.color = "white";
      break;
    case "mouseout":
      targetElement.style.transition = "color 0.1s ease";
      targetElement.style.color = "rgb(19, 133, 255)";
      break;
    case "mousedown":
      targetElement.style.transition = "color 0s ease";
      targetElement.style.color = "#555555";
      break;
    case "click":
      event.preventDefault();
      makeOverlayVisible(event, clearSearchHistory);
      break;
  }
};

export const initializeClearAllLinkEvents = (): void => {
  const clearAllTextElements = document.querySelectorAll(".clearAllText");

  clearAllTextElements.forEach((element) => {
    element.addEventListener("mouseover", (event) => handleClearAllLinkEvents(event as MouseEvent, element as HTMLElement));
    element.addEventListener("mouseout", (event) => handleClearAllLinkEvents(event as MouseEvent, element as HTMLElement));
    element.addEventListener("mousedown", (event) => handleClearAllLinkEvents(event as MouseEvent, element as HTMLElement));
    element.addEventListener("click", (event) => handleClearAllLinkEvents(event as MouseEvent, element as HTMLElement));
  });
};

const handleClearAllButtonEvents = (event: MouseEvent): void => {
  let target: HTMLDivElement | null = null;

  if (event.target instanceof HTMLDivElement) {
    target = event.target; // Eğer target bir div ise, target değişkenine ata
  }
  
  if (target) {
    switch (event.type) {
      case "mousedown":
        target.style.backgroundColor = "#555555";
        break;
      case "mouseover":
        target.style.cursor = "pointer";
        target.style.backgroundColor = "rgb(53, 53, 53)";
        break;
      case "mouseleave":
        target.style.cursor = "pointer";
        target.style.backgroundColor = "rgb(53, 53, 53)";
        break;
      case "click":
        event.stopPropagation();
        hideOverlay(event);
        break;
    }
  }  
};

export const setupClearAllButtonEvents = (): void => {
  const clearAllButtonDiv = document.getElementById("clearAllButtonDiv") as HTMLElement;
  const clearAllNotNowButtonDiv = document.getElementById("clearAllNotNowButtonDiv") as HTMLElement;
  if (
    !checkNull(clearAllButtonDiv, "clearAllButtonDiv") ||
    !checkNull(clearAllNotNowButtonDiv, "clearAllNotNowButtonDiv")
  )
    return;

  clearAllButtonDiv.addEventListener("mousedown", handleClearAllButtonEvents);
  clearAllButtonDiv.addEventListener("mouseover", handleClearAllButtonEvents);
  clearAllButtonDiv.addEventListener("mouseleave", handleClearAllButtonEvents);
  clearAllButtonDiv.addEventListener("click", handleClearAllButtonEvents);

  clearAllNotNowButtonDiv.addEventListener("mousedown", handleClearAllButtonEvents);
  clearAllNotNowButtonDiv.addEventListener("mouseover", handleClearAllButtonEvents);
  clearAllNotNowButtonDiv.addEventListener("mouseleave", handleClearAllButtonEvents);
  clearAllNotNowButtonDiv.addEventListener("click", handleClearAllButtonEvents);
};
