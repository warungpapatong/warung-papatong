// Progressive Web App Service Worker for Warung Papatong
const CACHE_NAME = "papatong-pwa-cache-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/sitemap.xml",
  "/manifest.json"
];

// Install Event
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Pre-caching offline experience shell");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Event
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[Service Worker] Clearing old cache bundle:", key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event (Stale-While-Revalidate Strategy for ultimate performance & offline availability)
self.addEventListener("fetch", (event) => {
  // Only handle GET requests for standard local resources
  if (event.request.method !== "GET" || !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        const fetchedResponse = fetch(event.request)
          .then((networkResponse) => {
            // Save fresh copy to cache
            if (networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => {
            // Offline fallback: do nothing, we return the cached response
            console.log("[Service Worker] Resource fetched from index cache while offline");
          });

        // Return cached immediately if found, otherwise await network fetch
        return cachedResponse || fetchedResponse;
      });
    })
  );
});
