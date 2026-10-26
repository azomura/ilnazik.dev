const CACHE = 'azomura-offline-v2'
const FALLBACK = '/offline.html'

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then(cache => cache.add(FALLBACK))
      .then(() => self.skipWaiting())
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('fetch', event => {
  if (
    event.request.mode !== 'navigate' ||
    new URL(event.request.url).origin !== self.location.origin
  )
    return

  event.respondWith(
    fetch(event.request).catch(async () => {
    const cache = await caches.open(CACHE)
    const fallback = await cache.match(FALLBACK)

      return fallback || Response.error()
    })
  )
})
