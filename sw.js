const CACHE = "codex-desktop-v5";
const ASSETS = [
  "/",
  "/index.html",
  "/skeletol/",
  "/compass/",
  "/map/",
  "/log/",
  "/js/navkit.js",
  "/manifest.webmanifest",
  "/css/frame.w0rk.css",
  "/assets/sigil.svg",
  "/assets/favicon.svg",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/maskable-512.png",
  "/icons/apple-touch-180.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  // Navigation requests: network first, then the matching cached page
  // (e.g. /compass/), then the desktop shell as a last resort.
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).catch(() =>
        caches.match(req).then((hit) => hit || caches.match("/index.html"))
      )
    );
    return;
  }

  // Everything else: cache-first, fall back to network.
  event.respondWith(
    caches.match(req).then((cached) => {
      return cached || fetch(req).then((res) => {
        // Cache same-origin successful responses for next time.
        if (res && res.ok && new URL(req.url).origin === self.location.origin) {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy));
        }
        return res;
      }).catch(() => cached);
    })
  );
});
