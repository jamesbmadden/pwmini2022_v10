/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

self.addEventListener('install', event => {
  event.waitUntil(caches.open('mini22-10').then(cache => {
    cache.addAll([
      './',
      './index.html',
      './main.js',
      './0.main.js',
      './1.main.js',
      './2.main.js',
      './3.main.js',
      './4.main.js',
      './5.main.js',
      './6.main.js',
      'https://fonts.googleapis.com/icon?family=Material+Icons'
    ]);
  }));
});

self.addEventListener('fetch', event => {
  if (event.request.method === 'GET') {
    if (/\/api/.test(event.request.url)) {
      addToCache(event.request, 'mini22-api');
      event.respondWith(fromNetwork(event.request, 'mini22-api').then(response => {
        return response;
      }).catch(() => {
        return fromCache(event.request, 'mini22-api');
      }));
    } else if (!/firestore.googleapis.com/.test(event.request.url)) {
      addToCache(event.request, 'mini22-10');
      event.respondWith(fromCache(event.request, 'mini22-10').then(response => {
        if (response) return response; // fromCache won't error, so whether response exists needs to be checked
        else return fromNetwork(event.request, 'mini22-10'); // If the file is not cached, get it from the network
      }));
    }
  }
});

function fromCache(request, cache) { // Get a file from the cache
  return caches.open(cache).then(cache => {
    return cache.match(request);
  });
  
}

function fromNetwork(request) {
  return fetch(request);
}

function addToCache(request, cache) {
  return caches.open(cache).then(cache => {
    fetch(request.clone()).then(response => {
      return cache.put(request, response.clone()).then(() => {
        return response;
      })
    });
  });
}