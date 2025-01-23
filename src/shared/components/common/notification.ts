import checkNull from "../../utils/nullguard.js";

const notificationItems = document.querySelectorAll<HTMLElement>(".notificationItem");

const handleNotificationItemEvents = (item: HTMLElement): void => {
  

      item.addEventListener("mousedown", () => {
        item.style.transition = "filter 0.3s ease, opacity 0.3s ease";
        item.style.filter = "brightness(0.8)";
        item.style.opacity = "0.7";
      });
  
      item.addEventListener("mouseup", () => {
        item.style.filter = "";
        item.style.opacity = "";
      });
  
      item.addEventListener("mouseleave", () => {
        item.style.filter = "";
        item.style.opacity = "";
      });
  
      item.addEventListener("mouseover", () => {
        item.style.cursor = "pointer";
        item.style.backgroundColor = "rgb(55, 63, 68)";
      });
  
      item.addEventListener("mouseout", () => {
        item.style.cursor = "default";
        item.style.backgroundColor = "rgb(33, 37, 41)";
      });
    };
  
export const initializeNotificationItemEvents = () => {
    if (!checkNull(notificationItems, "notificationItems")) return;
    notificationItems.forEach((item) => {
        handleNotificationItemEvents(item)
    })
};