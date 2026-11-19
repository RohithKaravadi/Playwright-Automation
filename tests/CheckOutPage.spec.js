import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { ProductPage } from "../pages/ProductPage.js";
import { CartPage } from "../pages/CartPage.js";
import { productsToCart } from "../testdata/products.js";
import { BASEURL, USERNAME, PASSWORD } from "../utils/envConfig.js";
import { CheckOutPage } from "../pages/CheckOutPage.js";
import { checkOutPageLocators } from "../locators/CheckOutPageLocators.js";
import { CheckOutData } from "../testdata/chekOutData.js";


test.describe("cart page validation", () => {
  let loginPage;
  let productPage;
  let cartPage;
  let checkOutPage;
  

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkOutPage = new CheckOutPage(page);

    await loginPage.goto(BASEURL);
    await loginPage.login(USERNAME, PASSWORD);
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    await productPage.addFirstProductTocart();
    await productPage.clickOnCartLink();

  });

  test("Validate checkout page URL and UI elements", async ({ page }) => {
    await cartPage.clickCheckoutButton();
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");   
    const elements = await checkOutPage.getCheckOutElements();
    await expect(elements.page).toBeVisible();
    await expect(elements.firstName).toBeVisible();
    await expect(elements.lastName).toBeVisible();
    await expect(elements.postalCode).toBeVisible();
    await expect(elements.cancelButton).toBeVisible();
    await expect(elements.continueButton).toBeVisible();
 
})

test("Validate Cancel Button", async ({ page }) => {
    await cartPage.clickCheckoutButton();
    await checkOutPage.clickCancel();
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
 
})

test("Validate Continue Button", async ({ page }) => {
    await cartPage.clickCheckoutButton();
    const CheckOutData = await checkOutPage.getCheckOutElements();
    await checkOutPage.filledCheckOutDetails(CheckOutData.firstName, CheckOutData.lastName, CheckOutData.postalCode);
    await checkOutPage.clickContinue();
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html");
 
})


test("Validate Error Messages Continue with no data", async ({ page }) => {
    await cartPage.clickCheckoutButton();
    await checkOutPage.clickContinue();
    const error = await page.locator(checkOutPageLocators.errorMessage).textContent();
    expect(error?.trim()).toBe("Error: First Name is required");
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
 
})

})