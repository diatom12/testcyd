import urlPaths from "../../fixtures/urlPaths.json";

export default {
  usernameField: '[data-test="username"]',
  passwordField: '[data-test="password"]',
  confirmButton: '[data-test="login-button"]',
  menuContainer: '[data-test="primary-header"]#menu_button_container',
  burgerMenuButton: "#react-burger-menu-btn",
  logoutButton: '[data-test="logout-sidebar-link"]',
  loginCredentialsSection: '[data-test="login-credentials-container"]',
  loginPasswordSection: '[data-test="login-password"]',
  errorBar: '[data-test="error"]',
  errorBtn: '[data-test="error-button"]',

  login(username: string, password: string): void {
    cy.get(this.usernameField).type(username, { delay: 0 });
    cy.get(this.passwordField).type(password, { delay: 0 });
    this.clickLoginButton();
  },

  verifyUrlAfterLogin(): void {
    cy.url().should(
      "contain",
      Cypress.config("baseUrl") + urlPaths.default.userHomepage
    );
  },

  logout(): void {
    cy.get(this.menuContainer).find(this.burgerMenuButton).click();
    cy.get(this.logoutButton).click();
    cy.url().should("contain", Cypress.config("baseUrl"));
  },

  clickLoginButton(): void {
    cy.get(this.confirmButton).click();
  },

  verifyLoginBtnText(message: string): void {
    cy.get(this.confirmButton).should("be.visible").contains(message);
  },

  verifyFormFieldText(
    userPlaceholder: string,
    passwordPlaceholder: string
  ): void {
    cy.get(this.usernameField).should(
      "have.attr",
      "placeholder",
      userPlaceholder
    );
    cy.get(this.passwordField).should(
      "have.attr",
      "placeholder",
      passwordPlaceholder
    );
  },

  verifyCredentialsSection(message: string): void {
    cy.get(this.loginCredentialsSection).contains(message);
  },

  verifyErrorBar(message: string): void {
    cy.get(this.errorBar).should("be.visible").contains(message);
    cy.get(this.errorBtn).should("be.visible");
  },
};
