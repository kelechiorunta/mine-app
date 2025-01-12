/** Service Worker script */
const reqs = ['/', '/index.html']

const addResources = async(resources) => {
    const cache = await caches.open('app-cache');
    await cache.addAll(resources)
}

const saveInCache = async(req, res) => {
    const cache = await caches.open('app-cache');
    await cache.put(req, res);
}

const cacheFirst = async({req, preloadResponsePromise}) => {
    const cachedResponse = await caches.match(req);
    if (cachedResponse) {
        return cachedResponse;
    }

    // const preloadResponse = await preloadResponsePromise;
    //When the preloadResponsePromise is resolved, it returns a preloadResponse
    //which is the response got when you refresh the page
    if (preloadResponsePromise) {
        console.log("Getting Preload Response", preloadResponsePromise)
        saveInCache(req, preloadResponsePromise.clone())
        return preloadResponsePromise;
    }

    try{
        const fetchedResponse = await fetch(req.clone());
        if (fetchedResponse){
            saveInCache(req, fetchedResponse.clone());
            return fetchedResponse;
        }
    }catch(err){
        console.error(err);
        throw err
    }
}

const enableNavigationPreload = async () => {
    if (self.registration.navigationPreload) {
        // Enable navigation preload
        await self.registration.navigationPreload.enable();
    }
};

self.addEventListener('install', (event) => {
    console.log("Service Worker installed!");
    event.waitUntil(addResources(reqs))
})

self.addEventListener('activate', (event) => {
    event.waitUntil(enableNavigationPreload())
})

self.addEventListener('fetch', (event) => {
    event.respondWith((async() => {
        const preloadResponse = await event.preloadResponse;
        cacheFirst({req: event.request, preloadResponsePromise: preloadResponse})
    })())
})