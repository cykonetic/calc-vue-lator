/// <reference types="Cypress" />

describe("Calc-Vue-Lator Test Suite", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.contains("C").click();
  });

  it("Loads the App", () => {
    cy.get('input[type="text"]').should("have.value", "0.");
  });

  it('Clicks "3"', () => {
    cy.contains("3").click();
    cy.get('input[type="text"]').should("have.value", "3.");
  });

  it('Adds "2" to "6"', () => {
    cy.contains("6").click();
    cy.get('input[type="text"]').should("have.value", "6.");
    cy.contains("+").click();
    cy.get('input[type="text"]').should("have.value", "6.");
    cy.contains("2").click();
    cy.get('input[type="text"]').should("have.value", "2.");
    cy.contains("=").click();
    cy.get('input[type="text"]').should("have.value", "8.");
  });

  it('Subtracts "2" from "6"', () => {
    cy.contains("6").click();
    cy.get('input[type="text"]').should("have.value", "6.");
    cy.contains("-").click();
    cy.get('input[type="text"]').should("have.value", "6.");
    cy.contains("2").click();
    cy.get('input[type="text"]').should("have.value", "2.");
    cy.contains("=").click();
    cy.get('input[type="text"]').should("have.value", "4.");
  });

  it('Multiplies "6" by "2"', () => {
    cy.contains("6").click();
    cy.get('input[type="text"]').should("have.value", "6.");
    cy.contains("×").click();
    cy.get('input[type="text"]').should("have.value", "6.");
    cy.contains("2").click();
    cy.get('input[type="text"]').should("have.value", "2.");
    cy.contains("=").click();
    cy.get('input[type="text"]').should("have.value", "12.");
  });

  it('Divides "6" by "2"', () => {
    cy.contains("6").click();
    cy.get('input[type="text"]').should("have.value", "6.");
    cy.contains("÷").click();
    cy.get('input[type="text"]').should("have.value", "6.");
    cy.contains("2").click();
    cy.get('input[type="text"]').should("have.value", "2.");
    cy.contains("=").click();
    cy.get('input[type="text"]').should("have.value", "3.");
  });

  it('Divides "6" by "0"', () => {
    cy.contains("6").click();
    cy.get('input[type="text"]').should("have.value", "6.");
    cy.contains("÷").click();
    cy.get('input[type="text"]').should("have.value", "6.");
    cy.contains("0").click();
    cy.get('input[type="text"]').should("have.value", "0.");
    cy.contains("=").click();
    cy.get('input[type="text"]').should("have.value", "Error.");
  });

  it('Calculates "2^5"', () => {
    cy.contains("2").click();
    cy.contains("×").click();
    cy.contains("2").click();
    cy.contains("=").click();
    cy.get('input[type="text"]').should("have.value", "4.");
    cy.contains("=").click();
    cy.get('input[type="text"]').should("have.value", "8.");
    cy.contains("=").click();
    cy.get('input[type="text"]').should("have.value", "16.");
  });
});
