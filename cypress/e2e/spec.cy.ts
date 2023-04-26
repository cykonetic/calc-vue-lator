/// <reference types="Cypress" />

describe("Calc-Vue-Lator Test Suite", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it('Loaded Page', () => {
    cy.get('input[type="text"]')
      .contains('0');
  });

  it('Clicked "3"', () => {
    cy.contains('3')
      .click()
      .get('input[type="text"]')
      .contains('3');
  });
});
