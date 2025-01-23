import checkNull from "../../utils/nullguard.js";
import { hideOverlay, makeOverlayVisible } from "../../utils/overlay.js";
import { addCursorToElement, blueElementColors, changeVisibleElement, grayElementColors, grayShinyColors, handleButtonStyleEvents, handleFilterStyleEvents, handleTextStyleEvents, isElementOpen, makeElementHidden, makeElementVisible, setClickActionWithSpinner, toggleElementVisibility, whiteElementColors } from "../../utils/ui.js";
const adjustTextareaHeight = (commentDiv) => {
    const textarea = commentDiv.querySelector(".comment-textarea");
    textarea.style.height = "auto";
    const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight, 10);
    const newHeight = Math.min(textarea.scrollHeight, 80);
    const rows = Math.min(Math.floor(textarea.scrollHeight / lineHeight), 4);
    textarea.style.height = `${Math.max(rows * lineHeight, 40)}px`;
};
const togglePostLinkVisibility = (commentDiv) => {
    const textarea = commentDiv.querySelector(".comment-textarea");
    const postLink = commentDiv.querySelector(".post-link");
    if (!checkNull(postLink, "postLink") || !checkNull(textarea, "textArea"))
        return;
    const isTextEmpty = textarea.value.length === 0;
    if (postLink.classList.contains("willReadonly")) {
        if (isTextEmpty) {
            postLink.style.pointerEvents = "none";
            postLink.style.opacity = "0.5";
        }
        else {
            postLink.style.pointerEvents = "auto";
            postLink.style.opacity = "1";
        }
    }
    else {
        if (isTextEmpty) {
            makeElementHidden(postLink, "d-flex");
        }
        else {
            makeElementVisible(postLink, "d-flex");
        }
    }
};
const handlePostLinkDisplay = (postLink, textArea, openEmojiWheelLink) => {
    const observer = new MutationObserver(() => {
        const currentHeight = parseInt(window.getComputedStyle(textArea).height, 10);
        if (currentHeight > 40) {
            postLink.classList.add("align-items-center");
            openEmojiWheelLink.classList.add("align-items-center");
            openEmojiWheelLink.style.marginTop = "2px";
        }
        else {
            postLink.classList.remove("align-items-center");
            openEmojiWheelLink.classList.remove("align-items-center");
            openEmojiWheelLink.style.marginTop = "5px";
        }
    });
    observer.observe(textArea, {
        attributes: true,
        attributeFilter: ["style"],
    });
};
const handlePostLinkClickActions = (postLink, textArea, div) => {
    postLink.addEventListener("click", () => {
        const postText = postLink.querySelector("span");
        setClickActionWithSpinner(postText);
        textArea.readOnly = true;
        textArea.classList.add("disabled-textarea");
        setTimeout(() => {
            textArea.value = "";
            textArea.readOnly = false;
            textArea.classList.remove("disabled-textarea");
            postLink.style.marginTop = "0px";
            postText.innerHTML = "Post";
            adjustTextareaHeight(div);
        }, 1000);
    });
};
export const setupTextAreaEventListeners = () => {
    const commentDivs = document.querySelectorAll(".commentDiv");
    const postLinks = document.querySelectorAll(".post-link");
    if (!checkNull(commentDivs, "commentDiv") || !checkNull(postLinks, "postLink"))
        return;
    commentDivs.forEach((div) => {
        const postLink = div.querySelector(".post-link");
        const textArea = div.querySelector(".comment-textarea");
        const openEmojiWheelLink = div.querySelector(".openEmojiWheelLink");
        handleTextStyleEvents(postLink, blueElementColors);
        handlePostLinkDisplay(postLink, textArea, openEmojiWheelLink);
        handlePostLinkClickActions(postLink, textArea, div);
        div.addEventListener("input", () => {
            adjustTextareaHeight(div);
            togglePostLinkVisibility(div);
        });
    });
};
const getScrollbarWidth = () => {
    const hasScrollbar = window.innerWidth > document.documentElement.clientWidth;
    return hasScrollbar ? window.innerWidth - document.documentElement.clientWidth : 0;
};
const adjustWrapperWidth = () => {
    const wrapper = document.querySelector(".full-screen-wrapper");
    if (!checkNull(wrapper, "wrapper"))
        return;
    const scrollbarWidth = getScrollbarWidth();
    wrapper.style.width = `calc(100vw - ${scrollbarWidth ? 17 : 0}px)`;
};
const adjustShareProfileWidth = () => {
    const shareProfile = document.getElementById("shareProfile");
    if (!checkNull(shareProfile, "shareProfile"))
        return;
    const scrollbarWidth = getScrollbarWidth();
    shareProfile.style.width = `calc(100% - ${scrollbarWidth}px)`;
};
const makeResponsiveShareProfile = () => {
    const shareProfile = document.getElementById("shareProfile");
    if (!checkNull(shareProfile, "shareProfile"))
        return;
    let elementCount = shareProfile.querySelectorAll(".shareProfileElement").length;
    const pageWidth = window.innerWidth;
    let elementCountPerRow;
    if (pageWidth < 449) {
        elementCountPerRow = 3;
    }
    else if (pageWidth < 549) {
        elementCountPerRow = 4;
    }
    else {
        elementCountPerRow = 5;
    }
    const willAddElementCount = elementCountPerRow - (elementCount % elementCountPerRow);
    let shadowArticleCount = shareProfile.querySelectorAll(".shadowArticle").length;
    while (shadowArticleCount !== willAddElementCount) {
        if (shadowArticleCount > willAddElementCount) {
            const elementToRemove = shareProfile.querySelector(".shadowArticle");
            if (elementToRemove) {
                shareProfile.removeChild(elementToRemove);
                shadowArticleCount--;
            }
        }
        else {
            const article = document.createElement("article");
            article.style.height = "130px";
            const newDiv = document.createElement("div");
            newDiv.classList.add("d-flex", "pt-1");
            newDiv.style.width = "100px";
            newDiv.style.height = "130px";
            article.appendChild(newDiv);
            article.classList.add("shadowArticle");
            shareProfile.appendChild(article);
            shadowArticleCount++;
        }
    }
};
const commentContainer = document.getElementById("commentContainer");
const adjustCommentWidth = () => {
    const screenWidth = window.innerWidth;
    const screenMaxWidth = window.screen.width;
    if (!checkNull(commentContainer, "commentContainer"))
        return;
    const minThreshold = screenMaxWidth * 0.2;
    const maxThreshold = screenMaxWidth * 0.7;
    if (screenWidth <= maxThreshold && screenWidth >= minThreshold) {
        const scaleFactor = (screenWidth - minThreshold) / (maxThreshold - minThreshold);
        commentContainer.style.height = `${95 * scaleFactor}%`;
    }
    else {
        commentContainer.style.height = screenWidth < minThreshold ? "20%" : "95%";
    }
    const overlayContainer = document.getElementById("overlayContainer");
    const commentPost = document.querySelector("#commentPost");
    const commentMiniPost = document.querySelector("#commentMiniPost");
    const comments = document.querySelector("#comments");
    const commentContainerExpander = document.querySelector("#commentContainerExpander");
    if (!checkNull(commentPost, "commentPost") || !checkNull(commentMiniPost, "commentMiniPost") ||
        !checkNull(comments, "comments") || !checkNull(commentContainerExpander, "commentContainerExpander") ||
        !checkNull(overlayContainer, "overlayContainer"))
        return;
    if (overlayContainer.style.visibility === "visible") {
        if (screenWidth <= 680) {
            commentContainer.style.height = "660px";
            commentContainer.style.minHeight = "660px";
            commentContainer.style.width = "335px";
            commentContainer.classList.remove("ms-auto");
            commentMiniPost.style.width = "100%";
            makeElementHidden(comments, "d-block");
            makeElementHidden(commentContainerExpander, "d-flex");
            changeVisibleElement(commentPost, commentMiniPost, "d-flex");
        }
        else {
            commentContainer.style.height = "95%";
            commentContainer.style.minHeight = "400px";
            commentContainer.style.width = "87%";
            commentContainer.classList.add("ms-auto");
            commentMiniPost.style.width = "55%";
            makeElementVisible(comments, "d-flex");
            makeElementVisible(commentContainerExpander, "d-block");
            changeVisibleElement(commentMiniPost, commentPost, "d-flex");
        }
    }
};
const emojiWheels = document.querySelectorAll(".emojiWheel");
const adjustEmojiWheelPosition = () => {
    if (!checkNull(emojiWheels, "emojiWheel"))
        return;
    emojiWheels.forEach((wheel) => {
        const pageWidth = window.innerWidth;
        if (pageWidth <= 865 && pageWidth > 800) {
            wheel.style.right = `-${167 - ((865 - pageWidth) / 2)}px`;
        }
        else if (pageWidth <= 800 && pageWidth > 770) {
            wheel.style.right = `-167px`;
        }
        else if (pageWidth <= 770) {
            wheel.style.right = `-${167 - ((770 - pageWidth) / 2)}px`;
        }
    });
};
export const adjustPostWidths = () => {
    adjustWrapperWidth();
    adjustShareProfileWidth();
    makeResponsiveShareProfile();
    adjustCommentWidth();
    adjustEmojiWheelPosition();
};
const addShareMouseEvents = (element, link) => {
    element.style.cursor = "pointer";
    element.addEventListener("mousedown", () => {
        element.style.backgroundColor = "rgb(71, 71, 71)";
    });
    element.addEventListener("mouseup", () => {
        element.style.backgroundColor = "rgb(53, 53, 53)";
    });
    element.addEventListener("mouseleave", () => {
        element.style.backgroundColor = "rgb(53, 53, 53)";
    });
    element.addEventListener("click", () => {
        window.open(link, "_blank");
    });
};
export const initializeShareNavigationEvents = () => {
    const shareNavigationCopyLink = document.getElementById("shareNavigationCopyLink");
    const shareNavigationFacebook = document.getElementById("shareNavigationFacebook");
    const shareNavigationMessenger = document.getElementById("shareNavigationMessenger");
    const shareNavigationWhatsApp = document.getElementById("shareNavigationWhatsApp");
    const shareNavigationEmail = document.getElementById("shareNavigationEmail");
    const shareNavigationThreads = document.getElementById("shareNavigationThreads");
    const shareNavigationX = document.getElementById("shareNavigationX");
    if (!checkNull(shareNavigationCopyLink, "shareNavigationCopyLink") ||
        !checkNull(shareNavigationFacebook, "shareNavigationFacebook") ||
        !checkNull(shareNavigationMessenger, "shareNavigationMessenger") ||
        !checkNull(shareNavigationWhatsApp, "shareNavigationWhatsApp") ||
        !checkNull(shareNavigationEmail, "shareNavigationEmail") ||
        !checkNull(shareNavigationThreads, "shareNavigationThreads") ||
        !checkNull(shareNavigationX, "shareNavigationX"))
        return;
    addShareMouseEvents(shareNavigationCopyLink, "");
    addShareMouseEvents(shareNavigationFacebook, "https://facebook.com");
    addShareMouseEvents(shareNavigationMessenger, "https://messenger.com");
    addShareMouseEvents(shareNavigationWhatsApp, "https://whatsapp.com");
    addShareMouseEvents(shareNavigationEmail, "mailto:someone@example.com");
    addShareMouseEvents(shareNavigationThreads, "https://threads.com");
    addShareMouseEvents(shareNavigationX, "https://twitter.com");
};
const showComments = (event) => {
    const commentContainer = document.getElementById("commentContainer");
    if (!checkNull(commentContainer, "commentContainer"))
        return;
    makeOverlayVisible(event, commentContainer);
};
const handleIconClickEvents = (container, index) => {
    const share = document.getElementById("share");
    const likeItem = container.querySelector(".likeItem");
    const commentItem = container.querySelector(".commentItem");
    const shareItem = container.querySelector(".shareItem");
    const saveItem = container.querySelector(".saveItem");
    likeItem.querySelectorAll("img").forEach((img) => {
        img.addEventListener("click", () => {
            const likeIcon = likeItem.querySelector(".likeIcon");
            const likedIcon = likeItem.querySelector(".likedIcon");
            if (!checkNull(likeIcon, "likeIcon") || !checkNull(likedIcon, "likedIcon"))
                return;
            toggleElementVisibility(likeIcon, "d-inline");
            toggleElementVisibility(likedIcon, "d-inline");
        });
    });
    commentItem.querySelectorAll("img").forEach((img) => {
        img.addEventListener("click", showComments);
    });
    shareItem.querySelectorAll("img").forEach((img) => {
        img.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            makeOverlayVisible(event, share);
        });
    });
    saveItem.querySelectorAll("img").forEach((img) => {
        img.addEventListener("click", () => {
            const saveIcon = saveItem.querySelector(".saveIcon");
            const savedIcon = saveItem.querySelector(".savedIcon");
            if (!checkNull(saveIcon, "saveIcon") || !checkNull(savedIcon, "savedIcon"))
                return;
            toggleElementVisibility(saveIcon, "d-inline");
            toggleElementVisibility(savedIcon, "d-inline");
        });
    });
    [likeItem, commentItem, shareItem, saveItem,].forEach((item) => {
        const images = item.querySelectorAll("img");
        images.forEach((img) => {
            addCursorToElement(img, "pointer");
            handleFilterStyleEvents(img);
        });
    });
};
export const initializePostIconClickEvents = () => {
    const iconsContainer = document.querySelectorAll(".iconsContainer");
    if (!checkNull(iconsContainer, "iconsContainer"))
        return;
    iconsContainer.forEach((container, index) => {
        handleIconClickEvents(container, index);
    });
};
const toggleCommentIcon = (event) => {
    const commentLikeItem = event.target.closest(".commentLikeItem");
    if (!checkNull(commentLikeItem, "commentLikeItem"))
        return;
    const likeIcon = commentLikeItem.querySelector(".likeIcon");
    const likedIcon = commentLikeItem.querySelector(".likedIcon");
    if (!checkNull(likeIcon, "likeIcon") || !checkNull(likedIcon, "likedIcon"))
        return;
    toggleElementVisibility(likeIcon, "d-inline");
    toggleElementVisibility(likedIcon, "d-inline");
};
export const initializeCommentLikeItemEvents = () => {
    if (!checkNull(commentContainer, "commentContainer"))
        return;
    const commentLikeItems = document.querySelectorAll(".commentLikeItem");
    if (!commentLikeItems)
        return;
    commentLikeItems.forEach((item) => {
        const imgItems = item.querySelectorAll("img");
        if (imgItems) {
            imgItems.forEach((img) => {
                handleFilterStyleEvents(img);
                img.addEventListener("click", (event) => {
                    toggleCommentIcon(event);
                });
            });
        }
    });
};
const getShareButtonText = (selectedItems) => selectedItems > 1 ? "Send Separately" : "Send";
const updateShareUI = () => {
    const selectedItems = document.querySelectorAll(".sharePostItem .checkedIcon.d-inline");
    const selectedItemCount = selectedItems.length > 0 ? selectedItems.length : 0;
    const shareNavigationContainer = document.getElementById("shareNavigationContainer");
    const shareFormContainer = document.getElementById("shareFormContainer");
    const shareButton = document.getElementById("shareButton");
    if (!checkNull(shareNavigationContainer, "shareNavigationContainer") ||
        !checkNull(shareFormContainer, "shareFormContainer") ||
        !checkNull(shareButton, "shareButton"))
        return;
    shareNavigationContainer.classList.toggle("d-flex", selectedItemCount === 0);
    shareNavigationContainer.classList.toggle("d-none", selectedItemCount > 0);
    shareFormContainer.classList.toggle("d-flex", selectedItemCount >= 1);
    shareFormContainer.classList.toggle("d-none", selectedItemCount < 1);
    shareButton.classList.toggle("d-flex", selectedItemCount >= 1);
    shareButton.classList.toggle("d-none", selectedItemCount < 1);
    shareButton.innerHTML = getShareButtonText(selectedItemCount);
    shareButton.addEventListener("click", (event) => {
        hideOverlay(event);
    });
    const share = document.querySelector("#share");
    if (!checkNull(share, "share"))
        return;
    const observer = new MutationObserver(() => {
        if (share.classList.contains("d-none")) {
            makeElementHidden(shareFormContainer, "d-flex");
            makeElementVisible(shareNavigationContainer, "d-flex");
            selectedItems.forEach((item) => {
                makeElementHidden(item, "d-inline");
            });
        }
    });
    observer.observe(share, {
        attributes: true,
        attributeFilter: ["class"],
    });
};
export const initializeShareEvents = () => {
    const sharePostItems = document.querySelectorAll(".sharePostItem");
    const shareButton = document.querySelector("#shareButton");
    if (!checkNull(sharePostItems, "sharePostItems") || !checkNull(shareButton, "shareButton"))
        return;
    sharePostItems.forEach((item) => {
        item.style.cursor = "pointer";
        item.addEventListener("click", () => {
            const checkedIcon = item.querySelector(".checkedIcon");
            if (checkedIcon) {
                toggleElementVisibility(checkedIcon, "d-inline");
                updateShareUI();
            }
        });
    });
};
export const initializeLikeEvents = () => {
    const likes = document.querySelector("#likesContainer");
    const likesLinks = document.querySelectorAll(".likesLink");
    if (!checkNull(likes, "likes") || !checkNull(likesLinks, "likesLink"))
        return;
    likesLinks.forEach((link) => {
        const text = link.querySelector("span");
        handleTextStyleEvents(text, whiteElementColors);
        text.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            makeOverlayVisible(event, likes);
        });
    });
};
export const initializeShowComments = () => {
    const viewCommentLinks = document.querySelectorAll(".viewCommentLink");
    if (!checkNull(viewCommentLinks, "viewCommentLink"))
        return;
    viewCommentLinks.forEach((link) => {
        const text = link.querySelector("span");
        handleTextStyleEvents(text, grayElementColors);
        link.addEventListener("click", showComments);
    });
};
const commentDivs = document.querySelectorAll(".commentDiv");
const handleEmojiWheelOpen = () => {
    if (!checkNull(emojiWheels, "emojiWheel"))
        return;
    commentDivs.forEach((div) => {
        const emojiWheel = div.querySelector(".emojiWheel");
        const openEmojiWheelIcon = div.querySelector(".openEmojiWheelIcon");
        if (!checkNull(emojiWheel, "emojiWheel") || !checkNull(openEmojiWheelIcon, "openEmojiWheelIcon"))
            return;
        handleFilterStyleEvents(openEmojiWheelIcon);
        openEmojiWheelIcon.addEventListener("click", () => {
            toggleElementVisibility(emojiWheel, "d-grid");
        });
        document.addEventListener("click", (event) => {
            commentDivs.forEach((div) => {
                const emojiWheel = div.querySelector(".emojiWheel");
                const openEmojiWheelIcon = div.querySelector(".openEmojiWheelIcon");
                if (!checkNull(emojiWheel, "emojiWheel") || !checkNull(openEmojiWheelIcon, "openEmojiWheelIcon"))
                    return;
                if (!emojiWheel.contains(event.target) &&
                    (!openEmojiWheelIcon.contains(event.target))) {
                    if (isElementOpen(emojiWheel)) {
                        makeElementHidden(emojiWheel, "d-grid");
                    }
                }
            });
        });
    });
};
const insertEmojiToTextArea = () => {
    if (!checkNull(commentDivs, "commentDiv"))
        return;
    commentDivs.forEach((div) => {
        const emojiWheel = div.querySelector(".emojiWheel");
        const commentTextarea = div.querySelector(".comment-textarea");
        if (!checkNull(emojiWheel, "emojiWheel") || !checkNull(commentTextarea, "commentTextarea"))
            return;
        const emojis = emojiWheel.querySelectorAll(".emoji");
        emojis.forEach((emoji) => {
            emoji.addEventListener("click", () => {
                commentTextarea.value += emoji.textContent;
                togglePostLinkVisibility(div);
                adjustTextareaHeight(div);
            });
        });
    });
};
export const initializeEmojiWheelActions = () => {
    handleEmojiWheelOpen();
    insertEmojiToTextArea();
};
export const initializeClearAllTextareasOnPageLoad = () => {
    const textAreas = document.querySelectorAll("textarea");
    if (!checkNull(textAreas, "textArea"))
        return;
    textAreas.forEach((textarea) => {
        textarea.value = "";
    });
};
export const initializeReportEvents = () => {
    const report = document.getElementById("report");
    const reportIconLinks = document.querySelectorAll(".reportIconLink ");
    const reportItems = report.querySelectorAll('.report-item');
    if (!checkNull(report, "report") ||
        !checkNull(reportIconLinks, "reportIconLinks") ||
        !checkNull(reportItems, "reportItems"))
        return;
    reportItems.forEach((item) => {
        addCursorToElement(item, "pointer");
        handleButtonStyleEvents(item, grayShinyColors);
        item.addEventListener("click", (event) => hideOverlay(event));
    });
    reportIconLinks.forEach((link) => {
        const icon = link.querySelector("i");
        if (!checkNull(icon, "icon"))
            return;
        handleTextStyleEvents(icon, whiteElementColors);
        link.addEventListener("click", (event) => {
            event.preventDefault();
            event.stopPropagation();
            makeOverlayVisible(event, report);
        });
    });
};
