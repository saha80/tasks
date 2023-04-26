/// <reference types="cypress" />

context('Querying', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/querying');
  });

  it('cy.get() - query DOM elements', () => {
    // https://on.cypress.io/get

    cy.get('#query-btn').should('contain', 'Button');

    cy.get('.query-btn').should('contain', 'Button');

    cy.get('#querying .well>button:first').should('contain', 'Button');

    cy.get('[data-test-id="test-example"]').should('have.class', 'example');

    cy.get('[data-test-id="test-example"]')
      .invoke('attr', 'data-test-id')
      .should('equal', 'test-example');

    cy.get('[data-test-id="test-example"]')
      .invoke('css', 'position')
      .should('equal', 'static');

    // https://on.cypress.io/assertions
    cy.get('[data-test-id="test-example"]')
      .should('have.attr', 'data-test-id', 'test-example')
      .and('have.css', 'position', 'static');
  });

  it('cy.contains() - query DOM elements with matching content', () => {
    // https://on.cypress.io/contains
    cy.get('.query-list').contains('bananas').should('have.class', 'third');

    cy.get('.query-list').contains(/^b\w+/).should('have.class', 'third');

    cy.get('.query-list').contains('apples').should('have.class', 'first');

    cy.get('#querying')
      .contains('ul', 'oranges')
      .should('have.class', 'query-list');

    cy.get('.query-button').contains('Save Form').should('have.class', 'btn');
  });

  it('.within() - query DOM elements within a specific element', () => {
    // https://on.cypress.io/within
    cy.get('.query-form').within(() => {
      cy.get('input:first').should('have.attr', 'placeholder', 'Email');
      cy.get('input:last').should('have.attr', 'placeholder', 'Password');
    });
  });

  it('cy.root() - query the root DOM element', () => {
    // https://on.cypress.io/root

    cy.root().should('match', 'html');

    cy.get('.query-ul').within(() => {
      cy.root().should('have.class', 'query-ul');
    });
  });

  it('best practices - selecting elements', () => {
    // https://on.cypress.io/best-practices#Selecting-Elements
    cy.get('[data-cy=best-practices-selecting-elements]').within(() => {
      cy.get('button').click();

      cy.get('.btn.btn-large').click();

      cy.get('[name=submission]').click();

      cy.get('#main').click();

      // has an ARIA role attribute
      cy.get('#main[role=button]').click();

      cy.contains('Submit').click();

      cy.get('[data-cy=submit]').click();
    });
  });
});
