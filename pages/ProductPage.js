import { expect } from "@playwright/test";
import { ProductPageLocators } from "../locators/ProductPageLocators.js";

export class ProductPage {
  constructor(page) {
    this.page = page;
  }

  async logout() {
    await this.page.locator(ProductPageLocators.settingIcon).click();
    await this.page.locator(ProductPageLocators.logoutButton).click();
    // await this.page.waitForLoadState("networkidle");
  }

  async openAboutPage() {
    await this.page.locator(ProductPageLocators.settingIcon).click();

    await this.page.locator(ProductPageLocators.aboutLink).click();
  }

  async validateAllProductsDisplayed() {
    const names = await this.page
      .locator(ProductPageLocators.productNames)
      .allTextContents();
    const descriptions = await this.page
      .locator(ProductPageLocators.productDescriptions)
      .allTextContents();
    const prices = await this.page
      .locator(ProductPageLocators.productPrices)
      .allTextContents();
    const buttonCount = await this.page
      .locator(ProductPageLocators.addToCartButton)
      .count();

    if (names.length === 0) {
      throw new Error("No products Found");
    }
    if (
      names.length !== descriptions.length ||
      names.length !== prices.length ||
      names.length !== buttonCount
    ) {
      throw new Error("MissMatch Between the products details");
    }
  }

  async addFirstProductTocart() {
    await this.page
      .locator(ProductPageLocators.addToCartButton)
      .first()
      .click();
  }

  async addAllProductsToCart() {
    const button = await this.page.locator(ProductPageLocators.addToCartButton);
    const count = await button.count();
    for (let i = 0; i < count; i++) {
      const buttons = button.first();
      await buttons.click();
      await this.page.waitForTimeout(1000); // Wait for 1 second before clicking the next button
    }
  }
  // async addSpecificProductsToCart(productNames) {
  //   const addProducts = this.page.locator(ProductPageLocators.productNames);
  //   const count = await addProducts.count();
  //   for (let i = 0; i < count; i++) {
  //     const productName = await addProducts.nth(i).textContent();

  //     if (productNames && productNames.includes(productName.trim())) {
  //       await this.page
  //         .locator(ProductPageLocators.addToCartButton)
  //         .nth(i)
  //         .click();
  //     }
  //   }
  // }

  async addSpecificProductsToCart(productNames) {
    for (const productName of productNames) {
      // Find the specific product card
      const product = this.page.locator(".inventory_item").filter({
        has: this.page.getByText(productName, { exact: true }),
      });

      // Verify that the product exists
      await expect(product).toHaveCount(1);

      // Find the Add to Cart button inside that product card
      const addButton = product.locator('button[data-test^="add-to-cart-"]');

      await addButton.click();

      // Verify that the button changed to Remove
      await expect(
        product.locator('button[data-test^="remove-"]'),
      ).toBeVisible();
    }

    // Verify the cart contains all selected products
    await expect(this.page.locator(".shopping_cart_badge")).toHaveText(
      String(productNames.length),
    );
  }

  async filterByNameAtoZ() {
    await this.page.selectOption(ProductPageLocators.filterDropdown, "az");
  }

  async filterByNameZtoA() {
    // await this.page.locator(ProductPageLocators.filterDropdown).selectOption('az');
    await this.page.selectOption(ProductPageLocators.filterDropdown, "za");
    await this.page.waitForTimeout(2000);
  }

  async filterByNamelowtoHigh() {
    // await this.page.locator(ProductPageLocators.filterDropdown).selectOption('az');
    await this.page.selectOption(ProductPageLocators.filterDropdown, "lohi");
    await this.page.waitForTimeout(2000);
  }
  async filterByNameHighToLow() {
    // await this.page.locator(ProductPageLocators.filterDropdown).selectOption('az');
    await this.page.selectOption(ProductPageLocators.filterDropdown, "hilo");
    await this.page.waitForTimeout(2000);
  }

  async getProductNames() {
    return await this.page.locator(ProductPageLocators.productNames).allTextContents();
  }

  async getProductPrices() {
    const prices = await this.page
      .locator(ProductPageLocators.productPrices)
      .allTextContents();
    return prices.map((price) => parseFloat(price.replace("$", "")));
  }

  async clickOnCartLink() {
    await this.page.locator(ProductPageLocators.cartLink).click();
  }

  async getFirstProductDetails() {
    const name = await this.page.locator(ProductPageLocators.productNames).first().textContent();
    const description = await this.page.locator(ProductPageLocators.productDescriptions).first().textContent();
    const price = await this.page.locator(ProductPageLocators.productPrices).first().textContent();
    
    return{
      name: name.trim(),
      description: description.trim(),
      price: price.trim()
    }


  }

  async AllProductDetails(productName) {

    const allNames = await this.page.locator(ProductPageLocators.productNames).allTextContents();
    const allDescriptions = await this.page.locator(ProductPageLocators.productDescriptions).allTextContents();
    const allPrices = await this.page.locator(ProductPageLocators.productPrices).allTextContents();
    // here the multiple products are printing so we need to use array of objects.

      const allProducts = allNames.map((_, i) => ({
        name: allNames[i].trim(),
        description: allDescriptions[i].trim(),
        price: allPrices[i].trim(),
      }));
      return allProducts;
  }


  async getSpecificProductDetails(productNames) {
    const allNames = await this.page
      .locator(ProductPageLocators.productNames)
      .allTextContents();
    const allDescriptions = await this.page
      .locator(ProductPageLocators.productDescriptions)
      .allTextContents();
    const allPrices = await this.page
      .locator(ProductPageLocators.productPrices)
      .allTextContents();

    const allProducts = allNames.map((name, i) => ({
      name: name.trim(),
      description: allDescriptions[i].trim(),
      price: allPrices[i].trim(),
    }));

    return productNames.map((productName) => {
      const product = allProducts.find(({ name }) => name === productName);
      if (!product) {
        throw new Error(`Product "${productName}" was not found on the product page`);
      }
      return product;
    });
  }


}


