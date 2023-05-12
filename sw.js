javascript
importScripts('./uv/uv.sw.js');

class CustomServiceWorker {
  constructor() {
    this.cacheName = 'uv-static';
  }

  async fetch(event) {
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(event.request);
    const cache = await caches.open(this.cacheName);
    cache.put(event.request, networkResponse.clone());
    return networkResponse;
  }
}

const sw = new CustomServiceWorker();

self.addEventListener('fetch', event => {
  event.respondWith(sw.fetch(event));
});
