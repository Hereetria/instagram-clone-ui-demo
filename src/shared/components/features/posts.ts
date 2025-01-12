import checkNull from "../../utils/nullguard.js";
import { hideOverlay, makeOverlayVisible } from "../../utils/overlay.js";
import { changeVisibleElement, isElementOpen, makeElementHidden, makeElementVisible, setBackgroundColor, spinner, toggleElementClass, toggleElementVisibility } from "../../utils/ui.js";

const adjustTextareaHeight = (commentDiv: HTMLElement): void => {
  const textarea = commentDiv.querySelector(".comment-textarea") as HTMLTextAreaElement;
  textarea.style.height = "auto";
  
  const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight, 10); 
  const newHeight = Math.min(textarea.scrollHeight, 80);
  const rows = Math.min(Math.floor(textarea.scrollHeight / lineHeight), 4);
  
  textarea.style.height = `${Math.max(rows * lineHeight, 40)}px`;
};

const togglePostLinkVisibility = (commentDiv: HTMLElement): void => {
  const textarea = commentDiv.querySelector(".comment-textarea") as HTMLTextAreaElement;
  const postLink = commentDiv.querySelector(".post-link") as HTMLAnchorElement;
  if (!checkNull(postLink, "postLink") || !checkNull(textarea, "textArea")) return;

  const isTextEmpty = textarea.value.length === 0;
  if (postLink.classList.contains("willReadonly")) {
    if (isTextEmpty) {
      postLink.style.pointerEvents = "none";
      postLink.style.opacity = "0.5";
    } else {
      postLink.style.pointerEvents = "auto";
      postLink.style.opacity = "1";
    }
  } else {
    if (isTextEmpty) {
      makeElementHidden(postLink, "d-flex");
    } else {
      makeElementVisible(postLink, "d-flex");
    }
  }
};



export const setupTextAreaEventListeners = (): void => {
  const commentDivs = document.querySelectorAll<HTMLElement>(".commentDiv");
  if (!checkNull(commentDivs, "commentDiv")) return;

    commentDivs.forEach((div: HTMLElement) => {
      div.addEventListener("input", () => {
        adjustTextareaHeight(div)
        togglePostLinkVisibility(div);
      });
    });

};


const getScrollbarWidth = (): number => {
  const hasScrollbar = window.innerWidth > document.documentElement.clientWidth;
  return hasScrollbar ? window.innerWidth - document.documentElement.clientWidth : 0;
};

const adjustWrapperWidth = (): void => {
  const wrapper = document.querySelector(".full-screen-wrapper") as HTMLElement;
  if (!checkNull(wrapper, "wrapper")) return;
    const scrollbarWidth = getScrollbarWidth();
    wrapper.style.width = `calc(100vw - ${scrollbarWidth ? 17 : 0}px)`;
};

const adjustShareProfileWidth = (): void => {
  const shareProfile = document.getElementById("shareProfile") as HTMLElement;
  if (!checkNull(shareProfile, "shareProfile")) return;

    const scrollbarWidth = getScrollbarWidth();
    shareProfile.style.width = `calc(100% - ${scrollbarWidth}px)`;

};


