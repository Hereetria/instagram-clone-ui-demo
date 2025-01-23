import checkNull from "./nullguard.js";
import { makeElementHidden, makeElementVisible } from "./ui.js";

const overlayContainer = document.getElementById("overlayContainer") as HTMLElement;
const overlay = document.getElementById("overlay") as HTMLElement;

const getCurrentDivsInOverlay = (): HTMLElement[] => {
  return Array.from(overlayContainer.children).filter(
    (div) => div.tagName === 'DIV' && div.classList.contains('d-flex')
  ) as HTMLElement[];
}

const getMaxZIndexDiv = (currentDivs: HTMLElement[]): HTMLElement | null => {
  if (currentDivs.length === 0) return null;

  return currentDivs.reduce<HTMLElement>((highestDiv, currentDiv) => {
    const currentZIndex = parseInt(window.getComputedStyle(currentDiv).zIndex, 10) || 0;
    const highestZIndex = parseInt(window.getComputedStyle(highestDiv).zIndex, 10) || 0;
    return currentZIndex > highestZIndex ? currentDiv : highestDiv;
  }, currentDivs[0]);
};

export const hideOverlay = (event: Event): void => {
  if (!checkNull(overlayContainer, "overlayContainer")) return;

  event.preventDefault();
  
  const currentDivs:HTMLElement[] = getCurrentDivsInOverlay();
  const activeDiv: HTMLElement | null = getMaxZIndexDiv(currentDivs);

  if (activeDiv) {
    makeElementHidden(activeDiv, "d-flex");
    overlay.style.zIndex = "999";
  } else {
    console.log('Current div was not found in overlayContainer.');
  }

  if (currentDivs.length === 1) {
    overlayContainer.style.visibility = "hidden";
  }
};

export const makeOverlayVisible = (event: MouseEvent, elementToShow: HTMLElement | null): void => {
  if (!checkNull(overlayContainer, "overlayContainer")) return;
  if (overlayContainer.style.visibility === "hidden") {
    if (elementToShow) {
      makeElementVisible(elementToShow, "d-flex");
      overlayContainer.style.visibility = "visible";
    }
  } else {
    if (elementToShow) {
      makeElementVisible(elementToShow, "d-flex");

      const currentDivs: HTMLElement[] = getCurrentDivsInOverlay();
      const maxzIndexDiv = getMaxZIndexDiv(currentDivs);
      
      if (maxzIndexDiv && maxzIndexDiv.style.zIndex) {
        const maxZIndex = parseInt(maxzIndexDiv.style.zIndex, 10);
        overlay.style.zIndex = (maxZIndex - 1).toString();
      }
    }
  }
};

export const toggleOverlayVisibility = (): void => {
  if (!checkNull(overlayContainer, "overlayContainer")) return;

  Array.from(overlayContainer.children).forEach((containerChildDiv) => {
    if (containerChildDiv.tagName === "DIV") {
      containerChildDiv.classList.toggle("d-flex");
      containerChildDiv.classList.toggle("d-none");
    }
  });
};

export const isClickInsideDiv = (event: MouseEvent, targetDiv: HTMLElement): boolean => {
  if (!checkNull(overlayContainer, "overlayContainer")) return false;
  
  const { top, bottom, left, right } = targetDiv.getBoundingClientRect();
  const { clientX: x, clientY: y } = event;

  return x >= left && x <= right && y >= top && y <= bottom;
};

export const isClickInsideActiveDiv = (event: MouseEvent): boolean => {
  if (!checkNull(overlayContainer, "overlayContainer")) return false;
  const currentDivs: HTMLElement[] = getCurrentDivsInOverlay();
  const activeDiv: HTMLElement | null = getMaxZIndexDiv(currentDivs);
  if (!activeDiv) return false;

  return isClickInsideDiv(event, activeDiv);
};
