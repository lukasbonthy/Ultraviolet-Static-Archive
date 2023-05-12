javascript
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("uv-static").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/uv/uv.styles.css",
        "/uv/uv.bundle.js",
        "/uv/uv.handler.js",
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).then((fetchResponse) => {
          return caches.open("uv-static").then((cache) => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        })
      );
    })
  );
});
