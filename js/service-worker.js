self.addEventListener('fetch', function(event) {
  event.respondWith(
    new Response('<h1">Hello! Your page has been hijacked!</h1>', {
      headers: {'Content-Type': 'text/html'}
    })
  );
  // console.log('Hello from sw!');
});
