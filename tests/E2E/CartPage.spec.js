import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.js";
import { ProductPage } from "../../pages/ProductPage.js";
import { CartPage } from "../../pages/CartPage.js";
import { productsToCart } from "../../testdata/products.js";
import { BASEURL, USERNAME, PASSWORD } from "../../utils/envConfig.js";

test.describe("cart page validation", () => {
  let loginPage;
  let productPage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);

    await loginPage.goto(BASEURL);
    await loginPage.login(USERNAME, PASSWORD);
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  test("Validate cart page URL and UI elements", async ({ page }) => {
    await productPage.addFirstProductTocart();
    await productPage.clickOnCartLink();
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

    const ui = await cartPage.getCartPageElements();
    await expect(ui.cartTitle).toBeVisible();
    await expect(ui.shoppingCart).toBeVisible();
    await expect(ui.checkoutButton).toBeVisible();
  });

  test("Validate continue shopping Functionality", async ({ page }) => {
    await productPage.addFirstProductTocart();
    await productPage.clickOnCartLink();
    await cartPage.clickOnContinueShoppingButton();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  test("Validate First product add to the cart page", async ({ page }) => {
    const firstProduct = await productPage.getFirstProductDetails();
    await productPage.addFirstProductTocart();
    await productPage.clickOnCartLink();
    await page.waitForTimeout(2000);
    const cartProducts = await cartPage.getCartProducts();
    expect(cartProducts[0]).toEqual(firstProduct);
  });

  test("Validate All products add to the cart page", async ({ page }) => {
    const allProductsDetails = await productPage.AllProductDetails();
    await productPage.addAllProductsToCart();
    await productPage.clickOnCartLink();
    const cartProducts = await cartPage.getCartProducts();
    expect(cartProducts).toEqual(allProductsDetails);
  });

  test("Validate Specific product add to the cart page", async ({ page }) => {
    const expectedProducts = await productPage.getSpecificProductDetails(productsToCart);
    await productPage.addSpecificProductsToCart(productsToCart);
    await productPage.clickOnCartLink();
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
    await expect(page.locator(".cart_item")).toHaveCount(productsToCart.length);

    const cartProducts = await cartPage.getCartProducts();
    expect(cartProducts).toEqual(expectedProducts);
  });

  test("Removing the first product to the cart page", async ({ page }) => {
    await productPage.addFirstProductTocart();
    await productPage.clickOnCartLink();

    const initialProducts = await cartPage.getCartProducts();
    expect(initialProducts.length).toBeGreaterThan(0);

    await cartPage.removeFirstProduct(initialProducts[0].name);
    const updateCartProducts = await cartPage.getCartProducts();

    // expect(updateCartProducts.length).toBe(initialProducts.length - 1);
  });

});