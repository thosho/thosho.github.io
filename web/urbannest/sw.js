// UrbanNest Service Worker — v2.1 Network-First
const CACHE = 'urbannest-v2.1';

self.addEventListener('install', e => {
    self.skipWaiting();
});

self.addEventListener('activate', e => {
    e.waitUntil(
        // Delete ALL old caches including any rogue ones from other demos
        caches.keys().then(keys =>
            Promise.all(keys.map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', e => {
    if (e.request.mode === 'navigate') {
        e.respondWith(
            fetch(e.request).catch(() => caches.match('./offline.html'))
        );
        return;
    }
    // Network-first for all assets
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});
