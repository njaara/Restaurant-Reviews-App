let staticCache = 'rest-cache';

let cacheURLs = [
  './',
  './index.html',
  './restaurant.html',
  './css/styles.css',
  './data/restaurants.json',
  './js/dbhelper.js',
  './js/main.js',
  './js/restaurant_info.js',
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg',
];

//install
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCache).then(function(cache) {
      console.log('Cache Opened');
      return cache.addAll(cacheURLs);
    })
    .catch((err) => {
      console.log('Error');
    })
  );
});

// activate
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restaurant-') &&
            cacheName != staticCache;
          }).map(function(cacheName) {
            return caches.delete(cacheName);
          })
      );
    })
  );
});


// fetch
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});


// referenced:
// https://developer.mozilla.org/en-US/docs/Web/API/Cache
// https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker
