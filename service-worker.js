self.addEventListener('install', function() {
  console.log('Service worker installed!');
});

self.addEventListener('fetch', function(event) {
  // console.log(event.request.url);
  event.respondWith(
    fetch('/img/1-large.jpg')
  );
});
