import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage.js";
import { ProductPage } from "../../pages/ProductPage.js";
import { CartPage } from "../../pages/CartPage.js";
import { productsToCart } from "../../testdata/products.js";
import { BASEURL, USERNAME, PASSWORD } from "../../utils/envConfig.js";
import { CheckOutPage } from "../../pages/CheckOutPage.js";
import { CheckOutOverviewPage} from "../../pages/CheckOutOverviewPage.js";
import { CheckOutData } from "../../testdata/chekOutData.js";



test.describe("checkOutOverview page validation", () => {
  let loginPage;
  let productPage;
  let cartPage;
  let checkOutPage;
  let checkOutOverview;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);
        checkOutPage = new CheckOutPage(page);
        checkOutOverview = new CheckOutOverviewPage(page);

        await loginPage.goto(BASEURL);
        await loginPage.login(USERNAME, PASSWORD);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

     // await productPage.addFirstProductTocart();
        await productPage.addSpecificProductsToCart(productsToCart);

        await productPage.clickOnCartLink();
        await cartPage.clickCheckoutButton();
        await checkOutPage.filledCheckOutDetails(CheckOutData.firstName, CheckOutData.lastName, CheckOutData.postalCode);
        await checkOutPage.clickContinue();
    });

  

    test("Validate the checkOut Overview page UI and URL", async({page})=>{

     await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-two.html");
     const elements = await checkOutOverview.getCheckOutOverviewElements();
     await expect(elements.pageInfo).toBeVisible();
     await expect(elements.cancelButton).toBeVisible();
     await expect(elements.finishButton).toBeVisible();


    })
    test("Validate Cancel Button functionality", async({page})=>{

      await checkOutOverview.clickOnCancel();
      await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    })
     
    test("Validate Item Total Calculation", async ({page}) => {
    const overviewProducts = await checkOutOverview.getCheckOutOverviewProducts();
    const calculatedTotal = overviewProducts.reduce((sum, {price})=> sum+parseFloat(price.replace("$", "")),0);
    const UIItemTotal = await checkOutOverview.getItemTotal();
    expect(calculatedTotal).toBe(UIItemTotal);

  });

    test("Validate Tax Calculation", async ({page}) => {
      const itemTotal = await checkOutOverview.getItemTotal();
      const tax = await checkOutOverview.getTax();
      const finalTotal = await checkOutOverview.getTotal(); 

      const expectedFinalTotal = itemTotal+ tax;
      expect(finalTotal).toBe(expectedFinalTotal);

    });
     
})
