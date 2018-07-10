/* For my serviceworker I mainly used some code by
https://developers.google.com/web/fundamentals/primers/service-workers/
and
https://www.netlify.com/blog/2017/10/31/service-workers-explained/
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

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

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
