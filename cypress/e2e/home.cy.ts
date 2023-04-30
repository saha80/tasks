/// <reference types="cypress" />

describe('cards', () => {
  it('click on card', () => {
    cy.visit('/');
    cy.get('img')
      .first()
      .click('center')
      .then(() => {
        cy.contains('span', /tags/i);
      });
  });

  it('search cards', () => {
    cy.visit('/');
    cy.get('input')
      .type('test{enter}')
      .then(() => {
        cy.get('img')
          .first()
          .click('center')
          .then(() => {
            cy.contains('span', /tags/i);
          });
      });
  });
});
