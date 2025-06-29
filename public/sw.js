const CACHE_NAME = "kostopro-v1.0.0";
const STATIC_CACHE = "kostopro-static-v1.0.0";
const DYNAMIC_CACHE = "kostopro-dynamic-v1.0.0";

// Resources to cache immediately
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/offline.html",
  // Add other critical assets
];

// CDN libraries that should be cached
const CDN_ASSETS = [
  "https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/dist/flatpickr.min.js",
  "https://cdn.jsdelivr.net/npm/flatpickr@4.6.13/dist/flatpickr.min.css",
  "https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.js",
  "https://cdn.jsdelivr.net/npm/sortablejs@1.15.0/Sortable.min.js",
  "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js",
  "https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js",
  "https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js",
  "https://cdn.jsdelivr.net/npm/intro.js@7.2.0/minified/intro.min.js",
  "https://cdn.jsdelivr.net/npm/intro.js@7.2.0/minified/introjs.min.css",
  "https://cdn.jsdelivr.net/npm/tippy.js@6.3.7/dist/tippy-bundle.umd.min.js",
  "https://cdn.jsdelivr.net/npm/tippy.js@6.3.7/dist/tippy.css",
];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing...");

  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE).then((cache) => {
        console.log("Service Worker: Caching static assets");
        return cache.addAll(STATIC_ASSETS);
      }),
      // Cache CDN assets
      caches.open(DYNAMIC_CACHE).then((cache) => {
        console.log("Service Worker: Caching CDN assets");
        return Promise.allSettled(
          CDN_ASSETS.map((url) =>
            cache.add(url).catch((err) => {
              console.warn(`Failed to cache ${url}:`, err);
              return null;
            }),
          ),
        );
      }),
    ]).then(() => {
      console.log("Service Worker: Installation complete");
      // Skip waiting to activate immediately
      return self.skipWaiting();
    }),
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activating...");

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Delete old caches
            if (
              cacheName !== STATIC_CACHE &&
              cacheName !== DYNAMIC_CACHE &&
              cacheName !== CACHE_NAME
            ) {
              console.log("Service Worker: Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          }),
        );
      })
      .then(() => {
        console.log("Service Worker: Activation complete");
        // Take control of all pages immediately
        return self.clients.claim();
      }),
  );
});

// Fetch event - serve from cache or network
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle different types of requests
  if (request.method === "GET") {
    event.respondWith(handleGetRequest(request, url));
  }
});

async function handleGetRequest(request, url) {
  // For navigation requests (pages)
  if (request.mode === "navigate") {
    return handleNavigationRequest(request);
  }

  // For static assets
  if (isStaticAsset(url)) {
    return handleStaticAsset(request);
  }

  // For CDN assets
  if (isCDNAsset(url)) {
    return handleCDNAsset(request);
  }

  // For API requests
  if (isAPIRequest(url)) {
    return handleAPIRequest(request);
  }

  // For other requests, try cache first, then network
  return handleOtherRequests(request);
}

async function handleNavigationRequest(request) {
  try {
    // Try network first for navigation
    const networkResponse = await fetch(request);

    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    // If network fails, try cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // If no cache, return offline page
    return (
      caches.match("/offline.html") || new Response("Offline", { status: 503 })
    );
  }
}

async function handleStaticAsset(request) {
  // Cache first strategy for static assets
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.warn("Failed to fetch static asset:", request.url);
    return new Response("Asset not available offline", { status: 503 });
  }
}

async function handleCDNAsset(request) {
  // Cache first strategy for CDN assets
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request, { mode: "cors" });
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.warn("Failed to fetch CDN asset:", request.url);
    // Return a minimal response to prevent app breaking
    if (request.url.includes(".js")) {
      return new Response("// CDN asset not available offline", {
        headers: { "Content-Type": "application/javascript" },
      });
    }
    if (request.url.includes(".css")) {
      return new Response("/* CDN asset not available offline */", {
        headers: { "Content-Type": "text/css" },
      });
    }
    return new Response("CDN asset not available offline", { status: 503 });
  }
}

