const STATIC_VERSION = 1;
const DYNAMIC_VERSION = 1;
const STATIC_CACHE = `static-${STATIC_VERSION}://covid19cue.netlify.app`;
const DYNAMIC_CACHE = `dynamic-${DYNAMIC_VERSION}://covid19cue.netlify.app`;
const APP_SHELL = [
	`.`,
	`index.html`,
	`countries.json`,
	`css/base.css`,
	`js/base.js`,
	`js/AsyncRequest.js`,
	`img/icons/ic_192.png`,
	`img/icons/ic_512.png`
];

// install event
self.oninstall = e => {
	e.waitUntil(
		caches.open(STATIC_CACHE).then(cache => {
			cache.addAll(APP_SHELL);
		})
	);
};

// activate event
self.onactivate = e => {
	e.waitUntil(
		caches.keys().then(keys => {
			return Promise.all(keys
				.filter(key => key !== STATIC_CACHE & key !== DYNAMIC_CACHE)
				.map(key => caches.delete(key))
			);
		})
	);
};

// fetch event
self.onfetch = e => {
	e.respondWith(
		caches.match(e.request).then(cachedResponse => {
			return cachedResponse || fetch(e.request).then(fetchResponse => {
				return caches.open(`${DYNAMIC_CACHE}`).then(cache => {
					// if (e.request.url.lastIndexOf(`.php`)===-1) {
					// 	cache.put(e.request.url, fetchResponse.clone());
					// }
					return fetchResponse;
				});
			});
		})
	);
};
