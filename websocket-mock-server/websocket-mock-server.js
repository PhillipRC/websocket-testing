/**
 * Use mock-websocket to mock the behaviour of the websocket-node-server
 */
import { Server } from '../node_modules/mock-websocket/dist/mock-websocket'

/**
 * Creates the mock WebSocket server
 * @param {string} url End-point
 */
function WebSocketMockServer(url) {
  // create a mock end-point
  const server = new Server(url)
  // mock response when client connects
  server.on('connection', function () {
    server.send('ack')
  })
  // mock response when client sends a message
  server.on('message', function () {
    server.send('echo')
  })
  return server
}

export default WebSocketMockServer