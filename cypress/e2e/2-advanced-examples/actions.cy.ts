/// <reference types="cypress" />

context('Actions', () => {
  beforeEach(() => {
    cy.visit('https://example.cypress.io/commands/actions');
  });

  // https://on.cypress.io/interacting-with-elements

  it('.type() - type into a DOM element', () => {
    // https://on.cypress.io/type
    cy.get('.action-email')
      .type('fake@email.com')
      .should('have.value', 'fake@email.com')

      .type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
      .type('{del}{selectall}{backspace}')

      .type('{alt}{option}') //these are equivalent
      .type('{ctrl}{control}') //these are equivalent
      .type('{meta}{command}{cmd}') //these are equivalent
      .type('{shift}')

      .type('slow.typing@email.com', { delay: 100 })
      .should('have.value', 'slow.typing@email.com');

    cy.get('.action-disabled')

      .type('disabled error checking', { force: true })
      .should('have.value', 'disabled error checking');
  });

  it('.focus() - focus on a DOM element', () => {
    // https://on.cypress.io/focus
    cy.get('.action-focus')
      .focus()
      .should('have.class', 'focus')
      .prev()
      .should('have.attr', 'style', 'color: orange;');
  });

  it('.blur() - blur off a DOM element', () => {
    // https://on.cypress.io/blur
    cy.get('.action-blur')
      .type('About to blur')
      .blur()
      .should('have.class', 'error')
      .prev()
      .should('have.attr', 'style', 'color: red;');
  });

  it('.clear() - clears an input or textarea element', () => {
    // https://on.cypress.io/clear
    cy.get('.action-clear')
      .type('Clear this text')
      .should('have.value', 'Clear this text')
      .clear()
      .should('have.value', '');
  });

  it('.submit() - submit a form', () => {
    // https://on.cypress.io/submit
    cy.get('.action-form').find('[type="text"]').type('HALFOFF');

    cy.get('.action-form')
      .submit()
      .next()
      .should('contain', 'Your form has been submitted!');
  });

  it('.click() - click on a DOM element', () => {
    // https://on.cypress.io/click
    cy.get('.action-btn').click();

    cy.get('#action-canvas').click();

    cy.get('#action-canvas').click('topLeft');
    cy.get('#action-canvas').click('top');
    cy.get('#action-canvas').click('topRight');
    cy.get('#action-canvas').click('left');
    cy.get('#action-canvas').click('right');
    cy.get('#action-canvas').click('bottomLeft');
    cy.get('#action-canvas').click('bottom');
    cy.get('#action-canvas').click('bottomRight');

    cy.get('#action-canvas')
      .click(80, 75)
      .click(170, 75)
      .click(80, 165)
      .click(100, 185)
      .click(125, 190)
      .click(150, 185)
      .click(170, 165);

    cy.get('.action-labels>.label').click({ multiple: true });

    cy.get('.action-opacity>.btn').click({ force: true });
  });

  it('.dblclick() - double click on a DOM element', () => {
    // https://on.cypress.io/dblclick

    cy.get('.action-div').dblclick().should('not.be.visible');
    cy.get('.action-input-hidden').should('be.visible');
  });

  it('.rightclick() - right click on a DOM element', () => {
    // https://on.cypress.io/rightclick

    cy.get('.rightclick-action-div').rightclick().should('not.be.visible');
    cy.get('.rightclick-action-input-hidden').should('be.visible');
  });

  it('.check() - check a checkbox or radio element', () => {
    // https://on.cypress.io/check

    cy.get('.action-checkboxes [type="checkbox"]')
      .not('[disabled]')
      .check()
      .should('be.checked');

    cy.get('.action-radios [type="radio"]')
      .not('[disabled]')
      .check()
      .should('be.checked');

    cy.get('.action-radios [type="radio"]')
      .check('radio1')
      .should('be.checked');

    cy.get('.action-multiple-checkboxes [type="checkbox"]')
      .check(['checkbox1', 'checkbox2'])
      .should('be.checked');

    cy.get('.action-checkboxes [disabled]')
      .check({ force: true })
      .should('be.checked');

    cy.get('.action-radios [type="radio"]')
      .check('radio3', { force: true })
      .should('be.checked');
  });

  it('.uncheck() - uncheck a checkbox element', () => {
    // https://on.cypress.io/uncheck

    cy.get('.action-check [type="checkbox"]')
      .not('[disabled]')
      .uncheck()
      .should('not.be.checked');

    cy.get('.action-check [type="checkbox"]')
      .check('checkbox1')
      .uncheck('checkbox1')
      .should('not.be.checked');

    cy.get('.action-check [type="checkbox"]')
      .check(['checkbox1', 'checkbox3'])
      .uncheck(['checkbox1', 'checkbox3'])
      .should('not.be.checked');

    cy.get('.action-check [disabled]')
      .uncheck({ force: true })
      .should('not.be.checked');
  });

  it('.select() - select an option in a <select> element', () => {
    // https://on.cypress.io/select

    cy.get('.action-select').should('have.value', '--Select a fruit--');

    cy.get('.action-select').select('apples');

    cy.get('.action-select').should('have.value', 'fr-apples');

    cy.get('.action-select-multiple')
      .select(['apples', 'oranges', 'bananas'])

      .invoke('val')
      .should('deep.equal', ['fr-apples', 'fr-oranges', 'fr-bananas']);

    cy.get('.action-select')
      .select('fr-bananas')

      .should('have.value', 'fr-bananas');

    cy.get('.action-select-multiple')
      .select(['fr-apples', 'fr-oranges', 'fr-bananas'])
      .invoke('val')
      .should('deep.equal', ['fr-apples', 'fr-oranges', 'fr-bananas']);

    cy.get('.action-select-multiple')
      .invoke('val')
      .should('include', 'fr-oranges');
  });

  it('.scrollIntoView() - scroll an element into view', () => {
    // https://on.cypress.io/scrollintoview

    cy.get('#scroll-horizontal button').should('not.be.visible');

    cy.get('#scroll-horizontal button').scrollIntoView().should('be.visible');

    cy.get('#scroll-vertical button').should('not.be.visible');

    cy.get('#scroll-vertical button').scrollIntoView().should('be.visible');

    cy.get('#scroll-both button').should('not.be.visible');

    cy.get('#scroll-both button').scrollIntoView().should('be.visible');
  });

  it('.trigger() - trigger an event on a DOM element', () => {
    // https://on.cypress.io/trigger

    cy.get('.trigger-input-range')
      .invoke('val', 25)
      .trigger('change')
      .get('input[type=range]')
      .siblings('p')
      .should('have.text', '25');
  });

  it('cy.scrollTo() - scroll the window or element to a position', () => {
    // https://on.cypress.io/scrollto

    cy.scrollTo('bottom');

    cy.get('#scrollable-horizontal').scrollTo('right');

    cy.get('#scrollable-vertical').scrollTo(250, 250);

    cy.get('#scrollable-both').scrollTo('75%', '25%');

    cy.get('#scrollable-vertical').scrollTo('center', { easing: 'linear' });

    cy.get('#scrollable-both').scrollTo('center', { duration: 2000 });
  });
});
