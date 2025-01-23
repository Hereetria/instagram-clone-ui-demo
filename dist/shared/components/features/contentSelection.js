import checkNull from "../../utils/nullguard.js";
export const initializeToggleText = () => {
    const toggleText = document.getElementById("toggleText");
    if (!checkNull(toggleText, "toggleText"))
        return;
    toggleText.addEventListener("click", () => {
        toggleText.textContent =
            toggleText.textContent === "For you" ? "Following" : "For you";
    });
};
