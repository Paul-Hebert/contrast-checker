const cacheName = 'primaryCache';

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll([
                'pwa-features.js',
                'scripts/app.js',
                'styles/app.css',
                'icons/icon.png',
                'index.html'
            ]);
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            } else {
                return fetch(event.request);
            }
        })
    );
});