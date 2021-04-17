/**
 * Application to test
 */
export default class App {

  /**
   * Creates a WebSocket Connection and sets up event listeners for UI interactions
   * @param {*} url WebSocket server
   * @param {*} outputElement Element to display server messages
   * @param {*} echoOptionElement Element to send echo to server
   */
  constructor(url = 'ws://localhost:8080', outputElement, echoOptionElement) {

    console.debug('App:constructor', url)

    // create a WebSocket
    this.ws = new WebSocket(url)

    // listen for message event from WebSocket
    this.ws.addEventListener('message', (event) => {
      this.handleServerMessage(event.data, outputElement)
    })

    // listen for click event from echoOption if echoOption was set
    if (echoOptionElement) {
      echoOptionElement.addEventListener('click', () => {
        this.send('echo');
      })
    }

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
  send = async (message) => {
    console.debug('App:send', message);
    if (this.ws.readyState !== WebSocket.OPEN) {
      console.debug('App:send waiting for WebSocket open event')
      await this.waitForEvent(this.ws, 'open')
    }
    console.debug('App:send > WebSocket.send()', message)
    this.ws.send(message)
  }

  /**
   * Addes the message to the outputElement
   * @param {string} message 
   * @param {object} outputElement 
   */
  handleServerMessage = (message, outputElement) => {
    console.debug('App:handleServerMessage', message)
    // only send to outputElement if it exists
    if (outputElement) {
      console.debug('App:handleServerMessage sending to outputElement')
      outputElement.innerHTML += (message + '\n')
    }
  }

}