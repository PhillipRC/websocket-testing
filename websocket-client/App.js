/**
 * Application to test
 */
class App {

  /**
   * App constructor
   * @param {*} url WebSocket server
   * @param {*} outputElement Element to display server messages
   */
  constructor(url = 'ws://localhost:8080', outputElement) {
    console.debug('App:constructor', url)
    // create a WebSocket
    this.ws = new WebSocket(url)
    // listen for message event from WebSocket
    this.ws.addEventListener('message', (event) => {
      this.handleServerMessage(event.data, outputElement)
    })
  }

  /**
   * Waits for an event to trigger on an object
   * @param {*} obj 
   * @param {string} eventType 
   * @returns 
   */
  waitForEvent = (obj, eventType) => new Promise(function (resolve) {
    let resolver = (event) => {
      obj.removeEventListener(eventType, resolver)
      resolve(event)
    }
    obj.addEventListener(eventType, resolver)
  });

  /**
   * Send a message via the WebSocket
   * @param {string} message 
   */
  async send(message) {
    console.debug('App:send', message);
    if (this.ws.readyState !== WebSocket.OPEN) {
      console.debug('App:send waiting for WebSocket open event')
      await this.waitForEvent(this.ws, 'open')
    }
    console.debug('App:send > WebSocket.send()', message)
    this.ws.send(message)
  }

  /**
   * 
   * @param {string} message 
   * @param {object} outputElement 
   */
  handleServerMessage(message, outputElement) {
    console.debug('App:handleServerMessage', message)
    if (outputElement) {
      console.debug('App:handleServerMessage sending to outputElement')
      outputElement.innerHTML += (message + '\n')
    }
  }

}