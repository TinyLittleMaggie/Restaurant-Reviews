const myCacheName = 'v1';
const cacheAssets = [
  'index.html',
  '/js/main.js',
  '/js/dbhelper.js'
];

self.addEventListener('install', event => {
  console.log('Service worker installed!');
  event.waitUntil(
    caches
      .open(myCacheName)
      .then(cache => {
        console.log('Service worker caching files');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  console.log('Service worker activated!');
  // Remove old caches
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== myCacheName) {
            console.log('Service worker clearing old cache!');
            return caches.delete(cache);
          }
        })
      )
    })
  );
});

self.addEventListener('fetch', event => {
  console.log('Service worker fetching cache!');
  event.respondWith(
    // If the internet connection is good,
    // respond with network requests as usual
    fetch(event.request)
      // If the network fails,
      // match the request with cached response
      .catch(() => caches.match(event.request))
  );
});
