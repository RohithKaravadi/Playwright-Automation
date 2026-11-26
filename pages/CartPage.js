import { page } from "@playwright/test";
import { ProductPageLocators } from "../locators/ProductPageLocators.js";
import { productsToCart } from "../testdata/products.js";
import { CartPageLocators } from "../locators/CartPageLocators.js";
import { BASEURL, USERNAME, PASSWORD } from "../utils/envConfig.js";

export class CartPage {
  constructor(page) {
    this.page = page;
  }


  async clickOnContinueShoppingButton() {
    await this.page.locator(CartPageLocators.continueShoppingButton).click();
    
    }

    async getCartPageElements() {

    return{

         cartTitle : await this.page.locator(CartPageLocators.cartTitle),
         shoppingCart: await this.page.locator(CartPageLocators.continueShoppingButton),
         checkoutButton: await this.page.locator(CartPageLocators.checkOutButton)

        }

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


         async openCart() {
         await this.page.click(CartPageLocators.cartIcon);     // used, not redeclared
         }

       async getCartProducts() {
     
         const allNames = await this.page.locator(CartPageLocators.productNames).allTextContents();
         const allDescriptions = await this.page.locator(CartPageLocators.productDescriptions).allTextContents();
         const allPrices = await this.page.locator(CartPageLocators.productPrices).allTextContents();
         // here the multiple products are printing so we need to use array of objects.
     
           const allCartProducts = allNames.map((_, i) => ({
             name: allNames[i].trim(),
             description: allDescriptions[i].trim(),
             price: allPrices[i].trim(),
           }));
           return allCartProducts;
       }

       async removeFirstProduct() {


        await this.page.locator(CartPageLocators.removeFromCartButton).first().click();
       }

       async clickCheckoutButton() {


        await this.page.locator(CartPageLocators.checkOutButton).first().click();
       }

      }
