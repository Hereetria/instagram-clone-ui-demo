export const loadScript = (src, integrity, crossOrigin) => {
    const script = document.createElement("script");
    script.src = src;
    script.integrity = integrity;
    script.crossOrigin = crossOrigin;
    document.body.appendChild(script);
};
