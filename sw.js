/* For my serviceworker I mainly used some code by
https://developers.google.com/web/fundamentals/primers/service-workers/
*/

var cacheVersion = 'v1';
var cacheFiles = [
  '/',
  '/css',
  '/img',
  '/js',
  'index.html',
  'restaurant.html'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(cacheVersion)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(cacheFiles);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
