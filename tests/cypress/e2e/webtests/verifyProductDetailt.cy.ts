import loginForm from "../../support/pageObject/loginForm";
import cartPage from "../../support/pageObject/cartPage";
import inventoryPage from "../../support/pageObject/inventoryPage";

describe("Verify product detail as error user", () => {
  beforeEach(function () {
    cy.window().then((window) => {
      window.localStorage.clear();
      window.sessionStorage.clear();

      cy.fixture("users").as("users");
      cy.fixture("urlPaths").as("urlPaths");
      cy.fixture("messages").as("messages");
      cy.fixture("products").as("products");
      cy.visit("/");
    });
  });

  afterEach(() => {
    cy.window().then((win) => {
      win.location.href = "about:blank";
    });
  });

  it("Login as error user and verify product detail", function () {
    loginForm.login(this.users.error.username, this.users.error.password);
    loginForm.verifyUrlAfterLogin();

    inventoryPage.verifySecondHeaderText(
      this.messages.default.secondHeaderText
    );
    cartPage.clearCartAndReturnToProducts(this.urlPaths.default.cart);
    inventoryPage.checkAllProductBoxes();
    inventoryPage.openProductDetailByName(this.products.tshirt.name);
    inventoryPage.verifyProductUrl(this.products.tshirt);
  });
});
