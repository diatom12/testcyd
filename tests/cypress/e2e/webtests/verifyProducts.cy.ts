import loginForm from "../../support/pageObject/loginForm";
import cartPage from "../../support/pageObject/cartPage";
import inventoryPage from "../../support/pageObject/inventoryPage";

describe("Verify products as visual user", () => {
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

  it("Login as visual user and verify products and sorting", function () {
    loginForm.login(this.users.visual.username, this.users.visual.password);
    loginForm.verifyUrlAfterLogin();

    inventoryPage.verifySecondHeaderText(
      this.messages.default.secondHeaderText
    );
    cartPage.clearCartAndReturnToProducts(this.urlPaths.default.cart);

    inventoryPage.addProductByName(this.products.jacket.name);
    cartPage.goToShoppingCart(this.urlPaths.default.cart);

    inventoryPage.validateProductSuccessAddedToCart(
      inventoryPage.getAddToCartSelector(this.products.jacket.name),
      1
    );
    cartPage.continueShopping();
    inventoryPage.checkAllProductBoxes();
    inventoryPage.verifySortComponentVisibleAndValid(
      this.messages.default.azValue,
      this.messages.default.zaValue,
      this.messages.default.lowToHighValue,
      this.messages.default.highToLowValue
    );
    inventoryPage.selectSortOption(this.messages.default.zaValue);
    inventoryPage.verifyFirstProductName(this.products.red.name);
  });
});
