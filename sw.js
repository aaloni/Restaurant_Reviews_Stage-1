
const cacheName = "Udacity_Restaraunt_Review";
const cacheAssets = [
    'index.html',
    'restaurant.html',
    'css/styles.css',
    'data/restaurants.json',
    'js/dbhelper.js',
    'js/main.js',
    'js/restaurant_info.js'
    'img/1.jpg',
    'img/2.jpg',
    'img/3.jpg',
    'img/4.jpg',
    'img/5.jpg',
    'img/6.jpg',
    'img/7.jpg',
    'img/8.jpg',
    'img/9.jpg',
    'img/10.jpg'
];
self.addEventListener('install', event =>
  { // install event
    console.log("SW installed!");
    event.waitUntil(caches.open(cacheName).then(cache =>
      {
        console.log('Caching files!');
        cache.addAll(cacheAssets);
        }).then(() => self.skipWaiting()));
  });
self.addEventListener('activate', event =>
  { //activate event
    console.log('SW activated!');
    event.waitUntil( caches.keys().then(cacheNames => {
      return Promise.all(cacheNames.map(cache => {
        if (cache!==cacheName) { console.log("Deleting old cache");
          return caches.delete(cache);}
        }))
      }))
    })
self.addEventListener('fetch', event =>
  {//fetch event
    console.log("Fetching!!");
    event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
  });
