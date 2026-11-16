/* Ascend service worker: offline cache. Bump V when you change files. */
const V='ascend-v2';
const CORE=['./', 'index.html', 'manifest.webmanifest', 'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/icon-maskable-192.png', 'icons/icon-maskable-512.png', 'icons/apple-touch-icon.png', 'icons/favicon-32.png', 'char/emote_celebrate.jpg', 'char/emote_flex.jpg', 'char/emote_slump.jpg', 'char/emote_wave.jpg', 'char/fit.jpg', 'char/fit_happy.jpg', 'char/fit_proud.jpg', 'char/fit_stressed.jpg', 'char/fit_tired.jpg', 'char/gear_shoes_fit.png', 'char/gear_shoes_lean.png', 'char/gear_shoes_strong.png', 'char/lean.jpg', 'char/shop_sneakers.png', 'char/strong.jpg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>Promise.all(CORE.map(u=>c.add(u).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==V).map(n=>caches.delete(n)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
  if(r.mode==='navigate'){
    e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put('index.html',cp));return res}).catch(()=>caches.match('index.html').then(m=>m||caches.match('./'))));return}
  if(u.pathname.includes('/char/')){e.respondWith(fetch(r).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r)));return}
  e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{if(res&&res.ok){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp))}return res}).catch(()=>m)));
});
