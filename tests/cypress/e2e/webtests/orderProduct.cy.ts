import inventoryPage from "../../support/pageObject/inventoryPage";
import loginForm from "../../support/pageObject/loginForm";
import cartPage from "../../support/pageObject/cartPage";
import checkoutPage from "../../support/pageObject/checkoutPage";

describe("Order product test as Standard user", () => {
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

  it("Login as standard user and order product Onesie", function () {
    loginForm.login(this.users.standard.username, this.users.standard.password);
    loginForm.verifyUrlAfterLogin();

    inventoryPage.verifySecondHeaderText(
      this.messages.default.secondHeaderText
    );
    cartPage.clearCartAndReturnToProducts(this.urlPaths.default.cart);

    inventoryPage.addProductByName(this.products.onesie.name);
    cartPage.goToShoppingCart(this.urlPaths.default.cart);
    inventoryPage.validateProductSuccessAddedToCart(
      inventoryPage.getAddToCartSelector(this.products.onesie.name),
      1
    );
    cartPage.goToShoppingCart(this.urlPaths.default.cart);
    cartPage.verifyItemInCart(
      this.products.onesie.name,
      this.products.onesie.price,
      this.products.onesie.description
    );
    cartPage.verifyCartComponents(
      this.messages.default.qtyInCart,
      this.messages.default.cartDescription,
      this.messages.default.continueShoppingBtn
    );
    cartPage.goToCheckout(this.urlPaths.default.checkoutStepOne);
    checkoutPage.verifyCheckoutFormContainer();
    checkoutPage.verifyHeaderText(this.messages.default.checkoutHeaderText);
    checkoutPage.verifyCheckoutForm(
      this.messages.default.firstNamePlaceholder,
      this.messages.default.lastNamePlaceholder,
      this.messages.default.postalCodePlaceholder
    );
    checkoutPage.fillCheckoutForm(
      this.users.standard.firstName,
      this.users.standard.lastName,
      this.users.standard.postalCode
    );
    checkoutPage.goToCheckoutStepTwo(this.urlPaths.default.checkoutStepTwo);
    checkoutPage.verifyHeaderText(this.messages.default.checkoutStepTwoHeader);
    checkoutPage.verifyFinishComponents(
      this.messages.default.paymentinfoHeader,
      this.messages.default.paymentvalue,
      this.messages.default.shippinginfoHeader,
      this.messages.default.shippingvalue,
      this.messages.default.totalPricetext
    );
    checkoutPage.clickFinishCheckout();
  });
});
