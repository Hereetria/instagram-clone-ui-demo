import { loadScript } from "../shared/components/common/scripts.js";
import { clearSearchOnClick, handleSearchbarIconVisibility, initializeClearAllLinkEvents, initSearchedProfileEventListeners, setupClearAllButtonEvents } from "../shared/components/common/search.js";
import { initializeAdjustSidebarState, initializeSidebarSizeWhileClick, initializeSidebarIconEvents } from "../shared/components/common/sidebar.js";
import { initializeButtonEvents } from "../shared/components/features/button.js";
import { initializeNotificationItemEvents } from "../shared/components/common/notification.js";
import { initializePreventDefault } from "../shared/utils/ui.js";
const handleDomContentLoaded = () => {
    loadScript("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js", "sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz", "anonymous");
    handleSearchbarIconVisibility();
    clearSearchOnClick();
    initSearchedProfileEventListeners();
    initializeClearAllLinkEvents();
    setupClearAllButtonEvents();
    initializeSidebarSizeWhileClick();
    initializeNotificationItemEvents();
    initializeButtonEvents();
    initializePreventDefault();
    initializeSidebarIconEvents();
};
const handleLoad = () => {
    initializeAdjustSidebarState();
};
const handleResize = () => {
    initializeAdjustSidebarState();
};
document.addEventListener("DOMContentLoaded", handleDomContentLoaded);
window.addEventListener("load", handleLoad);
window.addEventListener("resize", handleResize);
