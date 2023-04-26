/// <reference types="cypress" />

context('Misc', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/misc');
  });

  it('.end() - end the command chain', () => {
    // https://on.cypress.io/end

    cy.get('.misc-table').within(() => {
      cy.contains('Cheryl').click().end();

      cy.contains('Charles').click();
    });
  });

  it('cy.exec() - execute a system command', () => {
    // https://on.cypress.io/exec

    // https://on.cypress/io/platform
    cy.log(`Platform ${Cypress.platform} architecture ${Cypress.arch}`);

    // https://github.com/cypress-io/cypress/issues/5169

    if (Cypress.platform === 'win32' && Cypress.env('circle')) {
      cy.log('Skipping test on CircleCI');

      return;
    }

    // https://github.com/cypress-io/cypress/issues/6718
    if (Cypress.platform === 'linux' && Cypress.env('shippable')) {
      cy.log('Skipping test on ShippableCI');

      return;
    }

    cy.exec('echo Jane Lane').its('stdout').should('contain', 'Jane Lane');

    if (Cypress.platform === 'win32') {
      cy.exec(`print ${Cypress.config('configFile')}`)
        .its('stderr')
        .should('be.empty');
    } else {
      cy.exec(`cat ${Cypress.config('configFile')}`)
        .its('stderr')
        .should('be.empty');

      cy.exec('pwd').its('code').should('eq', 0);
    }
  });

  it('cy.focused() - get the DOM element that has focus', () => {
    // https://on.cypress.io/focused
    cy.get('.misc-form').find('#name').click();
    cy.focused().should('have.id', 'name');

    cy.get('.misc-form').find('#description').click();
    cy.focused().should('have.id', 'description');
  });

  context('Cypress.Screenshot', function () {
    it('cy.screenshot() - take a screenshot', () => {
      // https://on.cypress.io/screenshot
      cy.screenshot('my-image');
    });

    it('Cypress.Screenshot.defaults() - change default config of screenshots', function () {
      Cypress.Screenshot.defaults({
        blackout: ['.foo'],
        capture: 'viewport',
        clip: { x: 0, y: 0, width: 200, height: 200 },
        scale: false,
        disableTimersAndAnimations: true,
        screenshotOnRunFailure: true,
        onBeforeScreenshot() {
          //
        },
        onAfterScreenshot() {
          //
        },
      });
    });
  });

  it('cy.wrap() - wrap an object', () => {
    // https://on.cypress.io/wrap
    cy.wrap({ foo: 'bar' })
      .should('have.property', 'foo')
      .and('include', 'bar');
  });
});
