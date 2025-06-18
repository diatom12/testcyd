export default {
  loginFormContainer: '[data-test="username"]',
  headerName: ".login_logo",

  verifyLoginFormContainer(): void {
    cy.get(this.loginFormContainer).should("be.visible");
  },

  verifyHeaderText(message: string): void {
    cy.get(this.headerName).should("be.visible").contains(message);
  },
};
