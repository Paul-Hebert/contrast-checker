window.browser = (function () {
    return window.msBrowser || window.browser || window.chrome;
})();

window.browser.devtools.panels.create(
    "Contrast Checker",
    "icons/icon.png",
    "index.html"
);