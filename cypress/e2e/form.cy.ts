/// <reference types="cypress" />

describe('form', () => {
  it('has validation', () => {
    cy.visit('/card-form');
    cy.contains('button', /submit/i).click();
    cy.get('div[role="alert"]').should('not.have.lengthOf', 0);
  });
});
