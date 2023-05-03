/// <reference types="Cypress" />

describe("Calc-Vue-Lator Test Suite", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#calc-btn-clear").click();
  });

  it("Loads the App", () => {
    cy.get("#calc-display").should("have.value", "0.");
  });

  it('Clicks "3"', () => {
    cy.get("#calc-btn-3").click();
    cy.get("#calc-display").should("have.value", "3.");
  });

  it('Adds "2" to "6"', () => {
    cy.get("#calc-btn-6").click();
    cy.get("#calc-display").should("have.value", "6.");
    cy.get("#calc-btn-add").click();
    cy.get("#calc-display").should("have.value", "6.");
    cy.get("#calc-btn-2").click();
    cy.get("#calc-display").should("have.value", "2.");
    cy.get("#calc-btn-equal").click();
    cy.get("#calc-display").should("have.value", "8.");
  });

  it('Subtracts "2" from "6"', () => {
    cy.get("#calc-btn-6").click();
    cy.get("#calc-display").should("have.value", "6.");
    cy.get("#calc-btn-subtract").click();
    cy.get("#calc-display").should("have.value", "6.");
    cy.get("#calc-btn-2").click();
    cy.get("#calc-display").should("have.value", "2.");
    cy.get("#calc-btn-equal").click();
    cy.get("#calc-display").should("have.value", "4.");
  });

  it('Multiplies "6" by "2"', () => {
    cy.get("#calc-btn-6").click();
    cy.get("#calc-display").should("have.value", "6.");
    cy.get("#calc-btn-multiply").click();
    cy.get("#calc-display").should("have.value", "6.");
    cy.get("#calc-btn-2").click();
    cy.get("#calc-display").should("have.value", "2.");
    cy.get("#calc-btn-equal").click();
    cy.get("#calc-display").should("have.value", "12.");
  });

  it('Divides "6" by "2"', () => {
    cy.get("#calc-btn-6").click();
    cy.get("#calc-display").should("have.value", "6.");
    cy.get("#calc-btn-divide").click();
    cy.get("#calc-display").should("have.value", "6.");
    cy.get("#calc-btn-2").click();
    cy.get("#calc-display").should("have.value", "2.");
    cy.get("#calc-btn-equal").click();
    cy.get("#calc-display").should("have.value", "3.");
  });

  it('Divides "6" by "0"', () => {
    cy.get("#calc-btn-6").click();
    cy.get("#calc-display").should("have.value", "6.");
    cy.get("#calc-btn-divide").click();
    cy.get("#calc-display").should("have.value", "6.");
    cy.get("#calc-btn-0").click();
    cy.get("#calc-display").should("have.value", "0.");
    cy.get("#calc-btn-equal").click();
    cy.get("#calc-display").should("have.value", "Error.");
  });

  it('Calculates "2^5"', () => {
    cy.get("#calc-btn-2").click();
    cy.get("#calc-btn-multiply").click();
    cy.get("#calc-btn-2").click();
    cy.get("#calc-btn-equal").click();
    cy.get("#calc-display").should("have.value", "4.");
    cy.get("#calc-btn-equal").click();
    cy.get("#calc-display").should("have.value", "8.");
    cy.get("#calc-btn-equal").click();
    cy.get("#calc-display").should("have.value", "16.");
  });

  it("Calculate 4*5-25*(-1)", () => {
    cy.get("#calc-btn-4").click();
    cy.get("#calc-display").should("have.value", "4.");
    cy.get("#calc-btn-multiply").click();
    cy.get("#calc-display").should("have.value", "4.");
    cy.get("#calc-btn-5").click();
    cy.get("#calc-display").should("have.value", "5.");
    cy.get("#calc-btn-subtract").click();
    cy.get("#calc-display").should("have.value", "20.");
    cy.get("#calc-btn-2").click();
    cy.get("#calc-display").should("have.value", "2.");
    cy.get("#calc-btn-5").click();
    cy.get("#calc-display").should("have.value", "25.");
    cy.get("#calc-btn-multiply").click();
    cy.get("#calc-display").should("have.value", "-5.");
    cy.get("#calc-btn-1").click();
    cy.get("#calc-display").should("have.value", "1.");
    cy.get("#calc-btn-negate").click();
    cy.get("#calc-display").should("have.value", "-1.");
    cy.get("#calc-btn-equal").click();
    cy.get("#calc-display").should("have.value", "5.");
  });
});
