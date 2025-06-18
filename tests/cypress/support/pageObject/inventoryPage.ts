type Product = {
  id: string;
  url: string;
  name: string;
  description?: string;
  price?: string;
};

type ProductsMap = {
  [key: string]: Product;
};

export default {
  secondHeaderName: '[data-test="secondary-header"] [data-test="title"]',
  valueCartItem: '[data-test="shopping-cart-badge"]',
  productBox: '[data-test="inventory-item"]',
  itemName: '[data-test="inventory-item-name"]',
  sortingComponent: '[data-test="product-sort-container"]',
  sortOption: '[data-test="product-sort-container"] option',
  activeOption: '[data-test="active-option"]',

  products: {} as ProductsMap,

  getProductByName(productName: string): Product | undefined {
    return Object.values(this.products).find((p) => p.name === productName);
  },

  createProductBoxSelectorWithId(productId: string): string {
    return `[data-test="inventory-item"][data-id="${productId}"]`;
  },

  verifySecondHeaderText(message: string): void {
    cy.get(this.secondHeaderName).should("be.visible").contains(message);
  },

  addProductByName(productName: string): void {
    cy.get(this.productBox)
      .contains(this.itemName, productName)
      .parents(".inventory_item")
      .within(() => {
        cy.get('[data-test^="add-to-cart"]').click();
      });
  },

  addProductById(productId: string): void {
    const selector = this.createProductBoxSelectorWithId(productId);
    cy.get(selector).find('[data-test^="add-to-cart"]').click();
  },

  getAddToCartSelector(productName: string): string {
    const id = productName
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");
    return `[data-test="add-to-cart-${id}"]`;
  },

  validateProductSuccessAddedToCart(
    addToCartSelector: string,
    count: number
  ): void {
    cy.get(this.valueCartItem)
      .should("be.visible")
      .and("have.text", count.toString());

    const removeSelector = addToCartSelector.replace("add-to-cart", "remove");

    cy.get(removeSelector).should("exist");
  },

  checkAllProductBoxes(): void {
    cy.get(this.productBox).each(($el) => {
      cy.wrap($el)
        .find('[data-test="inventory-item-name"]')
        .invoke("text")
        .then((productName) => {
          const kebabName = productName
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-");

          cy.wrap($el)
            .find(`[data-test="inventory-item-name"]`)
            .parents("a[href]")
            .should("exist")
            .and("have.attr", "href")
            .and("not.be.empty");

          cy.wrap($el)
            .find('[data-test="inventory-item-desc"]')
            .should("be.visible");

          cy.wrap($el)
            .find('[data-test="inventory-item-price"]')
            .should("be.visible")
            .invoke("text")
            .should("match", /\$\d/);
        });
    });
  },

  verifySortComponentVisibleAndValid(
    azValue: string,
    zaValue: string,
    lowToHighValue: string,
    highToLowValue: string
  ): void {
    cy.get(this.sortingComponent, { timeout: 10000 }).should("be.visible");
    cy.get(this.activeOption)
      .invoke("text")
      .then((text) => {
        const allowedOptions = [
          azValue,
          zaValue,
          lowToHighValue,
          highToLowValue,
        ];
        expect(allowedOptions).to.include(text.trim());
      });
  },

  selectSortOption(optionText: string): void {
    cy.get(this.sortingComponent).select(optionText);
  },

  verifyFirstProductName(expectedName: string): void {
    cy.get(this.itemName)
      .first()
      .should("be.visible")
      .and("have.text", expectedName);
  },

  openProductDetailByName(productName: string): void {
    cy.get(this.productBox)
      .contains(this.itemName, productName)
      .parents(this.productBox)
      .find("a[href]")
      .first()
      .click();
  },

  verifyProductUrl(product: Product): void {
    const expectedUrl = `${Cypress.config("baseUrl")}${product.url}`;
    cy.url().should("eq", expectedUrl);
  },
};
