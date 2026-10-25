// Register the service worker so the app installs and works offline.
// Relative "sw.js" scopes the worker to this folder (handles GitHub Pages subpaths).
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("sw.js").catch(function () {
      /* offline support is a bonus; the app works fine without it */
    });
  });
}
