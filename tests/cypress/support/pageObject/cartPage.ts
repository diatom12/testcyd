export default {
  cart: '[data-test="shopping-cart-link"]',
  checkoutBtn: '[data-test="checkout"]',
  continueShoppingBtn: '[data-test="continue-shopping"]',
  cartList: '[data-test="cart-list"]',
  qty: '[data-test="cart-quantity-label"]',
  cartDesc: '[data-test="cart-desc-label"]',
  removeBtn: '[data-test="remove-sauce-labs-onesie"]',
  itemInCart: '[data-test="inventory-item"]',
  itemQuantity: '[data-test="item-quantity"]',
  itemName: '[data-test="inventory-item-name"]',
  itemDescription: '[data-test="inventory-item-desc"]',
  itemPrice: '[data-test="inventory-item-price"]',

  goToShoppingCart(urlPath: string): void {
    cy.get(this.cart).should("be.visible").click();
    cy.url().should("include", urlPath);
  },

  goToCheckout(urlPath: string): void {
    cy.get(this.checkoutBtn).should("be.visible").click();
    cy.url().should("include", urlPath);
  },

  continueShopping(): void {
    cy.get(this.continueShoppingBtn).should("be.visible").click();
  },

  verifyContinueShoppingButton(expectedText: string): void {
    cy.get(this.continueShoppingBtn)
      .contains(expectedText)
      .within(() => {
        cy.get("img.back-image")
          .should("have.attr", "src")
          .and("include", "data:image/png;base64");
      });
  },

  verifyCartComponents(
    qtyMessage: string,
    cartDescMessage: string,
    continueShoppingText: string
  ): void {
    cy.get(this.qty).should("be.visible").contains(qtyMessage);
    cy.get(this.cartDesc).should("be.visible").contains(cartDescMessage);
    cy.get(this.checkoutBtn).should("be.visible");
    cy.get(this.continueShoppingBtn).should("be.visible");
    this.verifyContinueShoppingButton(continueShoppingText);
  },

  verifyRemoveButton(productName: string): void {
    const complexCaseName = productName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    cy.get(`[data-test="remove-${complexCaseName}"]`).should("be.visible");
  },

  removeProductByName(productName: string): void {
    const complexCaseName = productName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    cy.get(`[data-test="remove-${complexCaseName}"]`)
      .should("be.visible")
      .click();
  },

  clearCartAndReturnToProducts(cartUrlPath: string): void {
    this.goToShoppingCart(cartUrlPath);

    cy.document().then((doc) => {
      const removeButtons = doc.querySelectorAll('[data-test^="remove-"]');
      if (removeButtons.length > 0) {
        cy.wrap(removeButtons).each(($btn) => {
          cy.wrap($btn).click();
        });
        cy.get(this.continueShoppingBtn).should("be.visible").click();
      } else {
        cy.get(this.continueShoppingBtn).should("be.visible").click();
      }
    });
  },

  verifyItemInCart(productName: string, productDescription: string): void {
    cy.get(this.itemInCart)
      .should("be.visible")
      .within(() => {
        cy.get(this.itemName).should("contain.text", productName);
        cy.get(this.itemDescription).should("contain.text", productDescription);
        cy.get(this.itemPrice).should("be.visible");
      });
  },
};
