// Register the service worker so the app installs and works offline.
// Relative "sw.js" scopes the worker to this folder (handles GitHub Pages subpaths).
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker.register("sw.js").catch(function () {
      /* offline support is a bonus; the app works fine without it */
    });
  });
}

// "Install app" hint — Android/Chrome only. The browser fires
// beforeinstallprompt when the app is installable; we stash it and reveal
// the button. iOS never fires this, so the button stays hidden there
// (iPhone installs via Share → Add to Home Screen instead).
(function () {
  var installBtn = document.getElementById("installBtn");
  if (!installBtn) return;

  var deferredPrompt = null;

  window.addEventListener("beforeinstallprompt", function (e) {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.hidden = false;
  });

  installBtn.addEventListener("click", function () {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.finally(function () {
      deferredPrompt = null;
      installBtn.hidden = true;
    });
  });

  window.addEventListener("appinstalled", function () {
    deferredPrompt = null;
    installBtn.hidden = true;
  });
})();
