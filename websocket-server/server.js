const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
console.log('WebSocket Server listening on port 8080');

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    if (message == 'echo') {
      ws.send('echo');
    }

  });

  ws.send('ack');
});