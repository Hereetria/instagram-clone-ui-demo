import { initializeToggleText } from "../../shared/components/features/contentSelection.js";
import { adjustPostWidths, initializeClearAllTextareasOnPageLoad, initializeCommentLikeItemEvents, initializeEmojiWheelActions, initializeLikeEvents, initializePostIconClickEvents, initializeReportEvents, initializeShareEvents, initializeShareNavigationEvents, initializeShowComments, setupTextAreaEventListeners } from "../../shared/components/features/posts.js";
import { initializeAdjustStoriesWidth, setupStoryScrollButtons } from "../../shared/components/features/stories.js";
import { handleLoginButtonClick, initializeSwitchLinkEvents, initializeOpenLoginPage, toggleShowHide } from "../../shared/components/features/switchAccount.js";
import { adjustNavbarWidth, initializaOpenNavbarSearch } from "../../shared/components/features/navbar.js";
import { initializeFollowLinkEvents, initializeCloseButtonListeners } from "../../shared/components/features/modalController.js";

const handleDOMContentLoaded = (): void => {
  setupTextAreaEventListeners();
  setupStoryScrollButtons();
  initializeToggleText();
  initializeSwitchLinkEvents();
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
  initializeEmojiWheelActions();
  initializeFollowLinkEvents();
  initializeReportEvents();
};

const handleLoad = (): void => {
  adjustPostWidths();
  adjustNavbarWidth();
  initializeAdjustStoriesWidth();
  initializeClearAllTextareasOnPageLoad();
};

const handleResize = (): void => {
  adjustPostWidths();
  adjustNavbarWidth();
  initializeAdjustStoriesWidth();
};

document.addEventListener("DOMContentLoaded", handleDOMContentLoaded);
window.addEventListener("load", handleLoad);
window.addEventListener("resize", handleResize);
