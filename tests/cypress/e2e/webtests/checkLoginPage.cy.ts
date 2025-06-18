import loginPage from "../../support/pageObject/loginPage";
import loginForm from "../../support/pageObject/loginForm";

describe("Login page tests", () => {
  beforeEach(function () {
    cy.window().then((window) => {
      window.localStorage.clear();
      window.sessionStorage.clear();
    });

    cy.fixture("users").as("users");
    cy.fixture("urlPaths").as("urlPaths");
    cy.fixture("messages").as("messages");
    cy.visit("/");
  });
  afterEach(() => {
    cy.window().then((win) => {
      win.location.href = "about:blank";
    });
  });

  it("Loginpage - check loginpage components as anonym", function () {
    loginPage.verifyHeaderText(this.messages.default.headerName);
    loginPage.verifyLoginFormContainer();
    loginForm.verifyLoginBtnText(this.messages.default.loginButton);
    loginForm.verifyFormFieldText(
      this.messages.default.usernamePlaceholder,
      this.messages.default.passwordPlaceholder
    );
    loginForm.verifyCredentialsSection(
      this.messages.default.credentialsSection
    );
    loginForm.clickLoginButton();
  });

  it("Loginpage - login without data", function () {
    loginForm.clickLoginButton();
    loginForm.verifyErrorBar(this.messages.default.errorLoginMessage);
  });

  it("Loginpage - login as visual user", function () {
    loginForm.login(this.users.visual.username, this.users.visual.password);
    loginForm.verifyUrlAfterLogin();
  });

  it("Loginpage - login as locked user", function () {
    loginForm.login(this.users.locked.username, this.users.locked.password);
    loginForm.verifyErrorBar(this.messages.default.errorLoginMessageLocked);
  });
});
