/// <reference types="cypress" />
import { StatusCodes } from 'http-status-codes'

import waitForEvent from '../support/WaitForEvent'

context('Test the HTTP Server', () => {

  it("should return OK", () => {
    // make a request
    cy.request('http://localhost:3000/tests-browser/app.html').then(
      (response) => {
        // test that the response was OK
        expect(response.status).to.equal(StatusCodes.OK)
      }
    )
  })

})

context('Test the WebSocket Server', () => {

  let ws;
  let openHandlerStub = Cypress.sinon.stub()
  let messageHandlerStub = Cypress.sinon.stub()

  before(() => {
    // create a WebSocket
    ws = new WebSocket('ws://localhost:8080')
    // add stubs to track events
    ws.addEventListener('open', openHandlerStub)
    ws.addEventListener('message', messageHandlerStub)
  })

  it("should wait for connection to open", async () => {
    // wait for connection to open, if not already open
    if (ws.readyState !== WebSocket.OPEN) {
      await waitForEvent(ws, 'open')
    }
    // test for the correct state
    expect(ws.readyState).to.equal(WebSocket.OPEN)
    // test that the stub was called
    expect(openHandlerStub.callCount).to.equal(1)
  });

  it("should send then receive an `echo`", async () => {
    // save the call count at the start of this test
    let callCount = messageHandlerStub.callCount
    // send message via WebSocket to the server
    ws.send('echo')
    // wait for the message event to fire
    await waitForEvent(ws, 'message')
    // test that the event handler stub was called
    expect(messageHandlerStub.callCount).to.equal(callCount + 1);
    // get the arguments sent to the stub
    const args = messageHandlerStub.getCall(callCount).args[0];
    // test the return data
    expect(args.data).to.equal('echo');
  });

})