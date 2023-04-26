/// <reference types="cypress" />
// remove no check once Cypress.sinon is typed
// https://github.com/cypress-io/cypress/issues/6720

context('Spies, Stubs, and Clock', () => {
  it('cy.spy() - wrap a method in a spy', () => {
    // https://on.cypress.io/spy
    cy.visit('https://example.cypress.io/commands/spies-stubs-clocks');

    const obj = {
      foo() {
        //
      },
    };

    const spy = cy.spy(obj, 'foo').as('anyArgs');

    obj.foo();

    expect(spy).to.be.called;
  });

  it('cy.spy() retries until assertions pass', () => {
    cy.visit('https://example.cypress.io/commands/spies-stubs-clocks');

    const obj = {
      foo: (x: unknown) => {
        console.log('obj.foo called with', x);
      },
    };

    cy.spy(obj, 'foo').as('foo');

    setTimeout(() => {
      obj.foo('first');
    }, 500);

    setTimeout(() => {
      obj.foo('second');
    }, 2500);

    cy.get('@foo').should('have.been.calledTwice');
  });

  it('cy.stub() - create a stub and/or replace a function with stub', () => {
    // https://on.cypress.io/stub
    cy.visit('https://example.cypress.io/commands/spies-stubs-clocks');

    const obj = {
      foo: (a: string, b: string) => {
        console.log('a', a, 'b', b);
      },
    };

    const stub = cy.stub(obj, 'foo').as('foo');

    obj.foo('foo', 'bar');

    expect(stub).to.be.called;
  });

  it('cy.clock() - control time in the browser', () => {
    // https://on.cypress.io/clock

    const now = new Date(Date.UTC(2017, 2, 14)).getTime();

    cy.clock(now);
    cy.visit('https://example.cypress.io/commands/spies-stubs-clocks');
    cy.get('#clock-div').click().should('have.text', '1489449600');
  });

  it('cy.tick() - move time in the browser', () => {
    // https://on.cypress.io/tick

    const now = new Date(Date.UTC(2017, 2, 14)).getTime();

    cy.clock(now);
    cy.visit('https://example.cypress.io/commands/spies-stubs-clocks');
    cy.get('#tick-div').click().should('have.text', '1489449600');

    cy.tick(10000);
    cy.get('#tick-div').click().should('have.text', '1489449610');
  });

  it('cy.stub() matches depending on arguments', () => {
    // https://sinonjs.org/releases/latest/matchers/
    const greeter = {
      greet: (name?: string) => {
        return `Hello, ${name as unknown as string}!`;
      },
    };

    cy.stub(greeter, 'greet')
      .callThrough()
      .withArgs(Cypress.sinon.match.string)
      .returns('Hi')
      .withArgs(Cypress.sinon.match.number)
      .throws(new Error('Invalid name'));

    expect(greeter.greet('World')).to.equal('Hi');
    expect(() => greeter.greet(42 as unknown as string)).to.throw(
      'Invalid name'
    );
    expect(greeter.greet).to.have.been.calledTwice;

    expect(greeter.greet()).to.equal('Hello, undefined!');
  });

  it('matches call arguments using Sinon matchers', () => {
    // https://sinonjs.org/releases/latest/matchers/
    const calculator = {
      add: (a: number, b: number) => {
        return a + b;
      },
    };

    const spy = cy.spy(calculator, 'add').as('add');

    expect(calculator.add(2, 3)).to.equal(5);

    expect(spy).to.be.calledWith(2, 3);

    expect(spy).to.be.calledWith(
      Cypress.sinon.match.number,
      Cypress.sinon.match.number
    );

    expect(spy).to.be.calledWith(
      Cypress.sinon.match(2),
      Cypress.sinon.match(3)
    );

    expect(spy).to.be.calledWith(Cypress.sinon.match.any, 3);

    expect(spy).to.be.calledWith(Cypress.sinon.match.in([1, 2, 3]), 3);

    const isEven = (x: number) => x % 2 === 0;

    expect(spy).to.be.calledWith(Cypress.sinon.match(isEven, 'isEven'), 3);

    const isGreaterThan = (limit: number) => (x: number) => x > limit;

    const isLessThan = (limit: number) => (x: number) => x < limit;

    expect(spy).to.be.calledWith(
      Cypress.sinon.match.number,
      Cypress.sinon
        .match(isGreaterThan(2), '> 2')
        .and(Cypress.sinon.match(isLessThan(4), '< 4'))
    );

    expect(spy).to.be.calledWith(
      Cypress.sinon.match.number,
      Cypress.sinon
        .match(isGreaterThan(200), '> 200')
        .or(Cypress.sinon.match(3))
    );

    cy.get('@add').should(
      'have.been.calledWith',
      Cypress.sinon.match.number,
      Cypress.sinon.match(3)
    );

    const { match: M } = Cypress.sinon;

    cy.get('@add').should('have.been.calledWith', M.number, M(3));
  });
});
