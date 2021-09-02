var urls = ["/", "style.css", "script.js", "logging.js"];

var cacheName = "soal-cache";

self.addEventListener('install', function(event){
    event.waitUntil(
        caches.open(cacheName)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urls);
            })
    );

});

self.addEventListener('fetch', function(event){
    // console.log("listening to event");
    event.respondWith(
        // First we look for something in the caches that
        // matches the request
        caches.match(event.request).then(function (response) {
            // If we get something, we return it, otherwise
            // it's null, and we'll pass the request to
            // fetch, which will use the network.

            console.log(event.request);
            return response || fetch(event.request);
        }).catch (function(cache){
            return cache.addAll(urls);
        })
    );

});