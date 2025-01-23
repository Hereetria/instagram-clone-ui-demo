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

export const setClickActionWithSpinner = (postLink: HTMLElement): void => {
  const originalContent = postLink.innerHTML;
  postLink.innerHTML = spinner;
  setTimeout(() => {
    postLink.innerHTML = originalContent;
  }, 1000);
};

export const handleBlueLinkEvents = (event: MouseEvent, targetElement: HTMLElement): void => {
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
      case "mouseup":
        targetElement.style.transition = "color 0.2s ease";
        targetElement.style.color = "white";
        break;
  }
};

export interface ButtonEventColors {
  mousedefault: string;
  mousehover: string;
  mouseclick: string;
}

export const blueElementColors: ButtonEventColors = {
    mousedefault: "rgb(19, 133, 255)",
    mousehover: "white",
    mouseclick: "#555555", 
  };

export const whiteElementColors: ButtonEventColors = {
    mousedefault: "rgb(255, 255, 255)",
    mousehover: "rgb(180, 180, 180)",
    mouseclick: "rgb(134, 134, 134)",
  };

  export const grayElementColors: ButtonEventColors = {
    mousedefault: "#555555",
    mousehover: "#444444",
    mouseclick: "#333333",
  };

  export const grayShinyColors: ButtonEventColors = {
    mousedefault: "rgb(53, 53, 53)",
    mousehover: "",
    mouseclick: "#555555",
  }

  export const grayShinyWithoutHoverColors = {
    mousedefault: "rgb(53, 53, 53)",
    mousehover: "rgb(53, 53, 53)",
    mouseclick: "#555555",

  }

const handleStyleEvents = (
    element: HTMLElement,
    colors: ButtonEventColors | ButtonEventFilterNumbers,
    styleProperty: "backgroundColor" | "color" | "filter",
    brightnessValues?: { mouseover: string; mouseout: string; mousedown: string; mouseup: string }
  ) => {
    type MouseEventTypes = "mouseover" | "mouseout" | "mousedown" | "mouseup";
  
    const mouseEvents: MouseEventTypes[] = ["mouseover", "mouseout", "mousedown", "mouseup"];
  
    mouseEvents.forEach((eventType) => {
      element.addEventListener(eventType, (event: MouseEvent) => {
        let value: string;
  
        if (styleProperty === "filter") {
          const brightness = brightnessValues || { mouseover: "brightness(70%)", mouseout: "brightness(100%)", mousedown: "brightness(40%)", mouseup: "brightness(70%)" };
          value = eventType === "mouseover" ? brightness.mouseover :
                  eventType === "mouseout" ? brightness.mouseout :
                  eventType === "mousedown" ? brightness.mousedown :
                  brightness.mouseup;
          element.style.filter = value;
        } else {
          value = eventType === "mouseover" ? (colors as ButtonEventColors).mousehover :
                  eventType === "mouseout" ? (colors as ButtonEventColors).mousedefault :
                  eventType === "mousedown" ? (colors as ButtonEventColors).mouseclick :
                  (colors as ButtonEventColors).mousehover;
          (element.style as CSSStyleDeclaration)[styleProperty] = value;
        }
      });
    });
  };
  
  export const handleButtonStyleEvents = (
    element: HTMLElement,
    colors: ButtonEventColors
  ) => {
    handleStyleEvents(element, colors, "backgroundColor");
  };
  
  export const handleTextStyleEvents = (
    element: HTMLElement,
    colors: ButtonEventColors
  ) => {
    handleStyleEvents(element, colors, "color");
  };
  
  export interface ButtonEventFilterNumbers {
    mousedefault: number;
    mousehover: number;
    mouseclick: number;
  }
  
export const addCursorToElement = (
  element: HTMLElement,
   cursorName: string = "pointer") => {
    element.addEventListener("mouseover", () => {
      element.style.cursor = cursorName;
    })
   }

  export const handleFilterStyleEvents = (
    element: HTMLElement,
    filterNumbers?: ButtonEventFilterNumbers,
    willAddCursor = false
  ) => {
    const defaultBrightness: ButtonEventFilterNumbers = {
      mousedefault: 100,
      mousehover: 70,
      mouseclick: 40
    };
  
    handleStyleEvents(element, filterNumbers || defaultBrightness, "filter");
  };
  