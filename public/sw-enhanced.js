
const CACHE_NAME = 'techgrounds-ai-playground-v1';
const STATIC_CACHE_NAME = 'techgrounds-static-v1';

// Critical resources to cache immediately
const STATIC_RESOURCES = [
  '/',
  '/offline.html',
  '/manifest.json'
];

// API endpoints to cache
const API_CACHE_PATTERNS = [
  /\/api\//,
  /\/functions\//
];

self.addEventListener('install', (event) => {
  console.log('ServiceWorker installing...');
  
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        return cache.addAll(STATIC_RESOURCES);
      }),
      self.skipWaiting()
    ])
  );
});

self.addEventListener('activate', (event) => {
  console.log('ServiceWorker activating...');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      self.clients.claim()
    ])
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Handle different types of requests
  if (request.method === 'GET') {
    // Static resources - cache first strategy
    if (STATIC_RESOURCES.some(resource => url.pathname.endsWith(resource))) {
      event.respondWith(cacheFirst(request));
    }
    // API calls - network first with fallback
    else if (API_CACHE_PATTERNS.some(pattern => pattern.test(url.pathname))) {
      event.respondWith(networkFirstWithFallback(request));
    }
    // Everything else - stale while revalidate
    else {
      event.respondWith(staleWhileRevalidate(request));
    }
  }
});

// Cache strategies
async function cacheFirst(request) {
  const cache = await caches.open(STATIC_CACHE_NAME);
  const cached = await cache.match(request);
  
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('Cache first failed:', error);
    return new Response('Offline', { status: 503 });
  }
}

async function networkFirstWithFallback(request) {
  const cache = await caches.open(CACHE_NAME);
  
  try {
    const response = await fetch(request);
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.error('Network request failed, trying cache:', error);
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    
    // Return offline fallback
    return new Response(JSON.stringify({ 
      error: 'Offline - geen internetverbinding' 
    }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  
  const fetchPromise = fetch(request).then((response) => {
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => cached);
  
  return cached || fetchPromise;
}

// Handle background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'retry-failed-requests') {
    event.waitUntil(retryFailedRequests());
  }
});

async function retryFailedRequests() {
  // Implementation for retrying failed requests when back online
  console.log('Retrying failed requests...');
}
