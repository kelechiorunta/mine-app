/**
 * Features available with web Workers include
 * 
 * ABORTCONTROLLER class/interface represents a controller object that allows you to abort one or more Web requests as and when desired.
 * 
 * const controller = new AbortController();
 * const signal = controller.signal;
 * 
 * const fetchVideo = (url, abortSignal) => {
 *      fetch(url, { abortSignal })
 *      .then(res => console.log(res))
 *      .catch(err => console.log(err.message))
 * }
 * 
 * const abortVideo = () => {
 *      controller.abort();
 *      console.log('Operation aborted')
 * }
 * 
 * abortVideo();
 * fetchVideo('./game', signal)
 * 
 * CUSTOMEVENT class/interface represents events initialized by an application for any purpose.
 * 
 * const eventname = document.querySeelctor('.event_name').value //An input element value
 * //First example of the custom event declaration with no arguments
 * const customEventInit = new CustomEvent('newEvent',
        { detail: { name : () =>  eventname }, //detail object of the event that returns the event's informations
        bubbles: true }//the event bubbles up so the window object has access to the new event
   )
   //Second example of the custom event declaration with arguments
   const customEventInit = new CustomEvent('newEvent',
        { detail: { name : (e) => e.target.value }, //detail object of the event that returns the event's informations
        bubbles: true }//the event bubbles up so the window object has access to the new event
   )
   
   //Returns the detail name function result. This is for the first customEventInit declaration where no argument
   //is passed for the name fn.
   E.g window.addEventlistener('newEvent', (e) => console.log(e.detail.name()))

    //Returns the detail name function result. This is for the second customEventInit declaration where argument
   //is passed for the name fn which is the target element where it is refrenced when bubbled to the windows object.
   E.g window.addEventlistener('newEvent', (e) => console.log(e.detail.name(e)))
   
   //This dispatches the event from an input event of an element so that it bubbles up 
   //and is accessible to the window object
   //document.querySelector('.myinput').addEventListener('click',
    function(){
        this.dispatchEvent(customEventInit);
   })
 */
   /**
    * BACKGROUNDFETCH API;
    * The Background Synchronization API provides a way for service workers to defer processing until
    * a user is connected; however it can't be used for long running tasks such as downloading a large file.
    * The Background Synchronization API enables a web app to defer tasks so that they can be run in a service
    * worker once the user has a stable network connection.
    * The API relies on service workers to create a SyncManagers interface that handles the registeration,
    * scheduling of offline tasks to be run once the network is restored.
    * 
    * const syncMessagesLater = async() => {
    *    const registration = await navigator.serviceWorker.ready;
    *        try{
    *            await registration.sync.register("sync-messages");
    *       } catch {
    *         console.log("Background Sync could not be registered!");
    *       }    
    *          
    *
    * }
    * //TO check if the task has been registered in the serviceWorker
    * navigator.serviceWorker.ready.then((registration) => {
            registration.sync.getTags().then((tags) => {
                if (tags.includes("sync-messages")) {
                console.log("Messages sync already requested");
                }
      });
     });

    //To listen for the registered event for the registered task
        self.addEventListener("sync", (event) => {
    if (event.tag === "sync-messages") {
        event.waitUntil(sendOutboxMessages());
    }
    });

    Other examples include
        if ('serviceWorker' in navigator && 'SyncManager' in window) {
    navigator.serviceWorker.ready.then(function(reg) {
        return reg.sync.register('tag-name');
    }).catch(function() {
        // system was unable to register for a sync,
        // this could be an OS-level restriction
        postDataFromThePage();
    });
    } else {
    // serviceworker/sync not supported
    postDataFromThePage();
    }

        // Register your service worker:
    navigator.serviceWorker.register('/sw.js');

    // Then later, request a one-off sync:
    navigator.serviceWorker.ready.then(function(swRegistration) {
    return swRegistration.sync.register('myFirstSync');
    });
    ```

    Then listen for the event in `/sw.js`:

    ```js
    self.addEventListener('sync', function(event) {
    if (event.tag == 'myFirstSync') {
        event.waitUntil(doSomeStuff());
    }
    });
    */



    /** SERVICE WORKER FUNCTIONS AND EVENTS */

    const addToCache = async (resources) => {
        const cache = await caches.open('v1');
        await cache.addAll(resources);
      };

    const storeInCache = async (req, res) => {
        const cache = await caches.open('v1');
        await cache.put(req, res);
    };

    const getCache = async ({ req, resPromise, defaultUrl }) => {
        // Verify if the resource exists in the cache
        const responseFromCache = await caches.match(req);
        if (responseFromCache) {
          return responseFromCache;
        }
      
        const cachedResponse = await resPromise;
        if (cachedResponse) {
          console.info('Cached Response', cachedResponse);
          putInCache(req, cachedResponse.clone());
          return cachedResponse;
        }
      
        // Next try to get the resource from the network
        try {
          const response = await fetch(req.clone());
          //if there is no cachedResponse
          //we need to save clone to put one copy in cache
          storeInCache(req, response.clone());
          return response;
        } catch (error) {
          const defaultResponse = await caches.match(defaultUrl);
          if (defaultResponse) {
            return defaultResponse;
          }
          else{
            return new Response('Network error', {
                status: 408,
                headers: { 'Content-Type': 'text/plain' },
            });
          }     
        }
      };

    self.addEventListener('message', (event) => {
        console.log("This message is from server Web Worker: ", event.data);
        event.source.postMessage("Thanks Server")
    })

    self.addEventListener('install', (event) => {
        console.log("Hello friend, I'm a service worker");
        event.waitUntil(
          addToCache([
            './',
            './index.html',
            './mine.css',
          ])
        );
      });
      
      self.addEventListener('activate', async(event) => {
        event.waitUntil(() => console.log("I'm activated"));
      });

      self.addEventListener('fetch', (event) => {
        event.respondWith(
          getCache({
            req: event.request,
            resPromise: event.cachedResponse,
            defaultUrl: './',
          })
        );
      });
      
    self.addEventListener('sync', (e) => {
        if (e.tag == "sync-messages") {
            e.waitUntil(function(){
                console.log("I got messages to sync")
            });
            
        }
    })