/// <reference types="cypress" />

import requiredExample from '../../fixtures/example.json';

context('Files', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/files');
  });

  beforeEach(() => {
    cy.fixture('example.json').as('example');
  });

  it('cy.fixture() - load a fixture', () => {
    // https://on.cypress.io/fixture

    cy.intercept('GET', '**/comments/*', { fixture: 'example.json' }).as(
      'getComment'
    );

    cy.get('.fixture-btn').click();

    cy.wait('@getComment')
      .its('response.body')
      .should('have.property', 'name')
      .and('include', 'Using fixtures to represent data');
  });

  it('cy.fixture() or require - load a fixture', function () {
    expect(this.example, 'fixture in the test context').to.deep.equal(
      requiredExample
    );

    cy.wrap(this.example).should('deep.equal', requiredExample);
  });

  it('cy.readFile() - read file contents', () => {
    // https://on.cypress.io/readfile

    cy.readFile(Cypress.config('configFile')).then((config) => {
      expect(config).to.be.an('string');
    });
  });

  it('cy.writeFile() - write to a file', () => {
    // https://on.cypress.io/writefile

    cy.request('https://jsonplaceholder.cypress.io/users').then(
      (response: Cypress.Response<Cypress.FileContents>) => {
        cy.writeFile('cypress/fixtures/users.json', response.body);
      }
    );

    cy.fixture('users').should((users: { name?: string }[]) => {
      expect(users[0].name).to.exist;
    });

    cy.writeFile('cypress/fixtures/profile.json', {
      id: 8739,
      name: 'Jane',
      email: 'jane@example.com',
    });

    cy.fixture('profile').should((profile: { name: string }) => {
      expect(profile.name).to.eq('Jane');
    });
  });
});
