import checkNull from "../../utils/nullguard.js";

export const initializeAdjustStoriesWidth = () => {
  const stories = document.querySelector("#stories") as HTMLElement;
  if (!checkNull(stories, "stories")) return;

  const windowWidth = window.innerWidth;
  
  if (windowWidth < 630) {
    stories.style.width = `${windowWidth}px`;
  } else {
    stories.style.width = "630px";
  }
};

const scrollContent = (direction: "left" | "right"): void => {
  const scrollContainer = document.getElementById("scrollContainer") as HTMLElement;
  if (!checkNull(scrollContainer, "scrollContainer")) return;

    const scrollValue = direction === "left" ? -150 : 150;
    scrollContainer.scrollBy({
      left: scrollValue,
      behavior: "smooth",
    });
};

export const setupStoryScrollButtons = (): void => {
  const scrollLeftButton = document.getElementById("scrollLeft") as HTMLButtonElement;
  const scrollRightButton = document.getElementById("scrollRight") as HTMLButtonElement;
  if (!checkNull(scrollLeftButton, "scrollLeftButton") || !checkNull(scrollRightButton, "scrollRightButton")) return;

  scrollLeftButton.addEventListener("click", () => scrollContent("left"));
  scrollRightButton.addEventListener("click", () => scrollContent("right"));
};
