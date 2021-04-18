/// <reference types="cypress" />

import waitForEvent from '../support/WaitForEvent'
import App from '../../websocket-browser-client/App.mjs'
import WebSocketMockServer from '../../websocket-mock-server/websocket-mock-server'

context('Tests instantiating the App Class using WebSocket-Mock-Server', () => {

  let app;
  let spyApp;
  let mockServer;

  before(() => {
    // setup the mock websocket server
    mockServer = WebSocketMockServer('ws://localhost:8080')
    // create an instance of the App
    app = new App('ws://localhost:8080')
    // spy on the App object with Sinon
    spyApp = Cypress.sinon.spy(app);
  })

  after(() => {
    // stop/remove mock websocket server
    mockServer.stop()
  })

  it("should have created app", () => {
    expect(app).to.exist;
  })

  it("should wait for connection to open", async () => {
    // wait for connection to open if not already open
    if (app.ws.readyState !== WebSocket.OPEN) {
      await waitForEvent(app.ws, 'open')
    }
    expect(app.ws.readyState).to.equal(WebSocket.OPEN)
  });

  it("should have called App.handleServerMessage()", function () {
    expect(spyApp.handleServerMessage).to.be.called
    expect(spyApp.handleServerMessage.calledOnce).to.be.true;
    expect(spyApp.handleServerMessage.callCount).to.equal(1);
  });

})
