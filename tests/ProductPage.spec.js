import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { ProductPage } from "../pages/ProductPage.js";
import { ProductPageLocators } from "../locators/ProductPageLocators.js";
import { CartPage } from "../pages/CartPage.js";
import {LoginLocators} from "../locators/LoginPageLocators.js";
import { productsToCart } from "../testdata/products.js";
import { BASEURL, USERNAME, PASSWORD } from "../utils/envConfig.js";


test.describe("product page validation", () => {
  let loginPage;
  let productPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);

    await loginPage.goto(BASEURL);
    await loginPage.login(USERNAME, PASSWORD);

    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  test("Validate logout from the product page", async ({ page }) => {
    await productPage.logout();
    await expect(page.locator(LoginLocators.loginButton)).toBeVisible();
  });

  test("Validate About page and Navigate Back", async ({ page }) => {
    // Open Sauce Labs from the SauceDemo menu
    await productPage.openAboutPage();

    // Verify navigation to Sauce Labs
    await expect(page).toHaveURL(/saucelabs\.com/);

    // Navigate back to SauceDemo
    await page.goBack();

    // Verify return to the inventory page
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    // Verify the inventory page is displayed
    await expect(page.locator(ProductPageLocators.settingIcon)).toBeVisible();
  });

  test("Validate all Products are Displayed Properly", async ({ page }) => {
    await productPage.validateAllProductsDisplayed();
    await productPage.addFirstProductTocart();
    await productPage.addAllProductsToCart();
  });

  test("Validate specific products are added to the cart", async ({}) => {
    await productPage.addSpecificProductsToCart(productsToCart);
  });

  test("Filter By Name AtoZ", async ({ page }) => {
    await productPage.filterByNameAtoZ();
    const names = await productPage.getProductNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  test("Filter By Name ZtoA", async ({ page }) => {
    await productPage.filterByNameZtoA();
    const names = await productPage.getProductNames();
    const sorted = [...names].sort().reverse();
    expect(names).toEqual(sorted);
  });

  test("Filter By Name LowtoHigh", async ({ page }) => {
    await productPage.filterByNamelowtoHigh();
    const prices = await productPage.getProductPrices();
    const sortedPrice = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrice);
  });

  test("Filter By Name HighToLow", async ({ page }) => {
    await productPage.filterByNameHighToLow();
    const prices = await productPage.getProductPrices();
    const sortedPrice = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedPrice);
  });
});
