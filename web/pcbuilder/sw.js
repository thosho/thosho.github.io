// RigForge Service Worker v2 — Network-First for dev safety
const CACHE_NAME = 'rigforge-cache-v2';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => caches.delete(key)));
        }).then(() => self.clients.claim())
    );
});

// Network-first: always try network, fallback to offline page
self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request).catch(() =>
                caches.match('./offline.html')
            )
        );
        return;
    }
    // For all other assets, try network first
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
