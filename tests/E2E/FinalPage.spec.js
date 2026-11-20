import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.js";
import { ProductPage } from "../../pages/ProductPage.js";
import { CartPage } from "../../pages/CartPage.js";
import { productsToCart } from "../../testdata/products.js";
import { BASEURL, USERNAME, PASSWORD } from "../../utils/envConfig.js";
import { CheckOutPage } from "../../pages/CheckOutPage.js";
import { checkOutPageLocators } from "../../locators/CheckOutPageLocators.js";
import { CheckOutData } from "../../testdata/chekOutData.js";
import {FinalPage} from "../../pages/FinalPage.js";
import { CheckOutOverviewPage } from "../../pages/CheckOutOverviewPage.js"; 


test.describe("cart page validation", () => {
  let loginPage;
  let productPage;
  let cartPage;
  let checkOutPage;
  let checkOutOverview;
  let finalPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkOutPage = new CheckOutPage(page);
    checkOutOverview = new CheckOutOverviewPage(page);
    finalPage = new FinalPage(page);


    await loginPage.goto(BASEURL);
    await loginPage.login(USERNAME, PASSWORD);
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html/Engineer");

    await productPage.addSpecificProductsToCart(productsToCart);
    await productPage.clickOnCartLink();
    await cartPage.clickCheckoutButton();
    await checkOutPage.filledCheckOutDetails(CheckOutData.firstName, CheckOutData.lastName, CheckOutData.postalCode);
    await checkOutPage.clickContinue();
    await checkOutOverview.clickOnFinishButton();
  });



 test("Validate Final Page URL and UI Elements", async ({page}) =>{
    await expect(page).toHaveURL("https://www.saucedemo.com/checkout-complete.html");
    const elements = await finalPage.getFinalPageElements();
    await expect(elements.pageInfo).toBeVisible();
    await expect(elements.successMessage).toBeVisible();
    await expect(elements.backHomeButton).toBeVisible();
    })
  
 test("Validate Success Message Text", async ({page}) =>{
    const successMessage = await finalPage.getSuccessMessageText();
    expect(successMessage).toHaveText("Thank you for your order!");
 })

 test("Validate Back Home Button", async ({page})=>{

    await finalPage.clickBackHomeButton();
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

 })

})