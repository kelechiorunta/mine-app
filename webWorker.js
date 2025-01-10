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
    * const ssyncMessagesLater = async() => {
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
    */