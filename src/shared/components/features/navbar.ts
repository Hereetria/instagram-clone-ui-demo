import checkNull from "../../utils/nullguard.js";

export const adjustNavbarWidth = (): void => {
  const navbar = document.querySelector("#navbar") as HTMLElement;
  const navbarPlaceholder = document.querySelector("#navbar-placeholder") as HTMLElement;
  const pageWidth: number = window.innerWidth;
  if (!checkNull(navbar, "navbar") || !checkNull(navbarPlaceholder, "navbarPlaceHolder")) return;

  if (pageWidth <= 800) {
    navbar.style.width = `${pageWidth}px`;
    navbarPlaceholder.classList.replace("d-none", "d-block")
  } else {
    navbarPlaceholder.classList.replace("d-block", "d-none");
  }
  
};


export const initializaOpenNavbarSearch = () => {
  const navbarSearchExpandableDiv = document.getElementById("navbarSearchExpandableDiv") as HTMLElement;
  const miniSearchbar = document.querySelector(".miniSearchbar") as HTMLInputElement;

  if (!checkNull(navbarSearchExpandableDiv, "navbarSearchExpandableDiv") || !checkNull(miniSearchbar, "miniSearchbar")) return;

  miniSearchbar.addEventListener("click", (event) => {
    navbarSearchExpandableDiv.classList.remove("d-none");
    navbarSearchExpandableDiv.classList.add("d-block");
  });

  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;

    if (
      !navbarSearchExpandableDiv.contains(target) &&
      target !== miniSearchbar
    ) {
      navbarSearchExpandableDiv.classList.remove("d-block");
      navbarSearchExpandableDiv.classList.add("d-none");
    }
  });
}