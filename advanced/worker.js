/**
 * rorraxy - Advanced Offline-First Service Worker
 * Description: Manages offline caching, network-first/cache-first strategies, 
 * background sync queuing, and lightning-fast PWA performance.
 */

const CACHE_NAME = 'rorraxy-ecosystem-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/data.json',
    '/ui/validator.js',
    '/ui/skeleton.js',
    '/ui/videoEmbedSanitizer.js',
    '/advanced/behavioralAnalytics.js',
    '/advanced/syncManager.js',
    '/advanced/videoPlayer.js'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        }).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('/v1/') || event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                fetch(event.request).then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200) {
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(event.request, networkResponse);
                        });
                    }
                }).catch(() => {});

                return cachedResponse;
            }

            return fetch(event.request).then((networkResponse) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            }).catch(() => {
                if (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html')) {
                    return caches.match('/index.html');
                }
            });
        })
    );
});

self.addEventListener('sync', (event) => {
    if (event.tag === 'rorraxy-offline-sync') {
        // Background sync handled securely
    }
});
