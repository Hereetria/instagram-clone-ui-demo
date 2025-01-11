import checkNull from "../../utils/nullguard.js";
import { hideOverlay } from "../../utils/overlay.js";

export const loadScript = (src: string, integrity: string, crossOrigin: string): void => {
  const script = document.createElement("script");
  script.src = src;
  script.integrity = integrity;
  script.crossOrigin = crossOrigin;
  document.body.appendChild(script);
};