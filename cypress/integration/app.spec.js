/// <reference types="cypress" />

import waitForEvent from '../support/WaitForEvent'
import App from '../../websocket-browser-client/App.mjs'

context('Tests instantiating the App Class using a real server', () => {

  let app;
  let spyApp;

  before(() => {
    // create an instance of the App
    app = new App('ws://localhost:8080')
    // spy on the App object with Sinon
    spyApp = Cypress.sinon.spy(app);
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

context('Tests loading the websocket-browser-client using a real server', () => {
  before(() => {
    cy.visit('http://localhost:3000/websocket-browser-client/index.html')
  })
  it('should display `ack`', () => {
    cy.get('[data-test=output]').should('contain', 'ack');
  })
  it('should not display `echo`', () => {
    cy.get('[data-test=output]').should('not.contain', 'echo');
  })
  it('should select echo option and display `echo`', () => {
    cy.get('[data-test=echoOption]').click();
    cy.get('[data-test=output]').should('contain', 'echo');
  })
  after(() => {
    cy.screenshot()
  })
})