async function handleAPIRequest(request) {
  // Network first strategy for API requests
  try {
    const networkResponse = await fetch(request);

    // Cache successful GET requests
    if (networkResponse.ok && request.method === "GET") {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    // For GET requests, try cache
    if (request.method === "GET") {
      const cachedResponse = await caches.match(request);
      if (cachedResponse) {
        return cachedResponse;
      }
    }

    // Return offline response for API failures
    return new Response(
      JSON.stringify({
        error: "API not available offline",
        offline: true,
        timestamp: Date.now(),
      }),
      {
        status: 503,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}

async function handleOtherRequests(request) {
  try {
    const networkResponse = await fetch(request);

    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    // Try cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    return new Response("Content not available offline", { status: 503 });
  }
}

// Helper functions
function isStaticAsset(url) {
  return url.pathname.match(
    /\.(js|css|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/,
  );
}

function isCDNAsset(url) {
  return (
    url.hostname.includes("cdn.") ||
    url.hostname.includes("jsdelivr.net") ||
    url.hostname.includes("unpkg.com") ||
    url.hostname.includes("cdnjs.cloudflare.com")
  );
}

function isAPIRequest(url) {
  return (
    url.pathname.startsWith("/api/") ||
    url.pathname.includes("/api/") ||
    url.hostname !== self.location.hostname
  );
}

// Message handling for cache management
self.addEventListener("message", (event) => {
  const { type, data } = event.data;

  switch (type) {
    case "CACHE_URLS":
      cacheUrls(data.urls);
      break;
    case "CLEAR_CACHE":
      clearCache(data.cacheName);
      break;
    case "GET_CACHE_SIZE":
      getCacheSize().then((size) => {
        event.ports[0].postMessage({ size });
      });
      break;
    case "UPDATE_CACHE":
      updateCache();
      break;
  }
});

async function cacheUrls(urls) {
  const cache = await caches.open(DYNAMIC_CACHE);
  return Promise.allSettled(
    urls.map((url) =>
      cache
        .add(url)
        .catch((err) => console.warn(`Failed to cache ${url}:`, err)),
    ),
  );
}

async function clearCache(cacheName = null) {
  if (cacheName) {
    return caches.delete(cacheName);
  } else {
    const cacheNames = await caches.keys();
    return Promise.all(cacheNames.map((name) => caches.delete(name)));
  }
}

async function getCacheSize() {
  const cacheNames = await caches.keys();
  let totalSize = 0;

  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const requests = await cache.keys();

    for (const request of requests) {
      const response = await cache.match(request);
      if (response) {
        const blob = await response.blob();
        totalSize += blob.size;
      }
    }
  }

  return totalSize;
}

async function updateCache() {
  console.log("Service Worker: Updating cache...");

  // Update static cache
  const staticCache = await caches.open(STATIC_CACHE);
  await Promise.allSettled(
    STATIC_ASSETS.map((url) =>
      fetch(url)
        .then((response) => {
          if (response.ok) {
            staticCache.put(url, response);
          }
        })
        .catch((err) => console.warn(`Failed to update ${url}:`, err)),
    ),
  );

  console.log("Service Worker: Cache update complete");
}

// Background sync for offline actions
self.addEventListener("sync", (event) => {
  console.log("Service Worker: Background sync triggered:", event.tag);

  if (event.tag === "background-sync") {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Handle any offline actions that need to be synced
  try {
    // Get offline actions from IndexedDB or localStorage
    const offlineActions = await getOfflineActions();

    for (const action of offlineActions) {
      try {
        await processOfflineAction(action);
        await removeOfflineAction(action.id);
      } catch (error) {
        console.warn("Failed to sync action:", action, error);
      }
    }
  } catch (error) {
    console.error("Background sync failed:", error);
  }
}

async function getOfflineActions() {
  // Implement getting offline actions from storage
  return [];
}

async function processOfflineAction(action) {
  // Implement processing offline actions
  console.log("Processing offline action:", action);
}

async function removeOfflineAction(actionId) {
  // Implement removing processed actions
  console.log("Removing offline action:", actionId);
}

// Push notification handling
self.addEventListener("push", (event) => {
  console.log("Service Worker: Push notification received");

  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: "/icon-192x192.png",
      badge: "/badge-72x72.png",
      vibrate: [100, 50, 100],
      data: data.data,
      actions: data.actions || [],
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

// Notification click handling
self.addEventListener("notificationclick", (event) => {
  console.log("Service Worker: Notification clicked");

  event.notification.close();

  if (event.action) {
    // Handle action button clicks
    console.log("Action clicked:", event.action);
  } else {
    // Handle notification click
    event.waitUntil(clients.openWindow(event.notification.data?.url || "/"));
  }
});

console.log("Service Worker: Script loaded");
