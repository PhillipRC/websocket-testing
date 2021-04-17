/**
 * Wait for an event
 * @param {*} obj 
 * @param {string} eventType 
 * @returns 
 */
const waitForEvent = (obj, eventType) => new Promise(function (resolve) {
  let resolver = (event) => {
    obj.removeEventListener(eventType, resolver)
    resolve(event);
  }
  obj.addEventListener(eventType, resolver);
})

export default waitForEvent