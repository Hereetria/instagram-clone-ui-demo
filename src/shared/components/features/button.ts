import checkNull from "../../utils/nullguard.js";
import { hideOverlay, isClickInsideDiv, makeOverlayVisible } from "../../utils/overlay.js";
import { spinner } from "../../utils/ui.js";

const handleRequestedButtonClick = (button: HTMLButtonElement): void => {
  if (button.classList.contains("processing") || button.innerHTML.includes(spinner)) return;

  button.classList.replace("requestedButton", "processing");

  button.innerHTML = spinner;
  button.style.transition = "background-color 0.2s ease";
  button.style.backgroundColor = "#555555";

  setTimeout(() => {
    button.style.backgroundColor = "rgb(19, 133, 255)";
    button.classList.remove("processing");
    button.classList.add("followButton");
    button.innerHTML = "Follow";
  }, 1000);
};

const handleFollowingButtonClick = (button: HTMLButtonElement, event: MouseEvent): void => {
  const unfollow = document.getElementById("unfollow") as HTMLElement;
  const unfollowButtonDiv = document.getElementById("unfollowButtonDiv") as HTMLElement;
  const unfollowCancelButtonDiv = document.getElementById("unfollowCancelButtonDiv") as HTMLElement;

  if (
    !checkNull(unfollow, "unfollow") ||
    !checkNull(unfollowButtonDiv, "unfollowButtonDiv") ||
    !checkNull(unfollowCancelButtonDiv, "unfollowCancelButtonDiv")
  )
    return;

  if (button.classList.contains("processing") || button.innerHTML.includes(spinner)) return;

  makeOverlayVisible(event, unfollow);
  button.classList.add("processing");

  const setMouseEffects = (element: HTMLElement): void => {
    element.addEventListener("mouseover", () => {
      element.style.cursor = "pointer";
      element.style.backgroundColor = "#444444";
    });

    element.addEventListener("mousedown", () => {
      element.style.backgroundColor = "#555555";
    });

    element.addEventListener("mouseleave", () => {
      element.style.cursor = "default";
      element.style.backgroundColor = "rgb(53, 53, 53)";
    });
  };

  const handleUnfollowClick = async (event: MouseEvent): Promise<void> => {
    event.stopPropagation();
  
    if (button.classList.contains("processing")) {
      console.log(8);
      hideOverlay(event);
      button.innerHTML = spinner;
  
      await new Promise<void>((resolve) => setTimeout(resolve, 1000));
  
      button.style.backgroundColor = "rgb(19, 133, 255)";
      button.classList.remove("processing");
      button.classList.remove("followingButton");
      button.classList.add("followButton");
      button.innerHTML = "Follow";
    }
  };  

  const handleCancelClick = (event: MouseEvent): void => {
    event.stopPropagation();
    console.log(1);
    hideOverlay(event);
    button.classList.remove("processing");
  };

  unfollowButtonDiv.onclick = (event) => {
    event.stopPropagation(); // Önce event propagation'ı durdur
    handleUnfollowClick(event); // Sonra handleUnfollowClick fonksiyonunu çağır
    console.log(1);
  };
  
  unfollowCancelButtonDiv.onclick = (event) => {
    event.stopPropagation(); // Önce event propagation'ı durdur
    handleCancelClick(event); // Sonra handleCancelClick fonksiyonunu çağır
  };
  


  setMouseEffects(unfollowButtonDiv);
  setMouseEffects(unfollowCancelButtonDiv);
};


const handleFollowButtonClick = (button: HTMLButtonElement): void => {
  if (button.classList.contains("processing") || button.innerHTML.includes(spinner)) return;

  button.style.backgroundColor = "rgb(19, 133, 255)";
  button.style.transition = "background-color 0.2s ease";
  button.classList.replace("followButton", "processing");
  button.innerHTML = spinner;

  setTimeout(() => {
    button.style.backgroundColor = "#555555";
    button.classList.remove("processing");
    button.classList.add("requestedButton");
    button.innerHTML = "Requested";
  }, 1000);
};

const handleButtonClickEvent = (event: MouseEvent): void => {
  const button = event.target as HTMLButtonElement;
  if (button.tagName.toLowerCase() !== "button") return;

  if (button.classList.contains("requestedButton")) {
    handleRequestedButtonClick(button);
  } else if (button.classList.contains("followingButton")) {
    handleFollowingButtonClick(button, event);
  } else if (button.classList.contains("followButton")) {
    handleFollowButtonClick(button);
  }
};

const baseButtonStyles: Record<string, Record<string, string>> = {
  blueButton: {
    mouseover: "rgb(22, 104, 192)",
    mouseout: "rgb(19, 133, 255)",
    mousedown: "rgb(16, 90, 168)",
  },
  grayButton: {
    mouseover: "#444444",
    mouseout: "#555555",
    mousedown: "#333333",
  },
};

const derivedButtonTypes: Record<string, string> = {
  followButton: "blueButton",
  requestedButton: "grayButton",
  followingButton: "grayButton",
};

const handleButtonEvents = (event: MouseEvent): void => {
  const button = event.target as HTMLButtonElement;
  if (!checkNull(button, "button")) return;

  const buttonClass: string | undefined = Object.keys(baseButtonStyles).find((baseClass) =>
    button.classList.contains(baseClass)
  ) || Object.keys(derivedButtonTypes).find((derivedClass) =>
    button.classList.contains(derivedClass)
  );

  if (!buttonClass) return;

  const baseType = baseButtonStyles[buttonClass]
    ? buttonClass
    : derivedButtonTypes[buttonClass];

    if (baseType) {
      const color = baseButtonStyles[baseType]?.[event.type];
      if (color) {
        button.style.backgroundColor = color;
      }
    }
};

export const initializeButtonEvents = (): void => {
  const notificationsTimePeriod = document.querySelector("#notificationsTimePeriod") as HTMLElement;
  if (!checkNull(notificationsTimePeriod, "notificationsTimePeriod")) return;

  document.addEventListener("mouseover", handleButtonEvents);
  document.addEventListener("mouseout", handleButtonEvents);
  document.addEventListener("mousedown", handleButtonEvents);
  document.addEventListener("click", handleButtonClickEvent);
};
