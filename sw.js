// TravelNest Service Worker
const CACHE_NAME = 'travelnest-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/destinations.html',
  '/budget.html',
  '/generator.html',
  '/mood.html',
  '/feedback.html',
  '/css/style.css',
  '/js/main.js',
  '/js/components.js',
  '/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      return cached || fetch(e.request).catch(() => caches.match('/index.html'));
    })
  );
});
