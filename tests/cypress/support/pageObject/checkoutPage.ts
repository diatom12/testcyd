export default {
  checkoutFormContainer: '[data-test="checkout-info-container"]',
  headerName: '[data-test="secondary-header"]',
  firstNameInput: '[data-test="firstName"]',
  lastNameInput: '[data-test="lastName"]',
  postalCodeInput: '[data-test="postalCode"]',
  continueBtn: '[data-test="continue"]',
  cancelBtn: '[data-test="cancel"]',
  paymentInfo: '[data-test="payment-info-label"]',
  paymentValue: '[data-test="payment-info-value"]',
  shippingInfo: '[data-test="shipping-info-label"]',
  shippingValue: '[data-test="shipping-info-value"]',
  totalInfo: '[data-test="total-info-label"]',
  subtotallabel: '[data-test="subtotal-label"]',
  finishbtn: '[data-test="finish"]',

  verifyCheckoutForm(first: string, last: string, postal: string): void {
    cy.get(this.firstNameInput).should("have.attr", "placeholder", first);
    cy.get(this.lastNameInput).should("have.attr", "placeholder", last);
    cy.get(this.postalCodeInput).should("have.attr", "placeholder", postal);
  },

  verifyCheckoutFormContainer(): void {
    cy.get(this.checkoutFormContainer).within(() => {
      cy.get(this.firstNameInput).should("exist");
      cy.get(this.lastNameInput).should("exist");
      cy.get(this.postalCodeInput).should("exist");
    });
  },

  fillCheckoutForm(first: string, last: string, postal: string): void {
    cy.get(this.firstNameInput).clear().type(first);
    cy.get(this.lastNameInput).clear().type(last);
    cy.get(this.postalCodeInput).clear().type(postal);
  },

  verifyHeaderText(message: string): void {
    cy.get(this.headerName).should("be.visible").contains(message);
  },

  goToCheckoutStepTwo(urlPath: string): void {
    cy.get(this.continueBtn).should("be.visible").click();
    cy.url().should("include", urlPath);
  },

  clickCancelCheckout(urlPath: string): void {
    cy.get(this.cancelBtn).should("be.visible").click();
    cy.url().should("include", urlPath);
  },

  clickFinishCheckout(): void {
    cy.get(this.finishbtn).should("be.visible").click();
  },

  verifyFinishComponents(
    paymentTitle: string,
    paymentValue: string,
    shippingTitle: string,
    shippingValue: string,
    totalTitle: string
  ): void {
    cy.get(this.paymentInfo).should("be.visible").contains(paymentTitle);
    cy.get(this.paymentValue).should("be.visible").contains(paymentValue);
    cy.get(this.shippingInfo).should("be.visible").contains(shippingTitle);
    cy.get(this.shippingValue).should("be.visible").contains(shippingValue);
    cy.get(this.totalInfo).should("be.visible").contains(totalTitle);
  },
};