const makeResponsiveShareProfile = (): void => {
  const shareProfile = document.getElementById("shareProfile") as HTMLElement;
  if (!checkNull(shareProfile, "shareProfile")) return;

  let elementCount: number = shareProfile.querySelectorAll(".shareProfileElement").length;
  const pageWidth: number = window.innerWidth;
  let elementCountPerRow: number;

  if (pageWidth < 449) {
    elementCountPerRow = 3;
  } else if (pageWidth < 549) {
    elementCountPerRow = 4;
  } else {
    elementCountPerRow = 5
  }
  const willAddElementCount = elementCountPerRow - (elementCount % elementCountPerRow);

  let shadowArticleCount: number = shareProfile.querySelectorAll(".shadowArticle").length;

  while (shadowArticleCount !== willAddElementCount) {
    if (shadowArticleCount > willAddElementCount) {
      const elementToRemove = shareProfile.querySelector(".shadowArticle");
      if (elementToRemove) {
        shareProfile.removeChild(elementToRemove);
        shadowArticleCount--;
      }
    } else {
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


const commentContainer = document.getElementById("commentContainer") as HTMLElement;

const adjustCommentWidth = (): void => {
  const screenWidth = window.innerWidth;
  const screenMaxWidth = window.screen.width;
  if (!checkNull(commentContainer, "commentContainer"))
    return;

  const minThreshold = screenMaxWidth * 0.2;
  const maxThreshold = screenMaxWidth * 0.7;

  if (screenWidth <= maxThreshold && screenWidth >= minThreshold) {
    const scaleFactor = (screenWidth - minThreshold) / (maxThreshold - minThreshold);
    commentContainer.style.height = `${95 * scaleFactor}%`;
  } else {
    commentContainer.style.height = screenWidth < minThreshold ? "20%" : "95%";
  }

  const overlayContainer = document.getElementById("overlayContainer") as HTMLElement;
  const commentPost = document.querySelector("#commentPost") as HTMLElement;
  const commentMiniPost = document.querySelector("#commentMiniPost") as HTMLElement
  const comments = document.querySelector("#comments") as HTMLElement;
  const commentContainerExpander = document.querySelector("#commentContainerExpander") as HTMLElement;
  if(!checkNull(commentPost, "commentPost") || !checkNull(commentMiniPost, "commentMiniPost") ||
   !checkNull(comments, "comments") || !checkNull(commentContainerExpander, "commentContainerExpander") ||
   !checkNull(overlayContainer, "overlayContainer")) return;
  

  if (overlayContainer.style.visibility === "visible") {
    if (screenWidth <= 680) {
      commentContainer.style.height = "660px";
      commentContainer.style.minHeight = "660px";
      commentContainer.style.width = "335px";
      commentContainer.classList.remove("ms-auto");
      commentMiniPost.style.width = "100%";
      makeElementHidden(comments, "d-block")
      makeElementHidden(commentContainerExpander, "d-flex")
      changeVisibleElement(commentPost, commentMiniPost, "d-flex");
    } else {
      commentContainer.style.height = "95%";
      commentContainer.style.minHeight = "400px";
      commentContainer.style.width = "87%";
      commentContainer.classList.add("ms-auto");
      commentMiniPost.style.width = "55%";
      makeElementVisible(comments, "d-flex")
      makeElementVisible(commentContainerExpander, "d-block")
      changeVisibleElement(commentMiniPost, commentPost, "d-flex");
    }
  }
};

const emojiWheels = document.querySelectorAll<HTMLElement>(".emojiWheel");

const adjustEmojiWheelPosition = () => {
  // Null kontrolü yapılıyor
  if (!checkNull(emojiWheels, "emojiWheel")) return;
  
  emojiWheels.forEach((wheel) => {
    const pageWidth = window.innerWidth;

    if (pageWidth <= 865 && pageWidth > 800) {
      console.log(`-${(865 - pageWidth)}px`)
      console.log(`-${167 - (865 - pageWidth)}px`)
      wheel.style.right = `-${167 - ((865 - pageWidth) / 2)}px`;

    } 
    else if (pageWidth <= 800 && pageWidth > 770) {
      wheel.style.right = `-167px`;
    } else if (pageWidth <= 770){
      wheel.style.right = `-${167 - ((770 - pageWidth) / 2)}px`;
    }
  });
};

export const adjustPostWidths = (): void => {
  adjustWrapperWidth();
  adjustShareProfileWidth();
  makeResponsiveShareProfile();
  adjustCommentWidth();
  adjustEmojiWheelPosition();
};

const addShareMouseEvents = (element: HTMLElement, link: string): void => {
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
  const shareNavigationCopyLink = document.getElementById("shareNavigationCopyLink") as HTMLElement;
  const shareNavigationFacebook = document.getElementById("shareNavigationFacebook") as HTMLElement;
  const shareNavigationMessenger = document.getElementById("shareNavigationMessenger") as HTMLElement;
  const shareNavigationWhatsApp = document.getElementById("shareNavigationWhatsApp") as HTMLElement;
  const shareNavigationEmail = document.getElementById("shareNavigationEmail") as HTMLElement;
  const shareNavigationThreads = document.getElementById("shareNavigationThreads") as HTMLElement;
  const shareNavigationX = document.getElementById("shareNavigationX") as HTMLElement;

  if (
    !checkNull(shareNavigationCopyLink, "shareNavigationCopyLink") ||
    !checkNull(shareNavigationFacebook, "shareNavigationFacebook") ||
    !checkNull(shareNavigationMessenger, "shareNavigationMessenger") ||
    !checkNull(shareNavigationWhatsApp, "shareNavigationWhatsApp") ||
    !checkNull(shareNavigationEmail, "shareNavigationEmail") ||
    !checkNull(shareNavigationThreads, "shareNavigationThreads") ||
    !checkNull(shareNavigationX, "shareNavigationX")
  )
    return;

  addShareMouseEvents(shareNavigationCopyLink, "");
  addShareMouseEvents(shareNavigationFacebook, "https://facebook.com");
  addShareMouseEvents(shareNavigationMessenger, "https://messenger.com");
  addShareMouseEvents(shareNavigationWhatsApp, "https://whatsapp.com");
  addShareMouseEvents(shareNavigationEmail, "mailto:someone@example.com");
  addShareMouseEvents(shareNavigationThreads, "https://threads.com");
  addShareMouseEvents(shareNavigationX, "https://twitter.com");
};

const showComments = (event: MouseEvent) => {
  const commentContainer = document.getElementById("commentContainer") as HTMLElement;
  if(!checkNull(commentContainer, "commentContainer")) return;

makeOverlayVisible(event, commentContainer);
}

const handleIconClickEvents = (container: HTMLElement, index: number): void => {
  const share = document.getElementById("share") as HTMLElement;

  const likeItem = container.querySelector(".likeItem") as HTMLElement;
  const commentItem = container.querySelector(".commentItem") as HTMLElement;
  const shareItem = container.querySelector(".shareItem") as HTMLElement;
  const saveItem = container.querySelector(".saveItem") as HTMLElement;

  likeItem.addEventListener("click", () => {
    const likeIcon = likeItem.querySelector(".likeIcon") as HTMLElement;
    const likedIcon = likeItem.querySelector(".likedIcon") as HTMLElement;
    if (!checkNull(likeIcon, "likeIcon") || !checkNull(likedIcon, "likedIcon")) return;

    toggleElementVisibility(likeIcon, "d-inline");
    toggleElementVisibility(likedIcon, "d-inline");
  });

  commentItem.addEventListener("click", showComments);

  shareItem.addEventListener("click", (event: MouseEvent) => makeOverlayVisible(event, share));


  saveItem.addEventListener("click", () => {
    const saveIcon = saveItem.querySelector(".saveIcon") as HTMLElement;
    const savedIcon = saveItem.querySelector(".savedIcon") as HTMLElement;
    if (!checkNull(saveIcon, "saveIcon") || !checkNull(savedIcon, "savedIcon")) return;

    toggleElementVisibility(saveIcon, "d-inline");
    toggleElementVisibility(savedIcon, "d-inline");
  });

  [likeItem, commentItem, shareItem, saveItem].forEach((item) => {
    const img = item.querySelector("img") as HTMLImageElement;

    item.addEventListener("mouseover", () => {
      item.style.cursor = "pointer";
      img.style.filter = "brightness(70%)";
    });
    //
    item.addEventListener("mouseout", () => {
      img.style.filter = "brightness(100%)";
    });
  });
};

export const initializePostIconClickEvents = (): void => {
  const iconsContainer = document.querySelectorAll(".iconsContainer") as NodeListOf<HTMLElement>;

  if (!checkNull(iconsContainer, "iconsContainer")) return;

  iconsContainer.forEach((container: HTMLElement, index: number) => {
    handleIconClickEvents(container, index);
  });
};

const toggleCommentIcon = (event: MouseEvent): void => {
  const commentLikeItem = (event.target as HTMLElement).closest(".commentLikeItem") as HTMLElement;
  if (!checkNull(commentLikeItem, "commentLikeItem")) return;

  const likeIcon = commentLikeItem.querySelector(".likeIcon") as HTMLElement;
  const likedIcon = commentLikeItem.querySelector(".likedIcon") as HTMLElement;
  if (!checkNull(likeIcon, "likeIcon") || !checkNull(likedIcon, "likedIcon")) return;

  toggleElementVisibility(likeIcon, "d-inline");
  toggleElementVisibility(likedIcon, "d-inline");
};

export const initializeCommentLikeItemEvents = () => {
  if (!checkNull(commentContainer, "commentContainer")) return;

  const commentLikeItems = document.querySelectorAll<HTMLElement>(".commentLikeItem");
  if (!checkNull(commentLikeItems, "commentLikeItem")) return;

  
  commentLikeItems.forEach((item:HTMLElement) => {
    const imgItems= item.querySelectorAll<HTMLImageElement>("img");
    if (imgItems) {
      imgItems.forEach((img:HTMLImageElement) => {
        img.addEventListener("click", (event: MouseEvent) => {
          toggleCommentIcon(event);
        });   
      })
    } 
  })
};

const getShareButtonText = (selectedItems: number): string =>
  selectedItems > 1 ? "Send Separately" : "Send";

const updateShareUI = (): void => {
  const selectedItems = document.querySelectorAll<HTMLElement>(".sharePostItem .checkedIcon.d-inline");
const selectedItemCount: number = selectedItems.length > 0 ? selectedItems.length : 0;

  const shareNavigationContainer = document.getElementById("shareNavigationContainer") as HTMLElement;
  const shareFormContainer = document.getElementById("shareFormContainer") as HTMLElement;
  const shareButton = document.getElementById("shareButton") as HTMLElement;

  if (
    !checkNull(shareNavigationContainer, "shareNavigationContainer") ||
    !checkNull(shareFormContainer, "shareFormContainer") ||
    !checkNull(shareButton, "shareButton")
  ) return;

  shareNavigationContainer.classList.toggle("d-flex", selectedItemCount === 0);
  shareNavigationContainer.classList.toggle("d-none", selectedItemCount > 0);

  shareFormContainer.classList.toggle("d-flex", selectedItemCount >= 1);
  shareFormContainer.classList.toggle("d-none", selectedItemCount < 1);

  shareButton.classList.toggle("d-flex", selectedItemCount >= 1);
  shareButton.classList.toggle("d-none", selectedItemCount < 1);

  shareButton.innerHTML = getShareButtonText(selectedItemCount);

  shareButton.addEventListener("click", (event: MouseEvent) => {
    hideOverlay(event);
  });

  const share = document.querySelector("#share") as HTMLElement;
  if (!checkNull(share, "share")) return;
  
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
  const sharePostItems = document.querySelectorAll<HTMLElement>(".sharePostItem");
  const shareButton = document.querySelector("#shareButton") as HTMLButtonElement;
  if (!checkNull(sharePostItems, "sharePostItems") || !checkNull(shareButton, "shareButton")) return;

  sharePostItems.forEach((item) => {
    item.style.cursor = "pointer";
    item.addEventListener("click", () => {
      const checkedIcon = item.querySelector(".checkedIcon") as HTMLElement;
      if (checkedIcon) {
        toggleElementVisibility(checkedIcon, "d-inline");
        updateShareUI();
        
      }
    });
  });
};

export const initializeLikeEvents= () => {
  const likes = document.querySelector("#likesContainer") as HTMLElement;
  const likesTexts = document.querySelectorAll<HTMLElement>(".likesText");
  if (!checkNull(likes, "likes") || !checkNull(likesTexts, "likeText")) return;

  likesTexts.forEach((text: HTMLElement) => {
    text.addEventListener("click", (event: MouseEvent): void => {
    makeOverlayVisible(event,likes);
    })
  })
}

export const initializeShowComments = () => {
  const viewCommentLinks = document.querySelectorAll<HTMLElement>(".viewCommentLink");
  if (!checkNull(viewCommentLinks, "viewCommentLink")) return;

  viewCommentLinks.forEach((link: HTMLElement) => {
    link.addEventListener("click", showComments);
  })
}

const commentDivs = document.querySelectorAll<HTMLElement>(".commentDiv");

const handleEmojiWheelOpen = () => {
  if(!checkNull(emojiWheels, "emojiWheel")) return;

  commentDivs.forEach((div) => {
    const emojiWheel = div.querySelector(".emojiWheel") as HTMLElement
    const openEmojiWheelIcon = div.querySelector(".openEmojiWheelIcon") as HTMLTextAreaElement
    if(!checkNull(emojiWheel, "emojiWheel") || !checkNull(openEmojiWheelIcon, "openEmojiWheelIcon")) return;

    openEmojiWheelIcon.addEventListener("click", () => {
      toggleElementVisibility(emojiWheel, "d-grid");
    });


    document.addEventListener("click", (event) => {
      commentDivs.forEach((div) => {
        const emojiWheel = div.querySelector(".emojiWheel") as HTMLElement;
        const openEmojiWheelIcon = div.querySelector(".openEmojiWheelIcon") as HTMLTextAreaElement;
        if (!checkNull(emojiWheel, "emojiWheel") || !checkNull(openEmojiWheelIcon, "openEmojiWheelIcon")) return;
        if (
          !emojiWheel.contains(event.target as Node) &&
          (!openEmojiWheelIcon.contains(event.target as Node))
        )  {
          if (isElementOpen(emojiWheel)) {
            makeElementHidden(emojiWheel, "d-grid");
          }
        }
      });
    });
  })
}

const insertEmojiToTextArea = () => {
  if (!checkNull(commentDivs, "commentDiv")) return;

  commentDivs.forEach((div) => {
    const emojiWheel = div.querySelector(".emojiWheel") as HTMLElement;
    const commentTextarea = div.querySelector(".comment-textarea") as HTMLTextAreaElement;
    if (!checkNull(emojiWheel, "emojiWheel") || !checkNull(commentTextarea, "commentTextarea")) return;

    const emojis = emojiWheel.querySelectorAll<HTMLElement>(".emoji");
    emojis.forEach((emoji) => {
      emoji.addEventListener("click", () => {
        commentTextarea.value += emoji.textContent;
      })
    })
  })
}

export const initializeEmojiWheelActions = () => {
  handleEmojiWheelOpen();
  insertEmojiToTextArea();
};

export const initializeClearAllTextareasOnPageLoad = () => {
    const textAreas = document.querySelectorAll<HTMLTextAreaElement>("textarea");
    if (!checkNull(textAreas, "textArea")) return;

    textAreas.forEach((textarea:HTMLTextAreaElement) => {
      textarea.value = "";
    });
};
