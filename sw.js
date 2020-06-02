'use strict';

// cache name
const STATIC_CACHE_NAME = 'covid19cue-static-cache-v1';

// files to pre-cache
const FILES_TO_PRECATCHE = [
	'offline.html',
	'img/icons/icon_256.png'
];

// install the service worker
self.addEventListener('install', evt => {
	//console.log('service worker has been installed');
	evt.waitUntil(
		caches.open(STATIC_CACHE_NAME)
			.then(cache => {
				console.log('pre-caching offline assets');
				cache.addAll(FILES_TO_PRECATCHE);
			})
	);
	self.skipWaiting();
});

// listens for the activate event
self.addEventListener('activate', evt => {
	//console.log('service worker has been activated');
	evt.waitUntil(
		caches.keys()
			.then(keys => {
				//console.log(keys);
				return Promise.all(keys
					.filter(key => key !== STATIC_CACHE_NAME)
					.map(key => caches.delete(key))
				);
			})
	);
	self.clients.claim();
});

// listens for fetch event
self.addEventListener('fetch', evt => {
	//console.log('fetch event', evt);
	if (evt.request.mode !== 'navigate') {
		// not a page navigation, bail
		return;
	}

	evt.respondWith(
		fetch(evt.request)
			.catch(() => {
				return caches.open(STATIC_CACHE_NAME)
					.then((cache) => {
						return cache.match('offline.html');
					});
			})
	);
});
