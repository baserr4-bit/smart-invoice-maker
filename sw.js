const C='sim-v2';
const ASSETS=['./','index.html','manifest.webmanifest','icon.svg','icon-192.png','icon-512.png','icon-maskable-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('sim-')&&k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.origin!==location.origin||u.search)return;
e.respondWith(fetch(r,{cache:'no-cache'}).then(res=>{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp));return res}).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))))});
