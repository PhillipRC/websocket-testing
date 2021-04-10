# Exercising various Mocha, Chai, and Sinon Features

- [Mocha](https://mochajs.org/) is a test runner
- [Chai](https://www.chaijs.com/) defines Asserition (test validators)
- [Sinon](https://sinonjs.org/) is test Stub/Spy/Mock library

Mostly these are experiments in understanding how tests can be ran in the browser.

## Getting Started
- Prerequisits
  - Git
  - Chrome

> `git clone git@github.com:PhillipRC/websocket-testing.git`

> `cd ./websocket-testing`

> `npm install`

---

# Folders

- `/tests-browser` - Tests that run in a browser
- `/test-cli` - Tests that run in the CLI
- `/websocket-browser-client` - A browser based WebSocket Client app
- `/websocket-node-server` - A Node based WebSocket Server app

---

# Running the Examples

Some of the tests require the WebSocket Server application to be running to be 100% successful

## tests-cli/mocha-chai.spec.js
- Mocha, Chai in CLI
> `npx mocha ./tests-cli/mocha-chai.spec.js`

## tests-browser/mocha-chai.html
- Mocha, Chai in Browser
> `start chrome ./tests-browser/mocha-chai.html`

## /server/server.js
Local Websocket Server in Node
> `node ./websocket-server/server.js`

## tests-browser/mocha-chai-sinon.html
- Mocha, Chai, Sinon in Browser
> `start chrome ./tests-browser/mocha-chai-sinon.html`

## tests-browser/mocha-chai-sinon-mocksocket.html
- Tests running in a Browser
- Mocha, Chai, Sinon
- Mock-Socket mocks a socket.io server implementation
> `start chrome ./tests-browser/mocha-chai-sinon.html`

## tests-browser/mocha-chai-sinon-mocksocket-reconnectingwebsocket.html
- Tests running in a Browser
- Mocha, Chai, Sinon
- Mock-Socket mocks a socket.io server implementation
- Reconnecting-Websocket automaticaly reconnects if WebSocket connection is lost
> `start chrome ./tests-browser/mocha-chai-sinon-mocksocket-reconnectingwebsocket.html`

## /client
WebSocket Client Application
> `start chrome ./websocket-client/index.html`

## test-browsers/app-spec.html
- Tests running in a Browser
- Mocha, Chai, Sinon
- [Mock-WebSocket](https://github.com/PhillipRC/mock-websocket) a 'generic' WebSocket server implementation
> `start chrome ./tests-browser/app-spec.html`
