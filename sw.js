/*
  neurun service worker.
  Uygulama dosyalarını önbelleğe alır, çevrimdışı açılmayı ve hızlı yüklemeyi sağlar.
  Dosyaları GitHub'da güncellediğinde VERSION değerini bir artır (ör. neurun-v3),
  böylece eski önbellek silinir ve herkes yeni sürümü alır.
*/
const VERSION = 'neurun-v3';
const CORE = [
  './', 'index.html', 'style.css', 'app.js', 'config.js', 'manifest.webmanifest',
  'db-web.js', 'db-url.js', 'db-image.js', 'db-video.js', 'db-songs.js',
  'big-web.js', 'big-image.js', 'big-video.js', 'big-url.js',
  'icon-192.png', 'icon-192-dark.png', 'icon-512.png', 'apple-touch-icon.png', 'apple-touch-icon-dark.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(VERSION)
      .then(c => Promise.all(CORE.map(u => c.add(new Request(u, { cache: 'reload' })).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;          // dış siteler (arama, proxy) önbelleğe alınmaz

  if (req.mode === 'navigate') {                        // sayfa: önce ağ, olmazsa önbellek
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(VERSION).then(c => c.put('index.html', copy));
        return res;
      }).catch(() => caches.match('index.html').then(r => r || caches.match('./')))
    );
    return;
  }

  if (url.pathname.endsWith('filmler.txt')) {            // büyük film verisi: önbellekten ver, yoksa indirip sakla
    e.respondWith(caches.match(req).then(cached => cached || fetch(req).then(res => {
      if (res && res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
      return res;
    })));
    return;
  }

  e.respondWith(                                        // dosyalar: önbellekten ver, arkada yenile
    caches.match(req).then(cached => {
      const net = fetch(req).then(res => {
        if (res && res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
        return res;
      }).catch(() => cached);
      return cached || net;
    })
  );
});
