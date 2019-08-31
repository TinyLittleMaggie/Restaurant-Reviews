const myCacheName = 'v1';

self.addEventListener('install', event => {
  console.log('Service worker installed!');
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
    // With any fetch event, make a copy
    // of the response from the server and save it in the cache
    fetch(event.request)
      .then(response => {
        const resClone = response.clone();
        caches
          .open(myCacheName)
          .then(cache => {
            cache.put(event.request, resClone);
          });
        return response;
      }).catch(err => {
        caches
          .match(event.request)
          .then(response => {
            return response;
          })
      })
  );
});


// Service worker tutorial link: https://www.youtube.com/watch?v=ksXwaWHCW6k
