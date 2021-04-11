/// <reference types="cypress" />

context('Tests using a real server', () => {
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
})
