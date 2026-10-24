/**
 * rorraxy - Advanced Offline-First PWA Service Worker
 * Description: Ensures the app works seamlessly offline by aggressively caching 
 * all ecosystem hubs, assets, dynamic pages, and local storage data.
 */

const CACHE_NAME = 'rorraxy-ecosystem-v2';

// আপনার ইকোসিস্টেমের সমস্ত গুরুত্বপূর্ণ পেজ এবং অ্যাসেটস যা অফলাইনে ক্যাশ থাকবে
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/management/managing.html',
  '/management/geo.js',
  '/management/currency.js',
  '/management/formPersist.js',
  '/pwa/popup.js',
  '/pwa/install-btn.js',
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Poppins:wght@300;400;500;600;700&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://lh3.googleusercontent.com/d/1PD_g_agcbmm7bbJTHoOWss8YtQ17LNsb=s400'
];

// ১. ইনস্টল ফেজ: সমস্ত অ্যাসেটস একসাথে ক্যাশ করে নেওয়া
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('rorraxy PWA: Caching all offline core assets.');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// ২. একটিভেশন ফেজ: পুরনো ক্যাশ ক্লিনআপ করা
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('rorraxy PWA: Clearing old cache ->', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// ৩. ফেচ স্ট্র্যাটেজি: Cache-First (অফলাইনেও ক্যাশ থেকে ইনস্ট্যান্ট লোড হবে)
self.addEventListener('fetch', (event) => {
  // শুধুমাত্র GET রিকোয়েস্টগুলোর জন্য ক্যাশিং কাজ করবে
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // যদি ক্যাশ ফাইল পাওয়া যায়, তবে ইন্টারনেট ছাড়াই সেটি ইনস্ট্যান্ট রিটার্ন করবে
      if (cachedResponse) {
        // ব্যাকগ্রাউন্ডে নেটওয়ার্ক থেকে লেটেস্ট ডেটা আপডেট করে নেওয়ার চেষ্টা করতে পারে (Stale-While-Revalidate)
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse);
            });
          }
        }).catch(() => {
          // ইগনোর নেটওয়ার্ক এরর ইন অফলাইন মোড
        });

        return cachedResponse;
      }

      // যদি ক্যাশে ফাইল না থাকে, তবে নেটওয়ার্ক থেকে এনে ক্যাশ করে তারপর দেখাবে
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
        // ইন্টারনেট এবং ক্যাশ দুটিতেই না থাকলে ফলব্যাক পেজ বা নোটিফিকেশন রিটার্ন করতে পারে
        if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('/index.html');
        }
      });
    })
  );
});
