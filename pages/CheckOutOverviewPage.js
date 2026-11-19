import { checkOutOverviewLocators } from "../locators/CheckOutOverviewLocators.js";

export class CheckOutOverviewPage {
    constructor(page) {
        this.page = page;
    }
async getCheckOutOverviewElements(){

    return {
        pageInfo: await this.page.locator(checkOutOverviewLocators.pageInfo),
        finishButton: await this.page.locator(checkOutOverviewLocators.finishButton),
        cancelButton:  await this.page.locator(checkOutOverviewLocators.cancelButton),
        }  
        
    }  

            async getCheckOutOverviewProducts() {

                const allNames = await this.page.locator(checkOutOverviewLocators.productNames).allTextContents();           
                const allDescriptions = await this.page.locator(checkOutOverviewLocators.productDescriptions).allTextContents();
                const allPrices = await this.page.locator(checkOutOverviewLocators.productPrices).allTextContents();
                // here the multiple products are printing so we need to use array of objects.
            
                  const allCheckOutProducts = allNames.map((_, i) => ({
                    name: allNames[i].trim(),
                    description: allDescriptions[i].trim(),
                    price: allPrices[i].trim(),
                  }));
                  return allCheckOutProducts;
              }
    

              async getItemTotal() {
                const itemTotal = await this.page.locator(checkOutOverviewLocators.itemTotal).textContent();
                return parseFloat(itemTotal.replace('Item total: $', '').trim());
              } 
 

              async getTax() {
                const tax = await this.page.locator(checkOutOverviewLocators.tax).textContent();
                return parseFloat(tax.replace('Tax: $', '').trim());
              } 

             async getTotal() {
                const total = await this.page.locator(checkOutOverviewLocators.total).textContent();
                return parseFloat(total.replace('Total: $', '').trim());
              } 

              async clickOnCancel() {
                const tax = await this.page.locator(checkOutOverviewLocators.cancelButton).click();
            
              } 

                async clickOnFinishButton() {
                const tax = await this.page.locator(checkOutOverviewLocators.finishButton).click();
            
              } 
              

}

