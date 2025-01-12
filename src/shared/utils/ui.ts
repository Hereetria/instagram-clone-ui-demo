import checkNull from "./nullguard.js";

export const spinner: string = '<i class="fa fa-spinner fa-spin"></i>';

export const makeElementHidden = (element: HTMLElement, visibleClass: string = "d-flex"): void => {
  element.classList.remove(visibleClass);
  element.classList.add("d-none");
};

export const makeElementVisible = (element: HTMLElement, visibleClass: string = "d-flex"): void => {
  element.classList.remove("d-none");
  element.classList.add(visibleClass);
};

export const changeVisibleElement = (
  elementToHide: HTMLElement,
  elementToShow: HTMLElement,
  visibleClass: string = "d-flex"
) => {
  makeElementHidden(elementToHide, visibleClass);
  makeElementVisible(elementToShow, visibleClass);
};

export const toggleElementVisibility = (element: HTMLElement, visibleClass: string): void => {
  if (element.classList.contains("d-none")) {
    makeElementVisible(element, visibleClass);
  } else {
    makeElementHidden(element, visibleClass);
  }
};

export const toggleElementClass = (element: HTMLElement, className: string): void => {
  if (element.classList.contains(className)) {
    element.classList.remove(className);
  } else {
    element.classList.add(className);
  }
};

export const isElementOpen = (element: HTMLElement): boolean => {
  if (element.classList.contains("d-none")) {
    return false;
  } else {
    return true;
  }
}

export const initializePreventDefault = () => {
  const preventDefaultElements = document.querySelectorAll(".preventDefault") as NodeListOf<HTMLElement>;
  if (!checkNull(preventDefaultElements, "preventDefaultElements")) return;

  preventDefaultElements.forEach((element: HTMLElement) => {
    element.addEventListener("click", (event: MouseEvent) => {
      event.preventDefault();
    });
  });
};

export const getScrollbarWidth = (): number => {
  return window.innerWidth - document.documentElement.clientWidth;
};

export const setBackgroundColor = (element: HTMLElement, color: string) => {
  element.style.backgroundColor = color;
};