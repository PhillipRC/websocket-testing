/**
 * Setup WebSocket Server
 */
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
console.log('WebSocket Server listening at port 8080');

wss.on('connection', function connection(ws) {
  console.log('new connection');
  ws.on('message', function incoming(message) {
    console.log(`received: ${message}`);
    if (message == 'echo') {
      ws.send('echo');
    }
  });
  ws.send('ack');
});

/**
 * Setup Http Server
 */
const express = require('express')
const app = express()
const port = 3000

// listen
app.listen(port, () => {
  console.log(`HTTP Server listening at http://localhost:${port}`)
})

// serve up all the project files
app.use(express.static('./'))