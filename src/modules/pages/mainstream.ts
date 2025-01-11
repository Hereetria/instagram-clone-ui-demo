import { initializeToggleText, toggleOverlayWhileLogin } from "../../shared/components/features/contentSelection.js";
import { adjustPostWidths, initializeCommentLikeItemEvents, initializeLikeEvents, initializePostIconClickEvents, initializeShareEvents, initializeShareNavigationEvents, initializeShowComments, setupTextAreaEventListeners } from "../../shared/components/features/posts.js";
import { setupStoryScrollButtons } from "../../shared/components/features/stories.js";
import { handleLoginButtonClick, handleSwitchButtonClick, initializeOpenLoginPage, toggleShowHide } from "../../shared/components/features/switchAccount.js";
import { adjustNavbarWidth, initializaOpenNavbarSearch } from "../../shared/components/features/navbar.js";
import { initializeCloseButtonListeners } from "../../shared/components/features/modalController.js";

const handleDOMContentLoaded = (): void => {
  setupTextAreaEventListeners();
  setupStoryScrollButtons();
  initializeToggleText();
  toggleOverlayWhileLogin();
  handleSwitchButtonClick();
  toggleShowHide();
  handleLoginButtonClick();
  initializeShareNavigationEvents();
  initializePostIconClickEvents();
  initializeCommentLikeItemEvents();
  initializeShareEvents();
  initializeOpenLoginPage();
  initializeCloseButtonListeners();
  initializaOpenNavbarSearch();
  initializeLikeEvents();
  initializeShowComments();
};

const handleLoad = (): void => {
  adjustPostWidths();
  adjustNavbarWidth();
};

const handleResize = (): void => {
  adjustPostWidths();
  adjustNavbarWidth();
};

document.addEventListener("DOMContentLoaded", handleDOMContentLoaded);
window.addEventListener("load", handleLoad);
window.addEventListener("resize", handleResize);
