/// <reference types="cypress" />

describe('about page', () => {
  it('available', () => {
    cy.visit('/about-us');
    cy.contains('a', /unsplash/i);
  });
});
