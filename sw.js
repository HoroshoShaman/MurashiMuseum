/* Музей мурашей — оболочка без интернета. Кружки лежат в кэше mm-media-v1 (их кладёт сама страница). */
const V = 'mm-shell-5';
const SHELL = ['./', 'app.css?v=5', 'app.js?v=5', 'pangolin.woff2', 'icon-180.png', 'icon-64.png', 'c.bin', 't.bin', 'kw.bin'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(ks => Promise.all(ks.filter(k => k.startsWith('mm-shell-') && k !== V).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.origin !== location.origin) return;
  if (r.mode === 'navigate') {
    e.respondWith(fetch(r).then(res => {
      if (res.ok) { const cp = res.clone(); caches.open(V).then(c => c.put('./', cp)); }
      return res;
    }).catch(() => caches.match('./')));
    return;
  }
  if (/\/(c|t|kw)\.bin$/.test(u.pathname)) {          // каталог: сначала сеть (вдруг обновился), без сети — кэш
    e.respondWith(fetch(r).then(res => {
      if (res.ok) { const cp = res.clone(); caches.open(V).then(c => c.put(r, cp)); }
      return res;
    }).catch(() => caches.match(r, { ignoreSearch: true })));
    return;
  }
  e.respondWith(caches.match(r).then(m => m || fetch(r)));
});
